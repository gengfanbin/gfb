class header extends GFB {
  constructor(Elm, Props){
    super(Elm,{
      Props,
      Components:{SubComponent:sub}
    })
    this.Init({
      name: "this is header"
    })
    console.log(this.Props,'----ppp')
  }

  test(){
    this.Props.switch_nav(111)
  }

  Render() {
    return `
      <div>
        <div>{% this.State.name %}</div>
        <button on:click="test">click</button>
        <SubComponent></SubComponent>
      </div>
    `
  }
}