let IndexService = new GFB.Service(function(){
  return {
    data: 1, // 数据
    add: this.Register(function(){ // 注册到观察列表的函数
      this.data = this.data + 1;
    }),
    echo(){ // 未注册到观察列表的函数
      return this.data
    },
  }
});