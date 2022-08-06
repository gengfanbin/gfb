class Introduction extends GFB.Component {
  constructor(Elm){
    super(Elm)
    this.Init({
      data:1
    })
  }
  test(){
    this.Update({
      data: this.State.data +1
    })
  }
  Render(){
    return`
      <div on:click="test" >introduction component {% this.State.data %}</div>
    `
  }
}