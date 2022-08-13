class Home extends GFB.Component {
  constructor(Elm){
    super(Elm)
    this.Init({
      State: {
        now_nav:1,
      },
      Component:{
        Header,
        Introduction,
        Document,
      },
    })
  }

  SwitchNav(now_nav) {
    this.Update({now_nav})
  }

  testfn() {
    let elm = ''
    for(let i=0;i<2;i++){
      elm += `<Introduction key="Introduction${i}"></Introduction>`
    }
    return elm
  }

  /* 
    注意！Render函数只能抛出HTML字符串
    可以使用<!-- -->对代码块进行注释
    JS代码块使用{%  %}包裹，但代码块的处理结果会当成HTML字符串
  */
  Render() {
    return `
      <div id="home">
        <!-- 
          属性名'switch_nav'在渲染时会解析为全小写,但属性值不会，这是html的特性。
        -->
        <Header switch_nav="SwitchNav" key="Header" ></Header>
        
        <!-- 
          条件渲染 与 循环渲染 的示例
        -->
        {% this.State.now_nav==1 &&  this.testfn() %}
        {% this.State.now_nav==1 && '<Document key="Document1"></Document>' %}
        {% this.State.now_nav==2 && '<Document key="Document2"></Document>' %}
      </div>
    `
  }
}