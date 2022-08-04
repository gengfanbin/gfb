class Index extends GFB {
  /* 
    构造参数中必须包含一个挂载元素，并且挂载元素必须是一个dom元素
    其他参数为外部传入的自定义参数，便于兼容其他框架
  */
  constructor(Elm,params){
    console.log(params)
    /*
      参数Elm是挂载元素，必须是一个标准DOM元素
      第二个参数是一个对象，包含以下属性：
        Props：父组件传入的Props忽略则为空对象, 
        Components：注册组件的子组件，对象的key是组件名，value是组件的类,注意，这里并不是组件类的实例
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
      now_nav:1
    })
  }

  SwitchNav(now_nav) {
    this.Update({now_nav})
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
        <Header switch_nav="SwitchNav"></Header>
        {% this.State.now_nav==1 && "<Introduction></Introduction>" %}
        {% this.State.now_nav==2 && "<Document></Document>" %}
      </div>
    `
  }
}