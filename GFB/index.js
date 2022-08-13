const GFB = Object.freeze({
  // Service component
  Service: class Service {
    constructor(params) {
      this.#init(params)
    }

    // preset
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

    #init(params) {
      if(params && this.#isFunction(params, "Service Error: Constructor accepts only function type arguments")){
        let Service = params.apply(this)
        for(let key in Service){
          if(this.#isFunction(Service[key])){
            // Parameters of type function are saved to ServiceList
            this.#ServiceList[key] = Service[key].bind(this)
          }else{
            // Other type parameters (if they do not exist) are saved in the current context
            if(!this[key]){
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
        this.#ObserverList[i]()
      }
    }

    // externally exposed register service observer method
    RegisterObserverList(params) {
      let { CallBack, ObserverID } = params
      if ((typeof CallBack == "function")) {
        if (!ObserverID || this.#ObserverList[ObserverID]) {
          ObserverID = new Date().getTime() + this.#createRandomNum(4)
        }
        this.#ObserverList[ObserverID] = CallBack
        return ObserverID
      } else {
        this.#ERROR("register service observer error : CallBack is not a function")
        return false
      }
    }

    // Adding an observer to a function
    Observer(service) {
      return () => {
        const result = service.apply(this, arguments);
        this.#triggerObserver()
        return result;
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
    constructor(Elm, Type, Config) {
      this.templateBox = Elm
      this.#Config = Config
      this.#Type = Type
      this.Init()
    }

    // preset
    templateBox = void(0)
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
        if(this.#Example[CurrentRoute.Path]){
          this.#Example[CurrentRoute.Path].templateBox = this.templateBox
          this.#Example[CurrentRoute.Path].Update()
        }else{
          this.#Example[CurrentRoute.Path] = new CurrentRoute.Component(this.templateBox)
        }
      }
    }

    // push a router in RouterStack
    Push(router) {
      window.location.hash = router
    }

    // Replace last route in RouterStack
    Replace(router) {
      this.#RouterStack.splice(this.#RouterStack.length - 1, 1, this.#MatchRoute(router))
      let url = window.location.origin + window.location.pathname + '#' + router
      window.location.replace(url)
    }
  },

  // Basic components
  Component: class Component {
    constructor(box) {
      if (!box) {
        this.#ERROR("A mount element must be given")
      }
      this.templateBox = box
    }

    // preset
    templateBox = void (0)
    State = {}
    Props = {}
    Refs = {}
    #template = void (0)
    #ComponentExample = []
    #Component = {}
    Service = []

    // Hooks for components
    BeforeMount() { }
    AfterMount() { }
    BeforeUpdate() { }
    AfterUpdate() { }
    BeforeUnmount() { }
    AfterUnmount() { }

    // regular
    #regular = {
      // Handle JS literal
      releaseJavaScript: new RegExp("\{\%(.*?)\%\}", "gms"),
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

    // Register components
    Init(params = {}) {
      if (this.#isObject(params, 'Init only accepts object type data')) {
        this.BeforeMount()
        if (params.Service && this.#isObject(params.Service, 'Service only accepts object type data')) {
          this.#registerService(params.Service)
        }
        if (!params.Component || this.#isObject(params.Component, 'Component only accepts object type data')) {
          this.#Component = params.Component || {}
        }
        if (!params.State || this.#isObject(params.State, 'State only accepts object type data')) {
          this.State = Object.assign(this.State, (params.State || {}))
        }
        this.#output('init')
        this.AfterMount()
      }
    }

    // Update data
    Update(new_state = {}) {
      if (this.#isObject(new_state, 'Update only accepts object type data')) {
        this.BeforeUpdate()
        this.State = Object.assign(this.State, new_state)
        this.#output('update')
        this.AfterUpdate()
      }
    }

    // Process DOM strings to generate DOM
    #output(action) {
      if (this.templateBox) {
        this.#template = this.Render().trim()
        this.#filterNotes()
        this.#releaseJavaScript()
        this.#signComponent()
        this.#analysisDom()
        this.#registerComponent(action)
        this.templateBox.innerHTML = ''
        this.templateBox.appendChild(this.#template)
      } else {
        this.#ERROR('A mount element must be given')
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
          break;
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

    // Process JS strings and generate JS results
    #releaseJavaScript() {
      this.#template = this.#template.replace(this.#regular.releaseJavaScript, ($1) => {
        let jsValue = eval($1.substring(2, $1.length - 2))
        if (jsValue || jsValue === 0) {
          return jsValue
        } else {
          return ''
        }
      })
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
            template.removeAttribute('ref')
          }
          if (template.attributes[i].name.indexOf('on:') === 0) {
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
        Service[i].RegisterObserverList({CallBack:this.Update.bind(this)})
        this[i] = Service[i].Get()
      }
    }

    // Register subcomponents
    #registerComponent(action) {
      for (let i in this.#Component) {
        let component = this.#template.querySelectorAll(`[component=${i}]`)
        component.forEach(element => {
          if (action == 'init') {
            this.#subComponentInit(element, this.#Component[i])
          } else if (action == 'update') {
            this.#subComponentUpdate(element, this.#Component[i])
          }
        });
      }
    }

    // Register props
    #registerProps(element) {
      let Props = new Object()
      for (let i = 0; i < element.attributes.length; i++) {
        if (this.#isFunction(this[element.attributes[i].value])) {
          Props[element.attributes[i].name] = this[element.attributes[i].value].bind(this)
        } else {
          Props[element.attributes[i].name] = element.attributes[i].value
        }
      }
      return Props
    }

    #subComponentInit(element, subComponent) {
      if (element.attributes.key && element.attributes.key.value) {
        let Example = new subComponent(element)
        Example['Props'] = this.#registerProps(element)
        this.#ComponentExample.push({
          key: element.attributes.key.value,
          Example,
        })
      } else {
        this.#ERROR(`<${element.attributes.component.value}> The component must give a declared key value`)
      }
    }

    #findSubComponent(key) {
      let results = null
      this.#ComponentExample.map(item => {
        if (item.key === key) {
          results = item
        }
      })
      return results
    }

    #subComponentUpdate(element, subComponent) {
      if (element.attributes.key && element.attributes.key.value) {
        let subExample = this.#findSubComponent(element.attributes.key.value)
        if (subExample && subExample.Example) {
          subExample.Example.templateBox = element
          subExample.Example.Update()
        } else {
          this.#subComponentInit(element, subComponent)
        }
      } else {
        this.#ERROR(`<${element.attributes.component.value}> The component must give a declared key value`)
      }
    }

    // get subcomponent example
    GetSubExample(key) {
      let results = this.#ComponentExample
      if (key) {
        this.#ComponentExample.map(item => {
          if (item.key === key) {
            results = [item.Example]
          }
        })
      }
      return results
    }
  },
})
