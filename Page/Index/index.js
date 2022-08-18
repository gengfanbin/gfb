class Index extends GFB.Component {
  constructor(Elm){
    super(Elm)
    this.Init({
      Component:{
        Header,
        Router,
      },
    })
  }

  SwitchNav(now_nav) {
    this.GetSubExample('IndexRouter').Push(now_nav)
  }

  Render() {
    return `
      <div>
        <!-- 
          属性名'switch_nav'在渲染时会解析为全小写,但属性值不会，这是html的特性。
        -->
        <Header class="header_component" switch_nav="SwitchNav" key="Header" ></Header>
        <Router key="IndexRouter"></Router>
      </div>
    `
  }
}