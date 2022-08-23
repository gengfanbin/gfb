let QuickStart_1 = {
  key: 1,
  type: "开始旅途",
  content: `<div>
    本教程会从零开始引导开发者构建一个GFB官网页面<br/><br/>
    在这个过程中,会涵盖GFB库的大部分知识和注意事项<br/><br/>
    教程示例环境为浏览器环境,npm环境请自行切换<br/><br/>
    在开始之前,我们提供了一些CSS文件,因为这些东西不值得我们浪费时间叙述,却又影响我们的构建应用<br/>
    CSS资源链接:<a src="" target="_blank">CSS资源链接</a>,你可以直接引入也可以下载到本地<br/><br/>
    下面开始构建第一个组件<br/>
  </div>`,
  sub: [
    {
      key: 11, text: "引入GFB",
      content: `<div>
        创建一个空文件夹,这将是我们的项目目录<br/><br/>
        在项目目录下创建我们的入口文件index.html文件<br/><br/>
        在index.html文件中引入GFB.js文件,并创建一个div元素,给定一个id值<br/><br/>
        这个元素后续会作为GFB组件渲染的根元素<br/><br/>
<pre>
&lt;html>
  &lt;head>
    &lt;!-- 引入GFB库 -->
    &lt;script src="./GFB/index.js">&lt;/script>
  &lt;/head>
  &lt;body>
    &lt;div id="app">&lt;/div>
  &lt;/body>
&lt;/html>
</pre><br/><br/>
    </div>`},
    {
      key: 12, text: "创建第一个页面组件",
      content: `<div>
        我们为了代码看起来更整洁,应该创建一个文件夹,来存放我们开发的组件<br/><br/>
        我们将组件分为两个类型,一种是页面,一种是公共组件<br/><br/>
        先创建一个名为Page的文件夹,这个文件夹下用来保存我们的页面组件<br/><br/>
        我们习惯将每一个页面单独构建一个文件夹,这样方便管理每个页面的样式表和页面需要用到的其他文件<br/><br/>
        在Page下创建一个Index文件夹,下面创建一个index.js<br/><br/>
        下面我们在/Page/Index/index.js中编写以下代码<br/>
<pre>
class Index extends GFB.Component {
  constructor(Elm){
    super(Elm)
    this.Init()
  }
  Render() {
    return \`
      &lt;div>
        this is Index/index.js
      &lt;/div>
    \`
  }
}
</pre><br/>
      这时我们已经创建好第一个组件了,就是这么简单,没有乱七八糟的api,只有简洁的JavaScript代码<br/><br/>
      然后在index.html中,我们将组件挂载到我们的根元素上,以后它就是我们的根组件了<br/><br/>
      /index.html<br/>
<pre>
&lt;html>
  &lt;head>
    &lt;!-- 引入GFB库 -->
    &lt;script src="./GFB/index.js">&lt;/script>

    &lt;!-- 引入我们刚刚创建的页面组件 -->
    &lt;script src="./Page/index.js">&lt;/script>
  &lt;/head>
  &lt;body>
    &lt;div id="app">&lt;/div>
  &lt;/body>
  &lt;script>
    /* 
      挂载GFB实例
      第一参数为挂载元素，
      后续可以传入其他参数，便于在组件内部使用
      示例：new testClass(document.getElementById('app'),params1,params2...)
    */
    new Index(document.getElementById('app'))
  &lt;/script>
&lt;/html>
</pre><br/>
现在,我们可以将index.html放入浏览器中,此时页面中应该显示"this is index.js"了<br/><br/>
接下来,我们需要构建文档页面和引言页面,当然,我们不会去编写无关的视图样式,只会实现一些涉及到GFB知识的功能<br/><br/>
在下一节中,我们构建一个路由,方便实现页面间跳转的功能,当然路由并不是必须的<br/><br/>
    </div>`},
  ]
}