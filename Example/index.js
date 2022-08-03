class testClass extends GFB {
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
      Components:{HeaderComponent:header}
    })
    /* 
      初始化函数，在构造函数中调用，可以在这里设置组件的初始状态
    */
    this.Init({
      name:'test'
    })
  }

  SwitchNav(nav) {
    console.log(nav,11111)
  }

  /* 
    渲染函数，在构造函数中调用，可以在这里渲染组件的内容
    可以使用<!-- -->对代码块进行注释
  */
  Render() {
    return `
      <div>
        <!-- 
          组件名'HeaderComponent'和属性名'switch_nav'在渲染时会解析为全小写,
          但属性值不会，这是html的特性，GFB库并没有做特殊处理。
        -->
        <HeaderComponent switch_nav="SwitchNav"></HeaderComponent>
      </div>
    `
  }
}