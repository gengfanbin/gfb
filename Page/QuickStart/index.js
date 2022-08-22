class QuickStart extends GFB.Component{
  constructor(){
    super()
  }
  now_nav = 0
  nav_list = [
    QuickStart_0,
    QuickStart_1,
    QuickStart_2,
    QuickStart_3,
    QuickStart_4,
  ]

  renderLeftItem() {
    let elm = ``
    for (let i in this.nav_list) {
      elm += `<div class="left_item">`
      elm += `<div 
        on:click="nav_switch(${this.nav_list[i]['key']})" 
        class="left_item_title ${this.nav_list[i]['key'] == this.now_nav && "nav_active"}">
        ${this.nav_list[i]['type']}
      </div>`
      for (let j in this.nav_list[i]['sub']) {
        elm += `<div 
          on:click="anchor_switch(${this.nav_list[i]['sub'][j]['key']})" 
          class="left_item_sub" 
          key="${this.nav_list[i]['sub'][j]['key']}">
          ${this.nav_list[i]['sub'][j]['text']}
        </div>`
      }
      elm += `</div>`
    }
    return elm
  }

  renderRightItem() {
    let elm = `<div class="right_item">
      <div class="right_item_title">${this.nav_list[this.now_nav]['type']}</div> 
      <div class="right_item_content">${this.nav_list[this.now_nav]['content']}</div>
      ${this.renderRightItemSub(this.nav_list[this.now_nav]['sub'])}
    </div>`
    return elm
  }
  renderRightItemSub(sub) {
    let elm = ``
    for (let i in sub) {
      elm += `<div class="right_item_sub_box">
        <div class="right_item_sub_anchor" ref="${sub[i]['key']}"></div>
        <div class="right_item_sub_title">${sub[i]['text']}</div>
        <div class="right_item_sub_content">${sub[i]['content'] || ''}</div>
      </div>`
    }
    return elm
  }

  nav_switch(key) {
    this.now_nav = key
    this.Update()
  }
  anchor_switch(key) {
    this.now_nav = parseInt(key / 10)
    this.Update()
    this.Refs[key].scrollIntoView()
  }

  Render() {
    return `
      <div class="QuickStart">
        <div class="left">
          ${this.renderLeftItem()}
        </div>
        <div class="right">
          ${this.renderRightItem()}
        </div>
      </div>
    `
  }
}