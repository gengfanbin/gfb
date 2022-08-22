let QuickStart_2 = {
  key: 2,
  type: "加入路由组件",
  content: `<div>
    在构建路由之前,我们需要两个被导航的页面组件<br/><br/>
    在/Page下构建再构建两个页面组件,就像之前构建/Page/Index/index.js页面组件一样<br/><br/>
    /Page/Document/index.js<br/>
<pre>
class Document extends GFB.Component {
  constructor(){
    super()
  }
  Render() {
    return \`
      &lt;div>
        this is Document/index.js
      &lt;/div>
    \`
  }
}
</pre><br/>
/Page/Introduction/index.js<br/>
<pre>
class Introduction extends GFB.Component {
  constructor(){
    super()
  }
  Render() {
    return \`
      &lt;div>
        this is Introduction/index.js
      &lt;/div>
    \`
  }
}
</pre><br/>
如果细心的话,你会发现,这两个组件并没有在构造函数中传入Elm,并且也没有使用this.Init()对组件进行初始化<br/><br/>
这是因为这两个组件会被路由组件挂载,这种情况下,这两个组件会被视为子组件,子组件的Init()如果未显式调用的情况下,父组件会在第一次挂载此组件时,隐式的调用一次<br/><br/>
一般情况下,只有根组件才会需要Elm来对自身进行挂载<br/><br/>
而子组件Elm则由父组件自动挂载,任何子组件都不必接受Elm参数<br/><br/>
  </div>`,
  sub: [
    {
      key: 21, text: "创建路由",
      content: `<div>
        GFB提供了一个Router功能组件,它非常简易,只提供了hash模式路由,并且实现了路由守卫<br/><br/>
        我们习惯将路由独立出来单独管理,创建一个路由文件/Router/index.js<br/><br/>
        编写以下代码:<br/><br/>
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
}
</pre><br/>
    </div>`},
    {
      key: 22, text: "挂载路由",
      content: `<div>
        这时,我们将这三个文件引入到/index.html<br/><br/>
        /index.html
<pre>
...
&lt;head>
...
&lt;!-- 页面 -->
&lt;script src="./Page/Index/index.js">&lt;/script>
&lt;script src="./Page/Document/index.js">&lt;/script>
&lt;script src="./Page/Introduction/index.js">&lt;/script>

&lt;!-- 路由 -->
&lt;script src="./Router/index.js">&lt;/script>
&lt;/head>
...
</pre><br/>
        接下来,我们将路由组件挂载到根组件/Page/Index/index.js中<br/><br/>
        修改/Page/Index/index.js组件中的this.Init()和Render()
<pre>
...
constructor(Elm){
  super(Elm)
  this.Init({
    Component:{
      Router,
    },
  })
}
Render() {
  return \`
    &lt;div>
      &lt;Router key="IndexRouter">&lt;/Router>
    &lt;/div>
  \`
}
...
</pre><br/>
      注意!&lt;Router key="IndexRouter">&lt;/Router>中的key="IndexRouter"这个属性<br/><br/>
      这是因为在GFB中,组件的实例化依赖组件标签中的key来标识每个组件标签与子组件实例之间的关系<br/><br/>
      开发者需要保证每个子组件标签必须有key值并且在当前父组件实例中唯一!<br/><br/>
      如果key值重复,将导致多个组件标签使用同一个子组件实例<br/><br/>
      当然,你也可以利用这个特点来实现一些特殊的功能<br/><br/>
      这时,我们的路由就已经完成了,可以打开浏览器,分别使用:<br/>
      /#/<br/>
      /#/Document<br/><br/>
      来分别访问两个子页面组件了<br/><br/>
    </div>`},
  ]
}