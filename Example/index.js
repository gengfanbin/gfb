class Index extends GFB.Component {
  constructor(Elm){
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