class Generousa extends GFB.Component {
  constructor(){
    super()
  }
  Render() {
    return `
      <div class="Generousa">
        <div class="title">嵌入其他框架</div>
        <div class="text_box">
          <div>前文提到GFB可以以库的形式嵌入到其他框架中,这也是开发GFB库的初衷</div>
          <div>下面是以Vue框架为例,来演示如何将GFB嵌入其中,并进行响应与传值等功能</div>
        </div>
        <div class="tips_box">
          我们先创建一个GFB的组件,如果你还不熟悉它,请先去跟着快速入门做一遍<br/>
          这里只提供一个简单的GFB组件与外部沟通的示例<br/>
          在这个示例中,我们将在GFB组件内渲染一个button按钮,通过点击这个按钮,通知Vue进行num+1的操作<br/>
          之后将数据回传到GFB组件中,组件接收到数据,并显示出来<br/>
          首先我们要制作一个GFB的组件,像下面这样:
        </div>
<pre>
import GFB from 'gfb'
export default class GFBComponent extends GFB.Component{
  constructor(Elm,add_fn,num){
    super(Elm)
    this.num = num
    this.add_fn = add_fn
    this.Init()
  }
  listener(params){
    this.num = params
    this.Update()
  }
  Render(){
    return \`
      &lt;div>
        &lt;button on:click="add_fn">add&lt;/button>
        &lt;div>\${this.num}&lt;/div>
      &lt;/div>
    \`
  }
}
</pre>
        <div class="tips_box">
          在上面的代码中,我们在constructor构造函数中除了挂载元素Elm以外又接收了两个参数<br/>
          add_fn函数为Vue中传入的事件处理函数<br/>
          num为外部传入组件内的数据<br/>
          我们在构造函数中,将这两个参数赋值给组件实例,并对add_fn()进行了事件绑定,之后对组件进行了初始化<br/>
          并且,我们在这个GFB组件中创建了一个listener函数,这个函数用来给外部调用时执行组件内部逻辑<br/>
          现在,我们要将它挂载到Vue的组件中,假设我们有一个下面这样的Vue组件:
        </div>
<pre>
&lt;template>
  &lt;div id="app">
    &lt;div ref="Box">&lt;/div>
  &lt;/div>
&lt;/template>
&lt;script>
import GFBComponent from './GFBComponent';
export default {
  name: 'App',
  data(){
    return{
      num:1,
    }
  },
  mounted() {
    this.GFB = new GFBComponent(this.$refs.Box,this.add,this.num)
  },
  methods: {
    add(){
      this.num+=1
      this.GFB.listener(this.num)
    },
  },
}
&lt;/script>
</pre>
        <div class="tips_box">
          首先,我们将制作好的GFB组件引入到Vue组件内<br/>
          之后,我们在Vue中定义了一个一个add()方法和num数据<br/>
          然后在mounted()钩子上对GFB组件进行了实例化,传入一个元素节点,并且将add()和num也一同传入到GFB组件中<br/>
          并且,将GFB的组件实例保存了起来,方便后续使用它<br/>
          在上面的示例中,我们定义的add()方法中,在执行了num += 1的操作<br/>
          然后,使用保存的GFB组件实例中的listener()函数,将num数据重新回传给了GFB组件<br/>
          GFB组件中的listener()函数更新了num并触发了一次更新逻辑,进行了重新渲染<br/>
          至此就已经完成了一次简单的外部通信<br/><br/>
          除此之外,我们还可以通过Service和观察者来实现外部通信<br/>
          GFB的Service与组件是完全解耦的,Service可以在任何JavaScript环境下运行<br/>
          通常来说,使用Service来进行通信是一个更通用的做法,开发者可以自己尝试一下<br/>
        </div>
      </div>
    `
  }
}