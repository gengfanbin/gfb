如果你不想使用庞大的脚手架，又想体验数据驱动的便利性时，这个库是你不二的选择。

When you don't want to use a huge scaffold and want to experience the convenience of data drive, this library is your only choice.

它的大小只有几个K，实现了最原始的数据驱动功能。

It is only a few K in size, realizing the most primitive data-driven function.

它只有几个主要且易于理解的API，因此开发人员可以自由地利用他们的想象力开发自己的页面。

It has only a few main and easy to understand APIs, so that developers can freely use their imagination to develop their own pages.

它的语法类似于react，但没有虚拟dom。开发人员可以以原生方式操作DOM节点。

Its syntax is similar to react, but it has no virtual dom. Developers can manipulate DOM nodes in a native way.

由于它是以原生DOM操作实现，所以只要您熟悉它，就可以轻松地将其嵌入任何已知的前端UI框架中。

Because it is a native DOM operation, it can be easily embedded in any known front-end UI framework, provided that you are familiar with that framework.

例如，您可以使用它开发自己的UI组件，然后将它们同时嵌入react、Vue、angular和其他框架中。

For example, you can use it to develop your own UI components, and then embed them into react, Vue, angular and other frameworks at the same time.

目前，它还比较年轻，需要成长。希望得到更多的帮助。

At present, it is still young and needs to grow. Hope to get more help.

### 注意：

它并不适合制作单页应用，因为它在每次更新数据时会重新渲染当前组件，并对其下的子组件们进行重新挂载。

It is not suitable for making single page applications, because it will re render the current component and re mount the sub components under it every time the data is updated.

这是一个耗时耗能的过程。在制作单页应用时，如果对根组件频繁更新会大量占用计算资源。

This is a time-consuming and energy consuming process. When making a single page application, if the root component is updated frequently, it will consume a lot of computing resources.

但幸运的是它每次更新只会进行一次DOM渲染。

Fortunately, it only renders DOM once per update.