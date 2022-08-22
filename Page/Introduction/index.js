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
            <img src="./logo_w.png" class="logo" />
            <span>G</span><span>F</span><span>B</span>
          </div>
          <div class="tips_box">
            <div class="tips">
              <span>慷慨（Generousa）</span>
              <span>它可以以库的形式将自己慷慨的奉献给其他框架</span>
            </div>
            <div class="tips">
              <span>流畅（Fluent）</span>
              <span>它使用原生DOM，在无论组件下挂载多少子组件，也只会进行一次DOM渲染</span>
            </div>
            <div class="tips">
              <span>简明（Brief）</span>
              <span>它使用原生JavaScript语法，开发者只需要了解一下它的基础API即可进行开发</span>
            </div>
          </div>
        </div>
        <div class="download_box">
          <span class="download_button" on:click="download('https://www.gfb-js.com/gfb.js')">开发版下载</span>
          <span class="download_button" on:click="download('https://www.gfb-js.com/gfb-min.js')">生产版下载</span>
        </div>
      </div>
    `
  }
}