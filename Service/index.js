let IndexService = new GFB.Service(function(){
  return {
    now_nav: "/", // 数据
    switch_nav: this.Register('router_switch',function(nav){ // 注册到观察列表的函数
      this.now_nav = nav
      return this.now_nav
    }),
    get_nav(){ // 未注册到观察列表的函数
      return this.now_nav
    },
  }
});