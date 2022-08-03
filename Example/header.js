class header extends GFB {
  constructor(Elm, Props){
    super(Elm,{
      Props,
      Components:{SubComponent:sub}
    })
    this.Init({})
    console.log(this.Props,'----ppp')
  }

  test(){
    this.Props.switch_nav(111)
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