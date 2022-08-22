let QuickStart_4 = {
  key: 4,
  type: "组件中的常用API",
  content: `<div>
    在上面的示例中,缺少一些关于常用的API的介绍<br/><br/>
    在本章中,会对上面的示例做一些修改来介绍这些常用API<br/><br/>
    这章不会很长<br/><br/>
  </div>`,
  sub: [{
      key: 41, text: "关于Props",
      content: `<div>
        在GFB中,Props与其他框架中不太一样<br/><br/>
        父组件中的子组件标签上的Props属性的值必须是组件实例中的属性<br/><br/>
        否则会被当做字符串传入子组件的Props中<br/><br/>
        我们将修改路由导航的点击事件来介绍Props<br/><br/>
        下面修改/Props/Index/index.js组件<br/><br/>
<pre>
...

switch_fn(nav){
  this.GetSubExample('IndexRouter').Push(nav)
}

Render() {
  return \`
    &lt;div>
      &lt;Header switch_nav="switch_fn" header_text='一个简约且简单的数据驱动“库”' class="header_component" key="Header" >&lt;/Header>
      &lt;Router key="IndexRouter">&lt;/Router>
    &lt;/div>
  \`
}
...
</pre><br/>
      添加一个switch_nav()函数,并在Header标签中添加一个switch_nav="switch_fn"<br/><br/>
      属性名switch_nav会被传入header组件中的Props中<br/><br/>
      属性值switch_fn是当前组件中的switch_fn(),会被传入header组件中的Props中作为switch_nav的值<br/><br/>
      如果当前组件中switch_fn会被作为字符串传入子组件的Props中<br/><br/>
      就像'一个简约且简单的数据驱动“库”'这个属性值,在当前实例中无法找到就会被当做字符串传入header组件的Props<br/><br/>
      接下来,我们处理一下/Compoent/Header/index.js组件<br/><br/>
      在子组件中,Props的使用方式与其他框架无异<br/><br/>
      /Compoent/Header/index.js
<pre>
...
switch_nav(now_nav){
  // this.IndexService.switch_nav(now_nav)
  this.Props.switch_nav(now_nav)
}
Render() {
  return \`
    &lt;div class="header">
      &lt;div>
        &lt;!-- &lt;span class="header_describe">\${this.header}&lt;/span> -->
        &lt;span class="header_describe">\${this.Props.header}&lt;/span>
      &lt;/div>
      &lt;div class="header_right">
        &lt;div on:click="switch_nav('/')" class="header_button">引言（Introduction）&lt;/div>
        &lt;div on:click="switch_nav('/Document')" class="header_button">文档（Document）&lt;/div>
      &lt;/div>
    &lt;/div>
  \`
}
...
</pre><br/>
    </div>`},
    {
      key: 41, text: "关于Refs",
      content: `<div>
        在开发中,我们常常需要直接操作DOM<br/><br/>
        GFB中虽然不存在虚拟DOM,但是在组件实例更新时会重新渲染组件导致获取DOM丢失<br/><br/>
        在GFB中提供了Refs,开发者可以通过它获取渲染后的DOM节点<br/><br/>
        但是由于GFB并不存在虚拟DOM,GFB中的Refs并不提供节点的实例,返回的只是渲染后的DOM节点<br/><br/>
        我们修改/Page/Document/index.js做个示例<br/>
<pre>
class Document extends GFB.Component {
  constructor() {
    super()
  }

  jump(){
    this.Refs[jump_6].scrollIntoView()
  }
  renderItem(){
    let elm = \`\`
    for(let i=0;i<10;i++){
      elm += \`&lt;div ref="jump_\${i}" style="height:200px">\${i}&lt;/div>\`
    }
    return elm
  }
  Render() {
    return \`
      &lt;div>
        &lt;button on:click="jump">jump&lt;/button>
        \${this.renderItem()}
      &lt;/div>
    \`
  }
}
</pre><br/>
      如果不出意外,这时打开浏览器,点击jump按钮应该可以跳转到第6个元素<br/><br/>
    </div>`},
  ]
}