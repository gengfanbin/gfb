class Index extends GFB.Component {
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
        Router,
      }
    })
    this.Init({})
  }
  Render() {
    return `
      <div>
        <Router key="IndexRouter"></Router>
      </div>
    `
  }
}