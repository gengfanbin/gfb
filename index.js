class testClass extends GFB {
  constructor(box){
    super(box)
    this._data={
      test:0,
      left:0,
      top:0,
      move_start: false,
      block: "move_block",
    }
    this._output()
  }

  clickdiv1(number){
    let test = this._data.test + (parseFloat( number)||1)
    this._update({test})
  }
  rendertest(){
    let elm = ''
    for(let i = 0; i<10; i++){
      elm += `<div>${i}</div>`
    }
    return elm
  }

  move_block_down(){
    this._update({move_start: true})
  }

  move_block_up(){
    this._update({move_start: false})
  }

  move_block_move(){
    if(this._data.move_start){
      this._update({
        left: this._data.left + event.movementX,
        top: this._data.top + event.movementY,
      })
    }
  }

  _render() {
    return `
      <div style={%"color:red"%} name={%{test:1}%}>
        {%this._data.test%}
        {%this._data.test != 0 && this.rendertest()%}
        <div >111111111</div>
        {%this._data.move_start && '<div on:mouseup="move_block_up" on:mousemove="move_block_move" class="showMask"></div>'%}
        <div on:mousedown="move_block_down" class={%this._data.block%} style="left:{%this._data.left%}px;top:{%this._data.top%}px;"></div>
        <div>
          <div ref="testdiv1" on:click="clickdiv1">点击1</div>
        </div>
        <div>
          <div ref="testdiv2" on:click="{%'clickdiv1(2)'%}" >点击2</div>
        </div>
      </div>
    `
  }
}