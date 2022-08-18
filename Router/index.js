// 路由示例,目前只支持hash路由
class Router extends GFB.Router{
  constructor(){
    const Router = [
      {
        Path:'/',
        Component: Introduction,
      },
      {
        Path:'/QuickStart',
        Component: QuickStart,
      },
      {
        Path:'/Document',
        Component: Document,
      },
    ]
    super(Router)
  }
  BeforeRouter(from, to, next){ // 前置守卫
    next()
  }
  AfterRouter(from, to){} // 后置守卫 
}

