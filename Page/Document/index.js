class Document extends GFB.Component {
  constructor() {
    super()
    this.Init({
      Component: {
        ComponentDocument,
        ServiceDocument,
        RouterDocument,
      }
    })
  }
  now_nav= 'RouterDocument'
  nav= [
    { key: 'ComponentDocument', name: '组件' },
    { key: 'ServiceDocument', name: '服务' },
    { key: 'RouterDocument', name: '路由' },
  ]
  switch(now_nav) {
    this.now_nav = now_nav
    this.Update()
  }

  document_nav() {
    let elm = ``
    this.nav.map(i => {
      elm += `<div on:click="switch('${i.key}')" 
        class="nav_item ${i.key==this.now_nav?'activeClass':''}">
        ${i.name}
      </div>`
    })
    return elm
  }

  document_content() {
    let elm = ``
    this.nav.map(i => {
      if(i.key==this.now_nav){
        elm = `<${i.key} key="${i.key}"></${i.key}>`
      }
    })
    return elm
  }

  Render() {
    return `
      <div class="document_box">
        <div class="document_nav">
          ${this.document_nav()}
        </div>
        <div class="document_content">
          ${this.document_content()}
        </div>
      </div>
    `
  }
}