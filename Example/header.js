class header extends GFB {
  constructor(box){
    super(box)
    this.Init({})
  }

  Render() {
    return `
      <div style={%"color:red"%} name={%{test:1}%}>
        hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
      </div>
    `
  }
}