class RouterDocument extends GFB.Component {
  constructor() {
    super()
  }
  now_nav = 0
  nav_list = [
    {
      key: 0,
      type: "路由简述",
      content: `<div>
        GFB中提供了一个简易的路由功能，它只实现了Hash模式的导航功能，并且支持路由守卫<br/><br/>
        路由是一个特殊的组件,它不具有渲染功能,但是会将路由匹配的组件挂载到路由节点上,以此实现导航功能<br/><br/>
        它没有子路由嵌套功能,只实现了一级路由匹配功能<br/><br/>
      </div>`,
    },
    {
      key: 1,
      type: "定义路由",
      content: `<div>
        如上所述,定义路由与定义组件类似,但是路由的初始化会在挂载时自动执行<br/><br/>
        路由需要在构造函数中的super()中传入一个路由数组<br/><br/>
        完整的路由像下面这样:<br/>
<pre>
class Router extends GFB.Router{
  constructor(){
    const Router = [
      {
        Path:'/',
        Component: Introduction,
      },
      {
        Path:'/Document',
        Component: Document,
      },
    ]
    super(Router)
  }
  BeforeRouter(from, to, next){ // 前置守卫
    next()
  }
  AfterRouter(from, to){} // 后置守卫 
}</pre>
      </div>`,
      sub: [
        {
          key: 11, text: "BeforeRouter()",
          content: `<div>
            如上图所示,BeforeRouter()会接收三个参数:<br/>
            第一个参数from为当前路由对象<br/>
            第二个参数to为导航后的路由对象<br/>
            第三个参数next为导航函数<br/><br/>
            next()在任何情况下都必须被调用且只能被调用一次<br/><br/>
            不然组件会一直等待next()被调用<br/><br/>
            这些特性基本与vue等框架中的beforeRouteEnter()函数类似<br/><br/>
        </div>`},
        {
          key: 12, text: "AfterRouter()",
          content: `<div>
            如上图所示,AfterRouter()会接收两个参数:<br/>
            与BeforeRouter()一样,第一个参数为当前路由对象<br/>
            第二个参数为导航后的路由对象<br/><br/>
        </div>`},
        {
          key: 13, text: "关于路由传参",
          content: `<div>
            在GFB.Router中,并没有限制路由数组下的路由对象的属性限制,开发者只要保证在路由对象中传入Path和Component即可<br/><br/>
            路由会将传入的路由数组下每一个路由对象保存到路由表中,你可以通过修改路由对象中的属性即可<br/><br/>
            开发者可以在挂载路由的组件中通过[RouterExample].GetRouterStack()获取当前路由栈,这个路由栈里有所有你想要的东西<br/><br/>
            奉劝你,不要修改路由数组,否则你的路由表将无法正常工作<br/><br/>
            但是你可以修改路由数组下的路由对象中的除Path和Component的以外的所有属性☺<br/><br/>
        </div>`}
      ]
    },
    {
      key: 2,
      type: "路由跳转",
      content: `<div>
        路由提供了Push()和Replace()两个函数,可以用来实现跳转<br/><br/>
      </div>`,
      sub: [
        {
          key: 21, text: "Push()",
          content: `<div>
            Push()接收一个路由对象,添加到路由栈中并返回路由对象
        </div>`},
        {
          key: 22, text: "Replace()",
          content: `<div>
          Replace()接收一个路由对象,替换路由栈顶的路由对象,然后将被替换的路由对象返回
        </div>`}
      ]
    },
  ]

  renderLeftItem() {
    let elm = ``
    for (let i in this.nav_list) {
      elm += `<div class="left_item">`
      elm += `<div 
        on:click="nav_switch(${this.nav_list[i]['key']})" 
        class="left_item_title ${this.nav_list[i]['key'] == this.now_nav && "nav_active"}">
        ${this.nav_list[i]['type']}
      </div>`
      for (let j in this.nav_list[i]['sub']) {
        elm += `<div 
          on:click="anchor_switch(${this.nav_list[i]['sub'][j]['key']})" 
          class="left_item_sub" 
          key="${this.nav_list[i]['sub'][j]['key']}">
          ${this.nav_list[i]['sub'][j]['text']}
        </div>`
      }
      elm += `</div>`
    }
    return elm
  }

  renderRightItem() {
    let elm = `<div class="right_item">
      <div class="right_item_title">${this.nav_list[this.now_nav]['type']}</div> 
      <div class="right_item_content">${this.nav_list[this.now_nav]['content']}</div>
      ${this.renderRightItemSub(this.nav_list[this.now_nav]['sub'])}
    </div>`
    return elm
  }
  renderRightItemSub(sub) {
    let elm = ``
    for (let i in sub) {
      elm += `<div class="right_item_sub_box">
        <div ref="${sub[i]['key']}" class="right_item_sub_anchor"></div>
        <div class="right_item_sub_title">${sub[i]['text']}</div>
        <div class="right_item_sub_content">${sub[i]['content'] || ''}</div>
      </div>`
    }
    return elm
  }

  nav_switch(key) {
    this.now_nav = key
    this.Update()
  }
  anchor_switch(key) {
    this.now_nav = parseInt(key / 10)
    this.Update()
    this.Refs[key].scrollIntoView()
  }

  Render() {
    return `
      <div class="DocumentComponent">
        <div class="left">
          ${this.renderLeftItem()}
        </div>
        <div class="right">
          ${this.renderRightItem()}
        </div>
      </div>
    `
  }
}