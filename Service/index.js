let IndexService = new GFB.Service(function(){
  return {
    data: 1,
    test: this.Observer(function(){
      this.data = this.data + 1;
      return true
    }),
    echo(){
      return this.data
    },
  }
})