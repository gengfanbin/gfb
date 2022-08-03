class header extends GFB {
  constructor(Elm){
    super(Elm,{
      SubComponent:sub
    })
    this.Init({})
  }

  test(){
    this.Props.name()
  }

  Render() {
    return `
      <div>
        <div>this is header</div>
        <button on:click="test">click</button>
        <SubComponent></SubComponent>
      </div>
    `
  }
}