class GFB {
  constructor(box, params = {}) {
    if (!box) {
      this.#ERROR("必须给定一个挂载元素")
    }
    this.#templateBox = box
    this.Components = params.Components
    this.Props = params.Props
  }

  // 预置
  #templateBox = void (0)
  State = {}
  Refs = {}
  Components = {}

  // 钩子函数
  BeforeMount() { }
  AfterMount() { }
  BeforeUpdate() { }
  AfterUpdate() { }

  // 正则
  #regular = {
    // 处理注释代码
    filterNotes: new RegExp("<!--(.*)-->","gms"),
    // 处理js字面量
    releaseJavaScript: new RegExp("\{\%(.*?)\%\}","gms"),
    // 处理组件标识
    releaseComponents: (component)=>{
      return new RegExp(`<${component}(.*)</${component}>`,"gmsi")
    },
  }

  #ERROR(msg) {
    console.error(msg)
  }
  
  Render() {
    this.#ERROR("实例类必须实现Render方法")
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

  // 注册组件
  Init(new_state = {}) {
    if (this.#isObject(new_state, 'Init只接受对象类型数据')) {
      this.BeforeMount()
      this.State = Object.assign(this.State, new_state)
      this.#output()
      this.AfterMount()
    }
  }

  // 更新DATA
  Update(new_state = {}) {
    if (this.#isObject(new_state, 'Update只接受对象类型数据')) {
      this.BeforeUpdate()
      this.State = Object.assign(this.State, new_state)
      this.#output()
      this.AfterUpdate()
    }
  }

  // 处理dom字符串，生成dom
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
      this.#ERROR('没有挂载元素')
    }
  }

  // 处理注释代码
  #filterNotes(template) {
    return template.replace(this.#regular.filterNotes, "<!-- -->")
  }

  // 标记子组件
  #signComponent(template){
    for (let i in this.Components) {
      template = template.replace(this.#regular.releaseComponents(i), ($1) => {
        let new_str = $1.replace("<"+i,`<div component=${i}`)
        new_str = new_str.replace(`</${i}>`,`</div>`)
        return new_str
      })
    }
    return template
  }

  // 处理js字符串，生成js结果
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

  // 解析模板，生成dom
  #analysisDom(template) {
    let e = document.createElement('div')
    e.innerHTML = template
    if (e.childNodes.length > 1) {
      this.#ERROR('模板中只能有一个根元素')
      return false
    }
    template = this.#ergodicNode(e.childNodes[0])
    return template
  }

  #ergodicNode(node) {
    node = this.#bindDomAttr(node)
    if (node.childNodes) {
      for (let i = 0; i < node.childNodes.length; i++) {
        this.#ergodicNode(node.childNodes[i])
      }
    }
    return node
  }

  // 处理绑定事件与属性值
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
            eventParams = eventParams[1].split(')')[0].split(',')
          } else {
            eventParams = void (0)
          }
          template.addEventListener(eventName, () => {
            if (eventParams) {
              this[eventFunc](...eventParams)
            } else {
              this[eventFunc]()
            }
          })
        }
      }
    }
    return template
  }

  // 注册子组件
  #registerComponent(template) {
    for (let i in this.Components) {
      let component = template.querySelectorAll(`[component=${i}]`)
      component.forEach(element => {
        new this.Components[i](element, this.#registerProps(element))
      });
    }
  }

  // 注册Props
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

  // 样式表处理
  #styleSheetHandle() {
    let style = document.createElement('style')
    style.innerHTML = this.StyleSheet
    document.head.appendChild(style)
  }
}