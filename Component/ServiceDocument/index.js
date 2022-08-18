class ServiceDocument extends GFB.Component {
  constructor() {
    super()
  }
  now_nav = 0
  nav_list = [
    {
      key: 0,
      type: "为什么是服务",
      content: `<div>
      如果你使用过redux或者vuex那么你一定知道状态树是做什么的<br/><br/>
      那么就说说为什么使用服务而不是状态树<br/><br/>
      开始之前我们了解两个重要的概念'组件状态'和'数据'<br/>
      组件状态：组件当前自身的属性值等影响视图渲染的数据<br/>
      数据：当前应用的数据，比如说用户的登录状态，用户的信息等<br/><br/>
      如果你使用过angular2+那么你对服务(Service)这个概念不会陌生<br/><br/>
      在angular中,并没有状态树的概念,而服务只负责数据的管理,而不负责组件状态的管理,这是两个重要的概念<br/><br/>
      而GFB使用服务而不是状态树,这是因为组件状态并不代表这当前应用的所有数据,在react和vue中,状态树的数据改变会直接影响视图的渲染<br/><br/>
      我认为这是不合理的,如果这个状态属于组件本身,那么他应该在组件内部,如果组件的状态会影响另一个组件的视图渲染,那么他应该是一个数据源,而不是一个组件状态<br/><br/>
      那么如果这个数据不是一个状态,那就应该把数据的处理权交还给组件,由组件来决定这个数据影响视图的方式而不是状态树直接替组件决定<br/><br/>
      在react和vue中,一旦组件订阅了状态树中的某个数据,那在数据改变的时候,组件就会自动响应<br/><br/>
      这种模式下,数据的流向是由状态树→组件,主动权在状态树,这不符合MVC设计模式的原则<br/><br/>
      而服务是一个数据管理的容器,他只负责数据的管理,且独立存在于应用中.与组件不存在任何关系<br/><br/>
      服务中的一个改变数据的函数如果注册到观察列表中,那么在这个方法被调用时,会通知观察者,由观察者来决定数据的处理方式<br/><br/>
      而未注册到观察列表中的数据改变方法,那么就不会通知观察者<br/><br/>
      在GFB中,服务是以注入的形式添加到组件中的,组件在挂载是会默认将自身的Update()函数添加到服务的观察者列表中<br/><br/>
      这样服务中被观察的函数触发时,组件就会通过Update()函数来获知数据的改变<br/><br/>
      开发者也可以在组件中定义自己的观察者,并将其添加到某个服务中<br/><br/>
      这种模式下,数据的流向是由组件→获取→服务→返回→组件,主动权在组件也就是开发者手中<br/><br/>
      这也更符合GFB的设计原则:让开发者决定GFB一切动作<br/><br/>
      GFB中的服务本身并没有对数据做过多的处理,只对开发者提供了一些便于开发的API<br/><br/>
      </div>`,
    },
    {
      key: 1,
      type: "如何编写服务",
      content: `<div>
      </div>`,
      sub: [
        {
          key: 11, text: "创建一个服务",
          content: `<div>
            GFB中提供一个服务基类GFB.Service,这个类是一个抽象类,我们可以在其实例化时传入自己定义的服务<br/><br/>
            它只接收一个function函数,function函数需要返回一个对象,这个对象中应该包含服务需要管理的数据和函数<br/><br/>
            这个function函数的this指向在Service初始化时会被指向Service本身并执行一次<br/><br/>
        </div>`},
        {
          key: 12, text: "注册被观察的函数",
          content: `<div>
            Service中提供了用于将函数注册到观察列表的Register()<br/><br/>
            它与Service的构造函数一样只接受一个function函数<br/><br/>
            这个function函数的this会指向Service<br/><br/>
        </div>`},
        {
          key: 13, text: "完整的示例",
          content: `<div>
            <img src="../../assets/create_services.png" />
        </div>`},
      ]
    },
    {
      key: 2,
      type: "如何使用服务",
      content: `<div>
      </div>`,
      sub: [
        {
          key: 21, text: "如何注入服务",
          content: `<div>
            在Init()的文档中提到它接收两个参数,其中一个是Service<br/><br/>
            开发者可以通过Service参数来注入自己的服务<br/><br/>
            Service是一个对象类型参数,key值为注入后的服务名称,value值为服务对开发者暴露的组件内部函数<br/><br/>
            开发者无法直接访问服务内的数据,只能通过服务中的函数来获取数据<br/><br/>
            示例:<br/>
            <img src="../../assets/injection_service.jpg"/><br/><br/>
        </div>`},
        {
          key: 22, text: "调用注册的服务",
          content: `<div>
            组件将获注册的服务加入到自身实力中,属性名为注册时的key值<br/><br/>
            开发者可以通过this[key][函数]的方式调用<br/><br/>
        </div>`},
        {
          key: 23, text: "完整示例",
          content: `<div>
            <img src="../../assets/use_service.png" /><br/><br/>
        </div>`},
      ]
    },
    {
      key: 3,
      type: "定义自己的观察者",
      content: `<div>
        开发者可以通过Service提供的API,定义自己的观察者并使用服务,这种方式可以应用在任何环境<br/><br/>
      </div>`,
      sub: [
        {
          key: 31, text: "Register()",
          content: `<div>
            Register()是一个高阶函数,它会将传入的函数包装后注册到观察者列表<br/><br/>
            在函数被调用时Service会通过检索注册的观察者,将函数的执行结果发送给观察者<br/><br/>
            并将执行结果返回给调用者,这是一个异步执行的过程<br/><br/>
        </div>`},
        {
          key: 32, text: "Get()",
          content: `<div>
            Get()可以返回被注册到观察列表的函数<br/><br/>
            它能接收一个参数，这个参数是在函数被注册时的key值<br/><br/>
            当开发者传入这个参数值时，Get()会返回指定key值的函数<br/><br/>
            否则将会返回当前服务下的所有函数<br/><br/>
        </div>`},
        {
          key: 33, text: "RegisterObserver()",
          content: `<div>
            开发者可以通过RegisterObserver()注册自己的观察者<br/><br/>
            RegisterObserver()接收一个对象类型参数,这个参数可以包含以下内容:<br/>
            Callback: 必填,这个回调参数在观察者接到通知后被触发,他接收当前服务函数执行后的返回值作为入参<br/>
            ObserverID: RegisterObserver()以这个参数作为key值来标识Callback,当未接收此参数时,Service会分配一个唯一Key<br/><br/>
            RegisterObserver()在成功注册观察者后,会返回ObserverID<br/><br/>
            如果Callback不为函数类型参数,或ObserverID已经存在,RegisterObserver会抛出错误并返回false<br/><br/>
        </div>`},
        {
          key: 34, text: "RemoveObserver()",
          content: `<div>
            RemoveObserver()接收ObserverID作为参数,删除指定ObserverID的观察者,并返回ObserverID<br/><br/>
            如果未接收ObserverID,或不存在指定ObserverID的ObserverID则会false<br/><br/>
        </div>`},
      ]
    },
  ]

  renderLeftItem() {
    let elm = ``
    for (let i in this.nav_list) {
      elm += `<div class="left_item">`
      elm += `<div 
        on:click="nav_switch(${this.nav_list[i]['key']})" 
        class="left_item_title ${this.nav_list[i]['key'] == this.now_nav && "nav_active"}">
        ${this.nav_list[i]['type']}
      </div>`
      for (let j in this.nav_list[i]['sub']) {
        elm += `<div 
          on:click="anchor_switch(${this.nav_list[i]['sub'][j]['key']})" 
          class="left_item_sub" 
          key="${this.nav_list[i]['sub'][j]['key']}">
          ${this.nav_list[i]['sub'][j]['text']}
        </div>`
      }
      elm += `</div>`
    }
    return elm
  }

  renderRightItem() {
    let elm = `<div class="right_item">
      <div class="right_item_title">${this.nav_list[this.now_nav]['type']}</div> 
      <div class="right_item_content">${this.nav_list[this.now_nav]['content']}</div>
      ${this.renderRightItemSub(this.nav_list[this.now_nav]['sub'])}
    </div>`
    return elm
  }
  renderRightItemSub(sub) {
    let elm = ``
    for (let i in sub) {
      elm += `<div class="right_item_sub_box">
        <div class="right_item_sub_anchor" ref="${sub[i]['key']}"></div>
        <div class="right_item_sub_title">${sub[i]['text']}</div>
        <div class="right_item_sub_content">${sub[i]['content'] || ''}</div>
      </div>`
    }
    return elm
  }

  nav_switch(key) {
    this.now_nav = key
    this.Update()
  }
  anchor_switch(key) {
    this.now_nav = parseInt(key / 10)
    this.Update()
    this.Refs[key].scrollIntoView()
  }

  Render() {
    return `
      <div class="DocumentComponent">
        <div class="left">
          ${this.renderLeftItem()}
        </div>
        <div class="right">
          ${this.renderRightItem()}
        </div>
      </div>
    `
  }
}