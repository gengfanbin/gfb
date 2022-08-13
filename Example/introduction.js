class Introduction extends GFB.Component {
  constructor(Elm){
    super(Elm)
    this.Init({
      State: {
        data:1
      },
      Service:{IndexService},
    })
  }
  test(){
    this.IndexService.test();
    this.Update({
      data: this.State.data +1
    })
  }
  Render(){
    return`
      <div on:click="test" >introduction component {% this.State.data %}，{% this.IndexService.echo() %}</div>
    `
  }
}