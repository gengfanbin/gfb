const GFB = Object.freeze({
  // Routing component
  Router: class Router {
    constructor(Elm, Type, Config) {
      if (!Elm) {
        this.#ERROR("A mount element must be given")
        return false
      }
      this.#Elm = Elm
      this.#Config = Config
      this.#Type = Type
      this.Init()
    }

    // preset
    #Elm = null
    #Type = "hash"
    #Config = new Array()
    Init(){
      if (this.#Type === "hash") {
        this.#HashRouterInit()
      }
    }
    Update(){
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

    #ERROR(msg) {
      console.error(msg)
    }

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
      this.#Config.map((item) => {
        if (Path.toLowerCase() === item.Path.toLowerCase()) {
          this.#CurrentRoute = item
        }
      })
    }

    // Hooks for the router
    #RouterController(){
      this.#MatchRoute(this.#HashUrlResolution())
      let from = this.#RouterStack[this.#RouterStack.length - 1]
      this.BeforeRouter(from, this.#CurrentRoute, this.#RouterRender.bind(this))
      this.AfterRouter(from, this.#CurrentRoute)
    }

    // Perform route navigation
    #RouterRender(router) {
      if (this.#CurrentRoute) {
        let CurrentRoute = this.#CurrentRoute
        if(router){
          CurrentRoute = this.#MatchRoute(router)
        }
        this.#RouterStack.push(CurrentRoute)
        new this.#CurrentRoute.Component(this.#Elm)
      }
    }
  },

  // Basic components
  Component: class Component {
    constructor(box, params = {}) {
      if (!box) {
        this.#ERROR("A mount element must be given")
      }
      this.templateBox = box
      this.#Components = params.Components
      this.Props = params.Props
    }

    // preset
    templateBox = void (0)
    State = {}
    Refs = {}
    ComponentExample = []
    #Components = {}

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
      releaseComponents: (component) => {
        return new RegExp(`<${component}(.*)</${component}>`, "gmsi")
      },
    }

    #ERROR(msg) {
      console.error(msg)
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

    #isArray(obj, message) {
      if (Object.prototype.toString.call(obj) === '[object Array]') {
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
    Init(new_state = {}) {
      if (this.#isObject(new_state, 'Init只接受对象类型数据')) {
        this.BeforeMount()
        this.State = Object.assign(this.State, new_state)
        this.#output('init')
        this.AfterMount()
      }
    }

    // Update data
    Update(new_state = {}) {
      if (this.#isObject(new_state, 'Update只接受对象类型数据')) {
        this.BeforeUpdate()
        this.State = Object.assign(this.State, new_state)
        this.#output('update')
        this.AfterUpdate()
      }
    }

    // Process DOM strings to generate DOM
    #output(action) {
      if (this.templateBox) {
        let template = this.Render().trim()
        template = this.#filterNotes(template)
        template = this.#signComponent(template)
        template = this.#releaseJavaScript(template)
        template = this.#analysisDom(template)
        this.#registerComponent(template,action)
        this.templateBox.innerHTML = ''
        this.templateBox.appendChild(template)
      } else {
        this.#ERROR('A mount element must be given')
      }
    }

    // Process comment code
    #filterNotes(template) {
      let old = ""
      while(true) {
        let start_index = template.indexOf('<!--')
        let end_index = template.indexOf('-->')
        if(start_index != -1){
          old += template.substring(0, start_index)
          template = template.substring(end_index+3)
          old += "<!-- -->"
        }else{
          old += template
          break;
        }
      }
      return old
    }

    // Mark sub components
    #signComponent(template) {
      for (let i in this.#Components) {
        template = template.replace(this.#regular.releaseComponents(i), ($1) => {
          let new_str = $1.replaceAll(`<${i}`, `<div component=${i}`)
          new_str = new_str.replaceAll(`</${i}>`, `</div>`)
          return new_str
        })
      }
      return template
    }

    // Process JS strings and generate JS results
    #releaseJavaScript(template) {
      return template.replace(this.#regular.releaseJavaScript, ($1) => {
        let jsValue = eval($1.substring(2, $1.length - 2))
        if (jsValue || jsValue === 0) {
          return jsValue
        } else {
          return ''
        }
      })
    }

    // Parse the template and generate DOM
    #analysisDom(template) {
      let e = document.createElement('div')
      e.innerHTML = template
      if (e.childNodes.length > 1) {
        this.#ERROR('There can only be one root element in a template')
        return false
      }
      template = this.#ergodicNode(e.childNodes[0])
      return template
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

    // Register subcomponents
    #registerComponent(template , action) {
      for (let i in this.#Components) {
        let component = template.querySelectorAll(`[component=${i}]`)
        component.forEach(element => {
          if(action=='init'){
            this.#subComponentInit(element,this.#Components[i])
          }else if(action=='update'){
            this.#subComponentUpdate(element,this.#Components[i])
          }
        });
      }
    }

    #findSubComponent(key){
      let results = null
      this.ComponentExample.map(item=>{
        if(item.key===key){
          results = item
        }
      })
      return results
    }

    #subComponentInit(element, subComponent){
      if(element.attributes.key && element.attributes.key.value){
        this.ComponentExample.push({
          key: element.attributes.key.value,
          Example: new subComponent(element, this.#registerProps(element)),
        })
      }else{
        this.#ERROR(`class: ${this.constructor.name}: <${element.attributes.component.value}> The component must give a declared key value`)
      }
    }

    #subComponentUpdate(element,subComponent){
      if(element.attributes.key && element.attributes.key.value){
        let subExample = this.#findSubComponent(element.attributes.key.value)
        if(subExample && subExample.Example){
          subExample.Example.templateBox = element
          subExample.Example.Update()
        }else{
          this.#subComponentInit(element,subComponent)
        }
      }else{
        this.#ERROR(`class: ${this.constructor.name}: <${element.attributes.component.value}> The component must give a declared key value`)
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
  },
})
