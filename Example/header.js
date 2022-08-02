class header extends GFB {
  constructor(box){
    super(box,{
      SubComponent:sub
    })
    this.Init({})
  }

  Render() {
    return `
      <div>
        {% this.Props.name %}
        <SubComponent></SubComponent>
        <SubComponent></SubComponent>
      </div>
    `
  }
}