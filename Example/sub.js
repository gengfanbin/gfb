class sub extends GFB {
  constructor(elm){
    super(elm)
    this.Init({})
  }

  Render() {
    return `
      <div style={%"color:red"%} name={%{test:1}%}>
        sssssssssssssss
      </div>
    `
  }
}