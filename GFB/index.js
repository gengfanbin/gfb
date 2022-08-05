const GFB = Object.freeze({
  // Routing component
  Router: class Router {
    constructor(Elm, type, components) {
      if (!Elm) {
        this.#ERROR("A mount element must be given")
        return false
      }
      this.#Elm = Elm
      this.#components = components
      if (type === "hash") {
        this.#HashRouterInit()
      }
    }

    // preset
    #Elm = null
    #components = new Array()
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
      this.#MatchRoute(this.#HashUrlResolution())
      this.#HashRouterListener()
    }

    // Hash mode Route listening function
    #HashRouterListener() {
      window.addEventListener("hashchange", () => {
        this.#MatchRoute(this.#HashUrlResolution())
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
      this.#components.map((item) => {
        let to = this.#RouterStack[this.#RouterStack.length - 1]
        if (Path.toLowerCase() === item.Path.toLowerCase()) {
          this.#CurrentRoute = item
          this.BeforeRouter(to, this.#CurrentRoute, this.#RouterRender.bind(this))
          this.AfterRouter(to, this.#CurrentRoute)
        }
      })
    }

    // Perform route navigation
    #RouterRender() {
      if (this.#CurrentRoute) {
        this.#RouterStack.push(this.#CurrentRoute)
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
      this.#templateBox = box
      this.#Components = params.Components
      this.Props = params.Props
    }

    // preset
    #templateBox = void (0)
    State = {}
    Refs = {}
    #Components = {}

    // Hooks for components
    BeforeMount() { }
    AfterMount() { }
    BeforeUpdate() { }
    AfterUpdate() { }

    // regular
    #regular = {
      // Process comment code
      filterNotes: new RegExp("<!--(.*)-->", "gms"),
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
        this.#output()
        this.AfterMount()
      }
    }

    // Update data
    Update(new_state = {}) {
      if (this.#isObject(new_state, 'Update只接受对象类型数据')) {
        this.BeforeUpdate()
        this.State = Object.assign(this.State, new_state)
        this.#output()
        this.AfterUpdate()
      }
    }

    // Process DOM strings to generate DOM
    #output() {
      if (this.#templateBox) {
        let template = this.Render().trim()
        template = this.#filterNotes(template)
        template = this.#signComponent(template)
        template = this.#releaseJavaScript(template)
        template = this.#analysisDom(template)
        this.#registerComponent(template)
        this.#templateBox.innerHTML = ''
        this.#templateBox.appendChild(template)
      } else {
        this.#ERROR('A mount element must be given')
      }
    }

    // Process comment code
    #filterNotes(template) {
      return template.replace(this.#regular.filterNotes, "<!-- -->")
    }

    // Mark sub components
    #signComponent(template) {
      for (let i in this.#Components) {
        template = template.replace(this.#regular.releaseComponents(i), ($1) => {
          let new_str = $1.replace(`<${i}`, `<div component=${i}`)
          new_str = new_str.replace(`</${i}>`, `</div>`)
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
    #registerComponent(template) {
      for (let i in this.#Components) {
        let component = template.querySelectorAll(`[component=${i}]`)
        component.forEach(element => {
          new this.#Components[i](element, this.#registerProps(element))
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
  },
})
