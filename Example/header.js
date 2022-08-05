class Header extends GFB.Component {
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
      <div class="header">
        <div>
          logo
          <span class="header_describe">一个简约而简单的数据驱动“库”</span>
        </div>
        <div class="header_right">
          <div on:click="test(1)" class="header_button">Introduction</div>
          <div on:click="test(2)" class="header_button">Document</div>
        </div>
      </div>
    `
  }
}