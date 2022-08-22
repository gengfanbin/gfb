let QuickStart_3 = {
  key: 3,
  type: "组件间通信",
  content: `<div>
    当然,我们不可能一直通过改变URL来跳转页面,所以我们需要添加一个点击某个按钮来实现跳转的功能<br/><br/>
    假设我们有很多个组件,每个组件中都有需要点击按钮跳转的功能,我们应该怎么进行组件间的沟通呢<br/><br/>
    如果你使用过组件化框架,你可能想到Props,但是他不适合多层级间调用<br/><br/>
    又或者是状态树,如redux或者vuex之类的功能,但是无论是redux还是vuex在概念上都不应该适合这样的事情<br/><br/>
    GFB提供了Service服务这个概念,如果你还不了解两者的区别,可以去查看一下文档中的服务模块,它对两者的描述比较清楚<br/><br/>
  </div>`,
  sub: [{
    key: 31, text: "创建服务",
    content: `<div>
      我们要创建第一个服务/Service/index.js,来实现数据管理<br/><br/>
      /Service/index.js:
<pre>
let IndexService = new GFB.Service('IndexService',function(){
  return {
    now_nav: "/", // 数据
    switch_nav: this.Register('router_switch',function(nav){ // 注册到观察列表的函数
      this.now_nav = nav
      return this.now_nav
    }),
    get_nav(){ // 未注册到观察列表的函数
      return this.now_nav
    },
  }
});
</pre><br/> 
      看吧,GFB中创建服务就是这么简单<br/><br/>
      在Service中有一些需要注意的点:<br/>
      1、Service接受两个参数:一、service_name用于标识服务的名称,二、function函数,这个函数的this会在执行时指向Service<br/>
      2、this.Register()会将服务注册到观察列表,只有在观察列表中的方法才会被观察者观察<br/>
      3、观察者无法直接使用服务中的数据,必须通过服务中定义的函数才能对数据进行操作<br/><br/>
    </div>`},
    {
      key: 32, text: "注册服务",
      content: `<div>
        我们要创建一个公共子组件了,还是创建一个独立的文件夹来管理公共组件,我们习惯将它叫做Component<br/><br/>
        像下面这样,创建一个/Component/Header/index.js,并编写以下代码<br/><br/>
<pre>
class Header extends GFB.Component {
  constructor(){
    super()
    this.Init({
      Service:{
        IndexService
      }
    })
  }
  header= '一个简约且简单的数据驱动“库”'
  switch_nav(now_nav){
    this.IndexService.switch_nav(now_nav)
  }
  Render() {
    return \`
      &lt;div class="header">
        &lt;div>
          &lt;span class="header_describe">\${this.header}&lt;/span>
        &lt;/div>
        &lt;div class="header_right">
          &lt;div on:click="switch_nav('/')" class="header_button">引言（Introduction）&lt;/div>
          &lt;div on:click="switch_nav('/Document')" class="header_button">文档（Document）&lt;/div>
        &lt;/div>
      &lt;/div>
    \`
  }
}
</pre><br/>
      服务的注入通过在this.Init()传入一个对象类型参数<br/><br/>
      参数中加入要注册的服务列表Service:{}<br/><br/>
      与Component:{}有点不同,Service它也可以是个数组Service:[]<br/><br/>
      GFB在注入服务时没有用到Service:{}的key值,而是使用开发者定义的service_name服务名称。<br/><br/>
    </div>`},
    {
      key: 33, text: "模板渲染",
      content: `<div>
        在上面代码中可以看到header= '一个简约且简单的数据驱动“库”'属性<br/><br/>
        在Render()函数的return使用\`\`包裹了返回的DOM描述字符串<br/><br/>
        其中有对应的\${header},这是JavaScript中原生的字符串变量<br/><br/>
        可以看出,在GFB中,Render()函数返回的只是JavaScript中的字符串类型,并不是react中的jsx元素<br/><br/>
        开发者可以使用任何方式对这个返回值进行加工处理来实现如<b>条件渲染</b>和<b>循环渲染</b>等功能<br/><br/>
    </div>`},
    {
      key: 34, text: "事件绑定",
      content: `<div>
        在上面代码中可以看到on:click="switch_nav\(\)"这样的属性,这是GFB中的事件绑定方式<br/><br/>
        如果没有参数的话也可以写成这样on:click="switch_nav"<br/><br/>
    </div>`},
    {
      key: 35, text: "使用组件的观察者",
      content: `<div>
        下面我们将在/Page/Index/index.js页面组件中通过使用组件提供的观察者来修改路由实现组件间的路由导航<br/><br/>
        在这之前,我们先将Service和Header引入到我们项目中<br/><br/>
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

&lt;!-- 服务 -->
&lt;script src="./Service/index.js">&lt;/script>

&lt;!-- 组件 -->
&lt;script src="./Component/Header/index.js">&lt;/script>
&lt;/head>
...
</pre><br/>
        然后在/Page/Index/index.js页面组件中注册并使用它们<br/>
<pre>
class Index extends GFB.Component {
  constructor(Elm){
    super(Elm)
    this.Init({
      Component:{
        Header,
        Router,
      },
      Service:{
        IndexService
      }
    })
  }

  ServiceObserver(res,function_name,service_name){
    if(function_name == 'router_switch'){
      this.GetSubExample('IndexRouter').Push(res)
    }
  }

  Render() {
    return \`
      &lt;div>
        &lt;Header class="header_component" key="Header" >&lt;/Header>
        &lt;Router key="IndexRouter">&lt;/Router>
      &lt;/div>
    \`
  }
}
</pre><br/>
        注意给Header组件一个key值！这个属性在GFB中非常重要<br/><br/>
        GFB组件中提供了一个默认的观察者ServiceObserver()<br/><br/>
        它会被注册到所有注入到组件的服务中<br/><br/>
        开发者可以通过它来监听当前组件注入的服务中的<b>被注册的服务函数</b><br/><br/>
        它会给开发者提供三个参数,<br/>
        1、被观察到的服务函数的返回值res<br/><br/>
        2、function被观察到的服务函数名称<br/><br/>
        3、service_name服务在定义时给定的服务名称<br/><br/>
        上面的示例中,我们通过组件提供GetSubExample()API来获取路由组件的实例<br/><br/>
        GetSubExample()可以接收一个组件key参数,返回当前key组件的实例,如果未传入该参数则会返回当前组件中注册的所有子组件实例<br/><br/>
        然后我们通过路由组件提供的Push()API来操作路由导航的切换<br/><br/>
        这时,我们在浏览器中打开项目,如果不出意外,我们应该可以通过点击header上的导航按钮来实现页面间跳转了<br/><br/>
        至此,我们已经接触到了大部分GFB中的概念<br/><br/>
    </div>`},
  ]
}