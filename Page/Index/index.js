class Index extends GFB.Component {
  constructor(Elm){
    super(Elm)
    this.Init({
      Component:{
        Header,
        Router,
      },
      Service:[IndexService]
    })
  }

  ServiceObserver(res,function_name,service_name){
    if(function_name == 'router_switch'){
      this.GetSubExample('IndexRouter').Push(res)
    }
  }

  Render() {
    return `
      <div>
        <!-- 
          属性名'switch_nav'在渲染时会解析为全小写,但属性值不会，这是html的特性。
        -->
        <Header class="header_component" key="Header" ></Header>
        <Router key="IndexRouter"></Router>
      </div>
    `
  }
}