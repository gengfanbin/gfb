class ComponentDocument extends GFB.Component {
  constructor() {
    super()
  }
  now_nav = 0
  nav_list = [
    {
      key: 0,
      type: "前言",
      content: `<div>
        此文档并不是使用教程,文档中描述的更多是使用GFB时的一些基本知识和注意事项.<br/><br/>
        开发GFB的最初目的是为了兼容一切框架,定位与WebComponent类似<br/><br/>
        所以GFB库在开发时,明确了两个坚定不移的准则:<br/>
        一切以无入侵性为准则<br/>
        GFB一切动作由开发者决定<br/><br/>
        GFB的开发使用原生JavaScript语法,并且尽量简化API功能.这使得有一些功能与传统数据驱动的框架存在使用习惯上的差异<br/><br/>
        这部分差异是因为GFB坚持保证开发者在使用库的过程中可以直接使用JavaScript语法编码,尽量简化API<br/><br/>
        这也导致如果想处理使用习惯的差异需要增加很多无用代码,甚至需要修改底层逻辑<br/><br/>
        而且这一部分的差异并不影响GFB库的使用,只是对于使用者来说是需要一段时间适应的<br/><br/>
        <b>关于差异</b><br/><br/>
        在GFB中,Render函数抛出的并不是真正的DOM,而是JavaScript原生字符串,这使得在条件渲染和循环渲染等功能时不能像react那样直接循环DOM元素,而是采用字符串拼接的方式<br/><br/>
        这会给刚使用GFB库的开发者带来一些困扰,但是相信我,当你适应了这些差异后,会发现这种方式会让代码看起来更加容易理解<br/><br/>
        在GFB中不存在类似data或者state这样的API,是因为GFB将组件视为独立的类实例,并且每个组件都是一个单独的类,所以每个组件的属性和方法都是组件自身的状态<br/><br/>
        而且在GFB中,你会发现组件并不存在数据监听,而是使用触发式更新(Update函数)来实现组件状态的更新.对于这点如果使用过react和vue框架就会发现自动渲染的弊端<br/><br/>
        不论是在react还是在vue或者angular等框架中,都存在特定情况下,数据的变更未在预期的时间被执行更新,vue中特别明显,而框架为了解决这个问题,不得不推出更多的API或者hooks<br/><br/>
        <b>关于兼容</b><br/><br/>
        这里的兼容不是指浏览器环境的兼容,GFB是基于ES6的语法,所以并不支持在老旧的浏览器环境下运行<br/><br/>
        这里的兼容是指vue和react等其它框架的兼容.因为GFB只是一个"库",它特殊的实现方式保证它可以轻松的将代码插入到其它框架环境中<br/><br/>
        <b>关于数据管理</b><br/><br/>
        如果你使用过react或vue,并且接触过angular,你会发现,react中有redux,vue中有vuex,只有angular中没有状态树的概念<br/><br/>
        这是因为angular中使用Service服务来抽象module层,组件通过注入服务来获取Service中保存的状态,而这与状态树有着本质的区别<br/><br/>
        GFB采用类似angular中Service的模式来管理数据,这是因为service更适合管理数据,而不是状态<br/><br/>
        这种实现方式的好处是可以将数据和状态分离,更好的管理数据,更好的管理状态,更好的管理组件的状态<br/><br/>
        <b>关于路由</b><br/><br/>
        GFB的路由只实现了HASH模式,且只实现了一些简单的功能,这是因为在GFB的开发过程中,路由功能始终是一个边缘功能<br/><br/>
        实现路由的目的只是让GFB可以完成独立的单页应用等工程,而不至于缺少基础功能导致开发困难<br/><br/>
        GFB的真正威力在于它可以轻松的嵌入到其它框架中,而这种情况下,路由会影响到宿主环境<br/><br/>
        所以,如果想将GFB嵌入其它框架中,就不能使用路由功能<br/><br/>
      </div>`,
    },
    {
      key: 1,
      type: "模板功能",
      content: `<div>
        模板功能是数据驱动框架的核心功能,GFB尽量将模板功能封装的更接近于原生JavaScrtip语法.<br/><br/>
        使得模板功能更加简洁易用,同时使得模板功能更加灵活,更加容易扩展.<br/><br/>
        如果你熟悉react框架,那么你应该会觉得GFB的模板语法很熟悉<br/><br/>
        但是也需要注意,在react中,render函数的返回值是一个jsx元素<br/><br/>
        而在GFB中,Render函数的返回值始终是一个对DOM节点描述的字符串<br/><br/>
        在react的模板中使用\{JavaSrcipt代码段\}来实现变量的插入<br/><br/>
        而GFB中,模板始终是字符串,所以只要保证render中返回的字符串符合JavaSrcipt规则,就可以<br/><br/>
        当然,这也使得模板功能受到字符串类型的限制<br/><br/>
      </div>`,
      sub: [
        {
          key: 11, text: "条件渲染",
          content: `<div>
          前面提到,GFB的模板语法是字符串类型的,所以在条件渲染中,所以只要保证render返回的DOM描述字符串中不存在那段代码就可以了<br/><br/>
          推荐使用\`\`来包裹Render函数的返回值<br/><br/>
          这样便于使用JavaSrcipt语法<br/><br/>
        </div>`},
        {
          key: 12, text: "循环渲染",
          content: `<div>
          GFB虽然语法很像react,但是有着本质的区别,这导致在循环渲染时,我们需要更加注意<br/><br/>
          在GFB中,循环渲染实际上是一个字符串拼接的过程,而不是循环渲染同一个元素节点<br/><br/>
          所以在GFB中,只要符合JavaScript规则的字符串拼接,就可以使用循环渲染<br/><br/>
        </div>`},
        {
          key: 13, text: "事件绑定",
          content: `<div>
          GFB的事件绑定可以通过on\:eventName\"functionName\(params...\)\"来实现<br/><br/>
          GFB实际上,是通过模板解析,将eventName和functionName解析后,执行事件绑定<br/><br/>
          params...,是一个可选的参数列表,可以是任意多个的参数<br/><br/>
          GFB中,事件绑定传参方式与DOM事件绑定参数传递方式相同<br/><br/>
        </div>`},
        {
          key: 13, text: "模板注释",
          content: `<div>
          在GFB中采用与HTML一致的方式来注释模板<br/><br/>
          即&lt;!--  --&gt;,但是这并不是HTML原生注释,而是GFB通过模板解析来实现的<br/><br/>
        </div>`}
      ]
    },
    {
      key: 2,
      type: "基础属性",
      content: `<div>
        实际上,GFB中并不存在基础属性,只是为了开发者的开发习惯,提供了一些保留属性,这些属性可以帮助开发者更方便的开发<br/><br/>
      </div>`,
      sub: [
        {
          key: 21, text: "Props",
          content: `<div>
          在GFB中,Props只是一个保存父元素传值的对象<br/><br/>
          子组件标签上的属性值的必须是父组件中的一个属性,GFB否则会将属性值当做字符串传入子组件的Props中<br/><br/>
          Props在组件构造函数执行完毕后赋值,这会导致Props的内容在组件构造函数中不可见<br/><br/>
          注意！路由组件会阻挡父组件注入子组件的Props,这点也很好理解<br/><br/>
          虽然从DOM层面看不到路由,但逻辑层面上,父组件与子组件并没有直接关系,而是通过路由将子组件挂载到父组件指定节点的<br/><br/>
          Props 默认传入了以下内容:<br/>
          key:当前子组件的key值<br/>
          component:当前子组件类实例名称<br/>
          parent:父组件的类实例(如非必要,不要在子组件中直接调用父组件实例及其属性)<br/>
          其他自定义的Props属性<br/><br/>
        </div>`},
        {
          key: 22, text: "Refs",
          content: `<div>
          在GFB中,虽然不存在虚拟DOM树,但是每次组件的更新,会导致之前获取的DOM实例丢失<br/><br/>
          所以我们通过给模板元素添加ref="refName"来标识元素应该被记录到组件的Refs中,可以在类实例中通过this.Refs.refName来获取DOM实例,<br/><br/>
          但是需要注意的是,GFB中的Refs只提供了元素的DOM节点实例,如果节点是子组件,则不能通过Refs获取子组件的类实例<br/><br/>
          下面有专用的获取子组件类实例的方法GetSubExample()<br/><br/>
        </div>`}
      ]
    },
    {
      key: 3,
      type: "基础方法",
      content: `<div>
        GFB中提供了一些简单且必要的基础方法,这些方法可以帮助开发者更方便的开发<br/><br/>
      </div>`,
      sub: [
        {
          key: 31, text: "Init()",
          content: `<div>
          组件在实例化后并不会立即渲染,而是在第一次调用Init()方法后才执行初始化逻辑,这使得开发人员能够明确的知道组件初始化时机<br/><br/>
          当子组件未显式调用Init()时,父组件会在子组件构造函数执行完毕后执行一次Init()<br/><br/>
          在Init()方法中,可以传入一个对象类型参数,这个对象中可以包含以下内容:<br/>
          Component:{DomName:SubComponetName},从名字可以看出这个是注册到当前组件的子组件,key为Dom标签名称,值为子组件的类(无需实例化)<br/>
          Service:{},从名字可以看出这个是注册到当前组件的服务<br/><br/>
        </div>`},
        {
          key: 32, text: "Update()",
          content: `<div>
          在<<前言>>中,我们已经提到过,组件的更新是通过调用Update()方法来实现的<br/><br/>
          Update()方法会在调用时立即执行一次组件的更新逻辑<br/><br/>
          这个方法在对当前组件进行更新的同时,会通知其下挂载的所有当次渲染中应该被渲染的子组件进行更新<br/><br/>
          对于被条件渲染屏蔽的子组件,Update()方法不会通知其进行更新<br/><br/>
        </div>`},
        {
          key: 33, text: "Render()",
          content: `<div>
          在GFB中,每一个组件的实例必须实现Render()方法,这个方法必须return一个描述Dom节点的字符串<br/><br/>
          但是,Render()方法中返回的DOM描述字符串并不限制只有一个根节点<br/><br/>
          这是因为在GFB中,每一个组件标签都会被渲染成一个div标签,这就使得Render()输出的所有节点都会成为组件标签的子节点<br/><br/>
          当然,这也使得子组件的外层永远有一级父节点<br/><br/>
        </div>`},
        {
          key: 34, text: "GetSubExample()",
          content: `<div>
          在GFB中,每一个子组件都会被实例化后挂载到父组件指定位置,这使得父组件可以通过GetSubExample()方法来获取子组件的实例<br/><br/>
          且可以通过子组件实例来获得子组件的属性,就如同react和vue中的refs一样<br/><br/>
          GetSubExample()可以接受一个字符串参数key,返回指定key值子组件实例<br/><br/>
        </div>`},
        {
          key: 34, text: "ServiceObserver()",
          content: `<div>
          在GFB组件中注册的服务会被默认传入ServiceObserver()作为观察者<br/><br/>
          这个观察者在服务中某个被注册的函数被调用时触发<br/><br/>
          开发者可以通过ServiceObserver()处理当前组件对这个服务响应<br/><br/>
          它会接收两个参数:<br/>
          1、当前被触发的服务函数的名称<br/>
          2、当前服务函数执行后的返回值<br/><br/>
        </div>`}
      ]
    },
    {
      key: 4,
      type: "组件化",
      content: `<div>
        GFB的每一个实例都是一个组件(路由类是一个特殊的组件)<br/><br/>
      </div>`,
      sub: [
        {
          key: 41, text: "组件挂载",
          content: `<div>
          注意！子组件的挂载并不是在父组件初始化时进行的,而是在真正渲染子组件时进行,如果子组件并未在DOM描述字符串中体现,那么即使它被注册了,也依然不会被初始化.<br/>
          但是子组件的实例化一旦完成,就会一直存在于父组件中,即使模板更新时,子组件不再显示渲染,也不会被卸载<br/><br/>
          前文提到Init()中接收的参数对象中,可以包含一个Component属性,这个属性是一个对象,这个对象就是标识组件注入的参数<br/><br/>
          Component为一个对象类型参数,这个对象的key为自定义的组件标签名,值为组件的类(无需实例化)<br/><br/>
          以上这些在Init()方法的文档中已经提到过了,下面说明一下组件的使用方式:<br/><br/>
          在Render返回的模板字符串中&lt;ComponentName&gt;&lt;\/ComponentName>中的&lt;ComponentName&gt;为组件的标签名,&lt;\/ComponentName&gt;为组件结束标签<br/><br/>
          GFB中子组件标签必须是成对出现的,不允许出现自闭的子组件标签,这会导致模板解析错误<br/><br/>
          子组件标签中必须包含一个“唯一的key属性值”,如果多个子组件标签的key值相同,则会导致多个子组件使用同一个组件实例<br/><br/>
          当不同的子组件标签的key值相同时,会导致子组件渲染错乱,所以在给定子组件key值时应当注意其子组件key值在其父组件中的唯一性<br/><br/>
          这在GFB中是必须的,GFB中子组件的挂载是通过检索注册在Init()方法中的子组件,来标识Render模板中子组件标签,如果未注册的子组件,则会原型输出标签<br/><br/>
          当然,开发者也可以利用这一特性来实现一些特殊的功能<br/><br/>
          子组件挂载过程中会留存一个子组件实例,这个实例可以通过GetSubExample()方法来获取<br/><br/>
          示例:<br/>
<pre>
constructor(Elm){
  super(Elm)
  this.Init({
    Component:{
      Header,
      Router,
    },
  })
}</pre>
<pre>
Render() {
  return \`
    &lt;div&gt;
      &lt;Header class="header_component" key="Header" &gt;&lt;/Header&gt;
      &lt;Router key="IndexRouter"&gt;&lt;/Router&gt;
    &lt;/div&gt;
  \`
}</pre>
        </div>`},
        {
          key: 42, text: "Props传值",
          content: `<div>
          在GFB中,组件的属性传递是通过Props传递的,但与其他数据驱动框架的Props有一些差异<br/><br/>
          GFB中的Props传递是通过模板字符串中的属性值来传递的,这个属性值是通过模板字符串中的属性值来传递的,而不是通过属性名来传递的<br/><br/>
          Props传递的属性值有一些特殊,它不像其他框架一样进行传值<br/><br/>
          GFB会先检索Props的属性值,并判断属性值在当前组件中是否存在对应属性,如果不存在,则将属性值当做字符串传递给子组件<br/><br/>
          如果属性值存在:<br/>
          判断是否为函数类型,如果为函数,则将函数绑定this指向后,传递给子组件,保证子组件调用时函数可以以正确的环境执行<br/>
          如果不是函数类型的属性,则将属性直接传递给子组件<br/><br/>
        </div>`},
        {
          key: 43, text: "组件通信",
          content: `<div>
          子组件向父组件的通信可以通过Props传递的函数进行,这一点与其他数据驱动框架相同<br/><br/>
          但是父组件向子组件通信或获取子组件状态,则需要通过子组件类实例的方法来实现<br/><br/>
          获取子组件的方式有很多,最方便的是通过GFB提供的GetSubExample()函数获取子组件实例<br/><br/>
        </div>`}
      ]
    },
    {
      key: 5,
      type: "钩子函数",
      content: `<div>
        其实钩子函数就是组件的生命周期函数,它可以在组件的生命周期函数中进行调用<br/><br/>
        在GFB中,生命周期的调用顺序是:<br/>
        1、BeforeMount()<br/>
        2、Init()<br/>
        3、AfterMount()<br/>
        4、BeforeUpdate()<br/>
        5、Update()<br/>
        6、AfterUpdate()<br/><br/>
        注意！在任何生命周期中,都不推荐再次调用Init()和Update()方法<br/>
        这会以递归的形式触发子组件的生命周期函数,如果处理不当,则会导致堆栈溢出.<br/><br/>
      </div>`,
      sub: [
        {
          key: 51, text: "BeforeMount()",
          content: `<div>
            在Init()调用时,会先执行一次BeforeMount()方法<br/><br/>
            但是不论方法返回任何值都不会影响Init的执行<br/><br/>
            你可以在这里处理一些初始化的工作,比如获取数据,初始化组件状态等<br/><br/>
            因为此时你应该已经可以获得组件的实例了。<br/><br/>
        </div>`},
        {
          key: 52, text: "AfterMount()",
          content: `<div>
            在Init()调用时,在组件渲染后执行一次AfterMount()方法<br/><br/>
        </div>`},
        {
          key: 53, text: "BeforeUpdate()",
          content: `<div>
            在Update()调用时,会先执行一次BeforeUpdate()方法<br/><br/>
            与BeforeMount()方法相似,不论方法返回任何值都不会影响Update的执行<br/><br/>
            你可以在这修改一些组件状态或者数据.<br/><br/>
        </div>`},
        {
          key: 54, text: "AfterUpdate()",
          content: `<div>
            在Update()调用时,在组件更新后执行一次AfterUpdate()方法<br/><br/>
        </div>`}
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