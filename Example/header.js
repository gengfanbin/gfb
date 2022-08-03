class Header extends GFB {
  constructor(Elm, Props){
    super(Elm,{
      Props,
    })
    this.Init({
      name: "this is header"
    })
  }

  test(now_nav){
    this.Props.switch_nav(now_nav)
  }

  Render() {
    return `
      <div>
        <div>{% this.State.name %}</div>
        <button on:click="test(1)">Introduction</button>
        <button on:click="test(2)">Document</button>
      </div>
    `
  }
}