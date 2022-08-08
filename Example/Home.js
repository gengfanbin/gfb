class Home extends GFB.Component {
  /* 
    构造参数中必须包含一个挂载元素，并且挂载元素必须是一个dom元素
    其他参数为外部传入的自定义参数，便于兼容其他框架
  */
  constructor(Elm){
    /*
      第一个参数为Elm，必须是一个可挂载标准DOM元素
      第二个参数为注入属性，包含以下属性：
        Props：父组件注入的Props忽略则为空对象, 
        Components：注册子组件集合，集合的key是组件名，value是组件的类,注意，这里并不是组件类的实例
    */
    super(Elm,{
      Components:{
        Header,
        Introduction,
        Document,
      }
    })
    /* 
      初始化函数，在构造函数中调用，可以在这里设置组件的初始状态
    */
    this.Init({
      now_nav:1,
    })
  }

  SwitchNav(now_nav) {
    this.Update({now_nav})
  }

  testfn() {
    let elm = ''
    for(let i=0;i<4;i++){
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
      <div>
        <!-- 
          属性名'switch_nav'在渲染时会解析为全小写,但属性值不会，这是html的特性。
        -->
        <Header switch_nav="SwitchNav" key="Header" ></Header>
        
        <!-- 
          条件渲染 与 循环渲染 的方式与react基本一致
        -->
        {% this.State.now_nav==1 &&  this.testfn() %}
        {% this.State.now_nav==2 && '<Document key="Document"></Document>' %}
      </div>
    `
  }
}