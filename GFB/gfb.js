(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory :
    typeof define === 'function' && define.amd ? define(factory) :
      (global = global || self, global.GFB = factory);
})(this, Object.freeze({
  // Service component
  Service: class Service {
    constructor(service_name, params) {
      if (service_name) {
        this.#service_name = service_name
        this.#init(params)
      } else {
        this.#ERROR("The developer should give a service name to identify the service")
      }
    }

    // preset
    #service_name = void (0)
    #ObserverList = {}
    #ServiceList = {}
    #ERROR(msg) {
      console.error(msg)
    }

    #isFunction(obj, message) {
      if (typeof obj === 'function') {
        return true
      } else {
        message && this.#ERROR(message)
        return false
      }
    }

    #notArrowFunction(obj, message) {
      if (typeof obj === 'function' && obj.prototype) {
        return true
      } else {
        message && this.#ERROR(message)
        return false
      }
    }

    #init(params) {
      if (params && this.#isFunction(params, "Service Error: Constructor accepts only function type arguments")) {
        let Service = params.apply(this)
        for (let key in Service) {
          if (this.#isFunction(Service[key])) {
            // Parameters of type function are saved to ServiceList
            this.#ServiceList[key] = Service[key].bind(this)
          } else {
            // Other type parameters (if they do not exist) are saved in the current context
            if (!this[key]) {
              this[key] = Service[key]
            }
          }
        }
      }
    }

    // Produce random number of specified length
    #createRandomNum(num) {
      if (num) {
        let code = ''
        for (var i = 0; i < num; i++) {
          code += parseInt(Math.random() * 10)
        }
        return code
      } else {
        return 0
      }
    }

    // Trigger registered watchers
    #triggerObserver() {
      for (let i in this.#ObserverList) {
        if (this.#isFunction(this.#ObserverList[i])) {
          this.#call_Observer(...arguments, this.#ObserverList[i])
        }
      }
    }

    async #call_Observer() {
      let params = [...arguments]
      let func = params.pop()
      func(...params)
    }

    // externally exposed register service observer method
    RegisterObserver(params) {
      let { CallBack, ObserverID } = params
      if ((typeof CallBack == "function")) {
        if (!ObserverID) {
          ObserverID = new Date().getTime() + this.#createRandomNum(4)
        } else if (this.#ObserverList[ObserverID]) {
          this.#ERROR("This observer already exists")
          return false
        }
        this.#ObserverList[ObserverID] = CallBack
        return ObserverID
      } else {
        this.#ERROR("register service observer error : CallBack is not a function")
        return false
      }
    }

    // externally exposed remove service observer method
    RemoveObserver(ObserverID) {
      if (ObserverID && this.#ObserverList[ObserverID]) {
        this.#ObserverList[ObserverID] = void (0)
        return ObserverID
      } else {
        return false
      }
    }

    // Adding an observer to a function
    Register(function_name, service) {
      if (this.#notArrowFunction(service, "Service Error: Observer accepts only non-arrow function type arguments")) {
        return function () {
          const result = service.apply(this, arguments)
          this.#triggerObserver({
            result,
            function: function_name,
            service: this.#service_name,
          })
          return result
        }
      }
    }

    //  externally exposed get ServiceList method
    Get(ServiceName) {
      let Service = this.#ServiceList
      if (ServiceName) {
        Service = this.#ServiceList[ServiceName]
      }
      return Service
    }

    get ServiceName() {
      return this.#service_name
    }

    // externally exposed remove service Service method
    Remove(ServiceName) {
      let state = false
      if (ServiceName) {
        this.#ServiceList[ServiceName] = void (0)
      }
      return state
    }
  },

  // Routing component
  Router: class Router {
    constructor(Config) {
      this.#Config = Config
    }

    // preset
    __TEMPLATE_BOX__ = void (0)
    #Type = "hash"
    #Config = new Array()
    #Example = new Object()
    Init() {
      if (this.#Type === "hash") {
        this.#HashRouterInit()
      }
    }
    Update() {
      this.#RouterRender()
    }

    // Routing stack
    #CurrentRoute = null
    #RouterStack = new Array()
    GetRouterStack() {
      return this.#RouterStack
    }

    // Before route transformation. If false is returned, the current route event will be stopped
    BeforeRouter(form, to, next) {
      next()
    }
    // After route transformation
    AfterRouter(form, to) { }

    // Hash mode route initialization
    #HashRouterInit() {
      this.#RouterController()
      this.#HashRouterListener()
    }

    // Hash mode Route listening function
    #HashRouterListener() {
      window.addEventListener("hashchange", () => {
        this.#RouterController()
      })
    }

    // URL hash string parsing
    #HashUrlResolution() {
      let hash = window.location.hash
      if (hash.length == 0) {
        hash = "/"
      } else {
        hash = hash.substring(1)
      }
      return hash
    }

    // Match routes and render components
    #MatchRoute(Path) {
      let router = false
      this.#Config.map((item) => {
        if (Path.toLowerCase() === item.Path.toLowerCase()) {
          router = item
        }
      })
      return router
    }

    // Hooks for the router
    #RouterController() {
      this.#CurrentRoute = this.#MatchRoute(this.#HashUrlResolution())
      let from = this.#RouterStack[this.#RouterStack.length - 1]
      this.BeforeRouter(from, this.#CurrentRoute, this.#RouterRender.bind(this))
      this.AfterRouter(from, this.#CurrentRoute)
    }

    // Perform route navigation
    #RouterRender(router) {
      if (this.#CurrentRoute) {
        let CurrentRoute = this.#CurrentRoute
        if (router) {
          CurrentRoute = this.#MatchRoute(router)
        }
        this.#RouterStack.push(CurrentRoute)
        if (this.#Example[CurrentRoute.Path]) {
          this.#Example[CurrentRoute.Path].__TEMPLATE_BOX__ = this.__TEMPLATE_BOX__
          this.#Example[CurrentRoute.Path].Update()
        } else {
          this.#Example[CurrentRoute.Path] = new CurrentRoute.Component()
          this.#Example[CurrentRoute.Path].__TEMPLATE_BOX__ = this.__TEMPLATE_BOX__
          this.#Example[CurrentRoute.Path].Init()
        }
        for (let i in this.#Example) {
          if (i != CurrentRoute.Path && this.#Example[i]) {
            this.#Example[i].Destroy()
            this.#Example[i] = void (0)
          }
        }
      }
    }

    // push a router in RouterStack
    Push(router) {
      window.location.hash = router
      return router
    }

    // Replace last route in RouterStack
    Replace(router) {
      let out_router = this.#RouterStack.pop()
      let url = window.location.origin + window.location.pathname + '#' + router
      window.location.replace(url)
      return out_router
    }
  },

  // Basic components
  Component: class Component {
    constructor(box) {
      if (box) {
        if (box.nodeType === 1) {
          this.__TEMPLATE_BOX__ = box
        } else {
          this.#ERROR("The constructor only accepts one standard DOM element node, and the nodeType of this node must be 1")
        }
      }
    }

    // preset
    __TEMPLATE_BOX__ = void (0)
    Props = {}
    Refs = {}
    #InitState = false
    #template = void (0)
    #ComponentExample = []
    #Component = {}
    Service = []
    ServiceObserver() { }

    // Hooks for components
    BeforeMount() { }
    AfterMount() { }
    BeforeUpdate() { }
    AfterUpdate() { }
    BeforeDestroy() { }
    AfterDestroy() { }

    // regular
    #regular = {
      // Process component identification
      releaseComponent: (component) => {
        return new RegExp(`<${component}(.*)</${component}>`, "gmsi")
      },
    }

    #ERROR(msg) {
      console.error(`class: ${this.constructor.name}: ${msg}`)
    }

    Render() {
      this.#ERROR("The instance class must implement the render method")
    }

    #isFunction(obj, message) {
      if (typeof obj === 'function') {
        return true
      } else {
        message && this.#ERROR(message)
        return false
      }
    }

    #isObject(obj, message) {
      if (Object.prototype.toString.call(obj) === '[object Object]') {
        return true
      } else {
        message && this.#ERROR(message)
        return false
      }
    }

    #isArray(array, message) {
      if (Array.isArray(array)) {
        return true
      } else {
        message && this.#ERROR(message)
        return false
      }
    }

    // Register components
    Init(params = {}) {
      if (this.#isObject(params, 'Init only accepts object type data')) {
        if (params.Service) {
          if ((this.#isObject(params.Service) || this.#isArray(params.Service))) {
            this.#registerService(params.Service)
          } else {
            this.#ERROR("Service can only be an array or object type parameter")
          }
        }
        if (params.Component && this.#isObject(params.Component, 'Component only accepts object type data')) {
          this.#Component = params.Component
        }
        if (this.#InitState) {
          this.#output('update')
        } else {
          this.BeforeMount()
          this.#output('init')
          this.AfterMount()
          this.#InitState = true
        }
      }
    }

    // Update data
    Update() {
      this.BeforeUpdate()
      this.#output('update')
      this.AfterUpdate()
    }

    // Destroy component
    Destroy() {
      this.BeforeDestroy()
      this.#ComponentExample.map(item => {
        item.Example.Destroy()
      })
      this.AfterDestroy()
    }

    // Process DOM strings to generate DOM
    #output(action) {
      if (this.__TEMPLATE_BOX__) {
        this.#template = this.Render().trim()
        this.#filterNotes()
        this.#signComponent()
        this.#analysisDom()
        this.#registerComponent(action)
        this.__TEMPLATE_BOX__.innerHTML = ''
        this.__TEMPLATE_BOX__.appendChild(this.#template)
      }
    }

    // Process comment code
    #filterNotes() {
      let old = ""
      while (true) {
        let start_index = this.#template.indexOf('<!--')
        let end_index = this.#template.indexOf('-->')
        if (start_index != -1) {
          old += this.#template.substring(0, start_index)
          this.#template = this.#template.substring(end_index + 3)
          old += "<!-- -->"
        } else {
          old += this.#template
          break
        }
      }
      this.#template = old
    }

    // Mark sub components
    #signComponent() {
      for (let i in this.#Component) {
        this.#template = this.#template.replace(this.#regular.releaseComponent(i), ($1) => {
          let new_str = $1.replaceAll(`<${i}`, `<div component=${i}`)
          new_str = new_str.replaceAll(`</${i}>`, `</div>`)
          return new_str
        })
      }
    }

    // Parse the template and generate DOM
    #analysisDom() {
      let e = document.createElement('div')
      e.innerHTML = this.#template
      if (e.childNodes.length > 1) {
        this.#ERROR('There can only be one root element in a template')
        return false
      }
      this.#template = this.#ergodicNode(e.childNodes[0])
    }

    // Traversal node
    #ergodicNode(node) {
      node = this.#bindDomAttr(node)
      if (node.childNodes) {
        for (let i = 0; i < node.childNodes.length; i++) {
          this.#ergodicNode(node.childNodes[i])
        }
      }
      return node
    }

    // Handle binding events and attribute values
    #bindDomAttr(template) {
      if (template.attributes && template.attributes.length > 0) {
        for (let i = 0; i < template.attributes.length; i++) {
          if (template.attributes[i].name == "ref") {
            this.Refs[template.attributes[i].value] = template
          } else if (template.attributes[i].name.indexOf('on:') === 0) {
            let eventName = template.attributes[i].name.substring(3)
            let eventFunc = template.attributes[i].value
            let eventParams = eventFunc.split('(')
            if (eventParams.length > 1) {
              eventFunc = eventParams[0]
              eventParams = eventParams[1].split(')')[0]
            } else {
              eventParams = void (0)
            }
            template.addEventListener(eventName, () => {
              if (eventParams) {
                eval(`this[eventFunc](${eventParams})`)
              } else {
                this[eventFunc]()
              }
            })
          }
        }
      }
      return template
    }

    // Register Service
    #registerService(Service) {
      for (let i in Service) {
        Service[i].RegisterObserver({ CallBack: this.ServiceObserver.bind(this) })
        this[Service[i].ServiceName] = Service[i].Get()
      }
    }

    // Register subcomponents
    #registerComponent(action) {
      this.#ComponentExample.map(item => {
        item.State = false
      })
      for (let i in this.#Component) {
        let component = this.#template.querySelectorAll(`[component=${i}]`)
        component.forEach(element => {
          let key = element.getAttribute('key')
          if (key) {
            let subExample = this.#findSubComponent(element.getAttribute('key'))
            if (action == 'update' && subExample && subExample.Example) {
              subExample.State = true
              subExample.Example.__TEMPLATE_BOX__ = element
              subExample.Example.Update()
            } else {
              this.#subComponentInit(element, this.#Component[i])
            }
          } else {
            this.#ERROR(`<${element.attributes.component.value}> The component must give a declared key value`)
          }
        })
      }

      this.#ComponentExample = this.#ComponentExample.filter(item => {
        if (item.State) {
          return true
        } else {
          item.Example.Destroy()
          return false
        }
      })
    }

    #subComponentInit(element, subComponent) {
      let Key = element.getAttribute('key')
      let Example = new subComponent()
      Example.__TEMPLATE_BOX__ = element
      Example.Props = this.#registerProps(element)
      Example.Init()
      this.#ComponentExample.push({
        Key,
        State: true,
        Example,
      })
    }

    #findSubComponent(Key) {
      let results = null
      this.#ComponentExample.map(item => {
        if (item.Key == Key) {
          results = item
        }
      })
      return results
    }

    // Register props
    #registerProps(element) {
      let Props = new Object()
      for (let i = 0; i < element.attributes.length; i++) {
        if (this.#isFunction(this[element.attributes[i].value])) {
          Props[element.attributes[i].name] = this[element.attributes[i].value].bind(this)
        } else if (this[element.attributes[i].value]) {
          Props[element.attributes[i].name] = this[element.attributes[i].value]
        } else {
          Props[element.attributes[i].name] = element.attributes[i].value
        }
      }
      Props['parent'] = this
      return Props
    }

    // get subcomponent example
    GetSubExample(Key) {
      let results = this.#ComponentExample
      if (Key) {
        this.#ComponentExample.map(item => {
          if (item.Key == Key) {
            results = item.Example
          }
        })
      }
      return results
    }
  },
}))