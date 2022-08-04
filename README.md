### 特别说明
GFB并不是一个数据驱动框架，它是一个封装了数据驱动功能的库，你可以将它引入任何项目中，以原生js的方式使用它。

GFB is not a data-driven framework. It is a library that encapsulates data-driven functions. You can introduce it into any project and use it in the way of native JS.

它不具备入侵性，不会影响外部，但是需要注意，它基于ES6的class类特性实现，如果你需要兼容低版本浏览器，那它不太适合你。

It is not intrusive and will not affect the outside world, but it should be noted that it is based on the class feature of ES6. If you need to be compatible with low version browsers, it is not suitable for you.

你可以使用它创建单页应用，但是并不推荐这么做，这是因为在数据更新过程中，GFB会重新渲染自身并重新挂载挂载其下的所有应该被挂载的子组件。当项目体量过大时，频繁更新根组件将会影响运行效率。**但好消息是每次更新只会进行一次DOM渲染，无论它挂载了多少子组件。**

You can use it to create a single page application, but it is not recommended, because GFB will re render itself and re mount all the sub components that should be mounted under it during the data update process. When the project volume is too large, frequent updating of the root component will affect the operation efficiency.**But the good news is that DOM rendering occurs only once per update, no matter how many subcomponents it mounts.**

创建它的初衷是想使用它构建一套可以兼容现在主流前端框架的UI库。它的定位类似**WebComponents**。

The original intention of creating it is to use it to build a set of UI libraries that are compatible with the current mainstream front-end framework. Its positioning is similar to **WebComponents**.


### 文档
**关于文档的使用方式**

**About how documents are used**

**第一步**：克隆代码库到本地

**Step 1**： clone the code base locally

**第二步**：在浏览器环境运行项目中的index.html文件即可

**Step 2**： run the index.html file in the project in the browser environment


### 为什么使用它
**如果你不想使用庞大的框架，又想体验数据驱动的便利性时，它将是你不错的选择**。

If you don't want to use a huge framework and want to experience the convenience of data-driven, it will be a good choice for you.

它的大小只有几个K，实现了简单且实用的数据驱动功能。

Its size is only a few K, and it realizes a simple and practical data-driven function.

**它只有几个便于使用且易于理解的API，没有复杂的架构设计**，因此开发人员不需要耗费心力去了解它的底层就可以轻易的使用。

**It has only a few APIs that are easy to use and understand, and there is no complex architecture design**, so developers do not need to spend effort to understand its underlying can be easily used.

它的语法类似于react，**但没有虚拟dom**。开发人员可以以原生方式操作DOM节点。

Its syntax is similar to react, **but it has no virtual dom**. Developers can manipulate DOM nodes in a native way.

由于它的**所有特性只依赖其代码本身的特殊实现方式**，所以只要您熟悉它，就可以**轻松地将其嵌入已知的其他前端UI框架中**。

**Because all its features only depend on the special implementation of its code itself, it can be easily embedded in any known front-end UI framework**, provided that you are familiar with that framework.

例如，您可以使用它开发自己的UI组件，然后将它们同时嵌入react、Vue、angular和其他框架中。

For example, you can use it to develop your own UI components, and then embed them into react, Vue, angular and other frameworks at the same time.

目前，它还比较年轻，需要成长。希望得到更多的帮助。

At present, it is still young and needs to grow. Hope to get more help.


### 注意：

它并不适合制作**大体量**的单页应用，因为它在每次更新数据时会重新渲染当前组件，并对其下的子组件们进行重新挂载。

It is not suitable for making **large-scale** single page applications, because it will re render the current component and re mount its sub components every time the data is updated.

这是一个耗时耗能的过程。在制作单页应用时，如果对根组件频繁更新会大量占用计算资源。

This is a time-consuming and energy consuming process. When making a single page application, if the root component is updated frequently, it will consume a lot of computing resources.

**但幸运的是无论根组件下挂载了多少子组件，每次更新时它只会进行一次DOM渲染。**

Fortunately, no matter how many subcomponents are mounted under the root component, it will only render DOM once every time it is updated.