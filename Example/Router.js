// 路由示例,目前只支持hash路由
class Router extends GFB.Router{
  constructor(Elm){
    const Router = [
      {
        Path:'/',
        Component: Index,
      },
      {
        Path:'/Document',
        Component:Document,
      },
      {
        Path:'/Introduction',
        Component:Introduction,
      },
    ]
    super(Elm, "hash", Router)
  }
  BeforeRouter(from, to, next){
    next()
  }
  AfterRouter(){}
}