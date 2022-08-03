class testClass extends GFB {
  constructor(Elm){
    super(Elm,{
      HeaderComponent:header
    })
    this.Init({
      name:'test'
    })
  }

  consolename() {
    console.log(1111111111111111,this.State.name)
  }

  Render() {
    return `
      <div>
        this is index
        <HeaderComponent name="consolename"></HeaderComponent>
      </div>
    `
  }
}