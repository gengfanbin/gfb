// 路由示例,目前只支持hash路由
class Router extends GFB.Router{
  constructor(Elm){
    const Router = [
      {
        Path:'/',
        Component: Introduction,
      },
      {
        Path:'/Document',
        Component: Document,
      },
    ]
    super(Elm, "hash", Router)
  }
  BeforeRouter(from, to, next){
    next()
  }
  AfterRouter(){}
}