class Document extends GFB.Component {
  constructor(Elm) {
    super(Elm)
    this.Init({
      State: {
        nav: [
          { key: 'ComponentDocument', name: '组件' },
          { key: 'ServiceDocument', name: '服务' },
          { key: 'RouterDocument', name: '路由' },
        ]
      },
      Component: {
        ComponentDocument,
        ServiceDocument,
        RouterDocument,
      }
    })
  }

  render_left() {
    let elm = ``
    this.State.nav.map(i => {
      elm += `<div class="left_item">${i.name}</div>`
    })
    return elm
  }

  render_right() {
    let elm = ``
    this.State.nav.map(i => {
      elm = `<${i.key} key="${i.key}"></${i.key}>`
    })
    return elm
  }

  Render() {
    return `
      <div class="document_box">
        <div class="document_left">
          {% this.render_left() %}
        </div>
        <div class="document_right">
        {% this.render_right() %}
        </div>
      </div>
    `
  }
}