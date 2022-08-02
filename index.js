class testClass extends GFB {
  constructor(box){
    super(box)
    this.Init({
      test:0,
      left:0,
      top:0,
      move_start: false,
      block: "move_block",
    })
  }

  clickdiv1(number){
    let test = this.State.test + (parseFloat( number)||1)
    this.Update({test})
  }
  rendertest(){
    let elm = ''
    for(let i = 0; i<10; i++){
      elm += `<div>${i}</div>`
    }
    return elm
  }

  move_block_down(){
    this.Update({move_start: true})
  }

  move_block_up(){
    this.Update({move_start: false})
  }

  move_block_move(){
    if(this.State.move_start){
      this.Update({
        left: this.State.left + event.movementX,
        top: this.State.top + event.movementY,
      })
    }
  }

  Render() {
    return `
      <div style={%"color:red"%} name={%{test:1}%}>
        {%this.State.test%}
        {%this.State.test != 0 && this.rendertest()%}
        <div >111111111</div>
        {%this.State.move_start && '<div on:mouseup="move_block_up" on:mousemove="move_block_move" class="showMask"></div>'%}
        <div on:mousedown="move_block_down" class={%this.State.block%} style="left:{%this.State.left%}px;top:{%this.State.top%}px;"></div>
        <div>
          <div ref="testdiv1" on:click="clickdiv1">button1</div>
        </div>
        <div>
          <div ref="testdiv2" on:click="{%'clickdiv1(2)'%}" >button2</div>
        </div>
      </div>
    `
  }
}