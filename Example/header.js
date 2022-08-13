class Header extends GFB.Component {
  constructor(Elm){
    super(Elm)
    this.Init()
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
          <div on:click="test(1)" class="header_button">引言（Introduction）</div>
          <div on:click="test(2)" class="header_button">文档（Document）</div>
        </div>
      </div>
    `
  }
}