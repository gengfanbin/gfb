class ComponentDocument extends GFB.Component {
  constructor(Elm){
    super(Elm)
    this.Init()
  }
  
  Render(){
    return`
      <div>ComponentDocument component</div>
    `
  }
}