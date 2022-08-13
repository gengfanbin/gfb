class Index extends GFB.Component {
  constructor(Elm){
    super(Elm)
    this.Init({
      State: {data:1},
      Component:{Router},
      Service:{IndexService},
    })
  }
  test(){
    this.Update({data: this.State.data +1})
  }
  Render() {
    return `
      <div on:click="test">
        <Router key="IndexRouter" num={%this.State.data%}></Router>
      </div>
    `
  }
}