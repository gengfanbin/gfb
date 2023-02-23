class Introduction extends GFB.Component {
  constructor(){
    super()
  }

  download(link){
    window.open(link)
  }
  
  Render(){
    return`
      <div class="Introduction">
        <div class="top">
          <div class="logo_box">
            <img src="./logo.png" class="logo" />
            <span>G</span><span>F</span><span>B</span>
          </div>
          <div class="tips_box">
            <div class="tips">
              <span>慷慨（Generousa）</span>
              <span>它可以以库的形式将自己慷慨的奉献给其他框架</span>
            </div>
            <div class="tips">
              <span>流畅（Fluent）</span>
              <span>它使用原生DOM，无论父组件下挂载多少子组件，也只会进行一次DOM渲染</span>
            </div>
            <div class="tips">
              <span>简明（Brief）</span>
              <span>它使用原生JavaScript语法，开发者只需要了解一下它即可进行开发</span>
            </div>
          </div>
        </div>
        <div class="download_box">
          <span class="download_button" on:click="download('./GFB/gfb.js')">
            开发版下载(1.0.12)
          </span>
          <span class="download_button" on:click="download('./GFB/gfb-min.js')">
            生产版下载(1.0.12)
          </span>
        </div>
        <div class="bottom_text_box">
          我必须说明我为什么创建这么一个不伦不类的数据驱动UI库，在当前的前端生态中，老牌数据驱动UI框架有React、VUE和Angular等，它们生态完善，功能强大，不是一个新生的数据驱动库能够替代的。新生的数据驱动框架有Svelte这样的后起之秀。正常来说完全没必要开发一个新的数据驱动UI框架，更不要说一个功能有缺陷的UI库了。
          <br /><br />
          但是我所在的公司遇到了这样一个问题，我们公司因为业务需要，受到外部渠道平台的技术规范要求，需要将一个项目，发布到不同的技术架构中，有一些是原生JS环境、或者是React，或者是VUE，还有一些是不兼容的版本的技术架构。这导致我需要将一个项目，使用不同的技术架构去编写截然不同的代码，而这些代码却做了相同的事情。这还不是最让我困扰的，更让我困扰的是，当一个需求迭代变更时，我们通常需要将所有不同架构的代码进行更改，有时候仅仅一个小小的文案改动，需要修改多个版本的代码，然后分别进行打包上传。
          <br /><br />
          在这种情况下，我萌生了开发一套在各个不同技术框架中运行，且能不影响宿主环境的一套数据驱动UI库，并且它需要能方便的与宿主环境进行通信，于是GFB-js出生了，它可以独立运行，也可以将自己嵌入到React、VUE或者其他环境，并且通过Service与宿主环境进行通信。这样我通过GFB可以进行一次开发，处处使用。并且我可以不需考虑宿主的通信机制，使用Service建立一套不影响宿主环境的另一套通信系统。 
        </div>
      </div>
    `
  }
}