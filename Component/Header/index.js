class Header extends GFB.Component {
  constructor(){
    super()
    this.Init({
      Service:{
        IndexService
      }
    })
    this.header= 'GFB 一个简约且简单的数据驱动“库”'
  }

  switch_nav(now_nav){
    this.IndexService.switch_nav(now_nav)
  }

  Render() {
    return `
      <div class="header">
        <div class="header_logo_box">
          <img src="./logo_w.png" style="height:40px;width:40px;"/>
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