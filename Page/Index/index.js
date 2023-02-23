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

  ServiceObserver(res){
    if(res.function == 'router_switch'){
      this.GetSubExample('IndexRouter').Push(res.result)
    }
  }

  Render() {
    return `
      <div>
        <Header class="header_component" key="Header" ></Header>
        <Router key="IndexRouter"></Router>
      </div>
    `
  }
}