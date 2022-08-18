class Header extends GFB.Component {
  constructor(){
    super()
    this.header= '一个简约且简单的数据驱动“库”'
  }

  switch_nav(now_nav){
    this.Props.switch_nav(now_nav)
  }

  Render() {
    return `
      <div class="header">
        <div>
          logo
          <span class="header_describe">${this.header}</span>
        </div>
        <div class="header_right">
          <div on:click="switch_nav('/')" class="header_button">引言（Introduction）</div>
          <div on:click="switch_nav('/QuickStart')" class="header_button">快速入门（QuickStart）</div>
          <div on:click="switch_nav('/Document')" class="header_button">文档（Document）</div>
        </div>
      </div>
    `
  }
}