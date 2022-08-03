class Document extends GFB{
  constructor(Elm){
    super(Elm)
    this.Init({})
  }
  Render() {
    return`
      <div>document component</div>
    `
  }
}