class GFB {
  constructor(box) {
    this.#templateBox = document.querySelector(box)
  }
  // 预置
  #templateBox = ""
  State = {}
  Refs = {}
  BeforeMount() { }
  AfterMount() { }
  BeforeUpdate() { }
  AfterUpdate() { }
  Render() { }

  // 正则
  #regular = {
    // 处理注释代码
    filterNotes: /<!--(.*)-->/gm,
    // 处理js字面量
    releaseJavaScript: /\{\%(.*?)\%\}/gm,
  }

  #ERROR(msg) {
    console.error(msg)
  }

  #isArray(obj,message) {
    if(Object.prototype.toString.call(obj) === '[object Array]'){
      return true
    }else{
      this.#ERROR(message)
    }
  }

  #isObject(obj,message) {
    if(Object.prototype.toString.call(obj) === '[object Object]'){
      return true
    }else{
      this.#ERROR(message)
    }
  }

  // 注册组件
  Init(new_state={}) {
    if (this.#isObject(new_state,'Init只接受对象类型数据')) {
      this.BeforeMount()
      this.State = Object.assign(this.State, new_state)
      this.#output()
      this.AfterMount()
    }
  }

  // 更新DATA
  Update(new_state={}) {
    if (this.#isObject(new_state,'Update只接受对象类型数据')) {
      this.BeforeUpdate()
      this.State = Object.assign(this.State, new_state)
      this.#output()
      this.AfterUpdate()
    }
  }

  // 处理dom字符串，生成dom
  #output() {
    let template = this.Render().trim()
    template = this.#filterNotes(template)
    template = this.#releaseJavaScript(template)
    template = this.#analysisDom(template)
    this.#templateBox.innerHTML = ''
    this.#templateBox.appendChild(template)
  }

  // 处理注释代码
  #filterNotes(template) {
    return template.replace(this.#regular.filterNotes, "<!-- -->")
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

  // 处理bind，生成绑定元素
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
}