### 特别说明
**GFB并不是一个数据驱动框架，它是一个封装了数据驱动功能的库**，但它实现了与框架相似的功能，你可以将它引入任何项目中，以原生js的方式使用它。

**GFB is not a data-driven framework. It is a library that encapsulates data-driven functions**.But it realizes the function similar to the framework, You can introduce it into any project and use it in the way of native JS.

它不具备入侵性，不会影响宿主，但是需要注意，它基于ES6的class类特性实现，如果你需要兼容低版本浏览器，那它不太适合你。

It is not invasive and will not affect the host, but it should be noted that it is based on the class feature of ES6. If you need to be compatible with low version browsers, it is not suitable for you.

**你可以使用它创建单页应用，但是需要注意不要频繁更新根组件**。这是因为在数据更新过程中，GFB会重新渲染自身及其下的所有应该被挂载的子组件。当项目体量过大时，频繁更新根组件将会影响运行效率。**但好消息是组件的每次更新只会进行一次DOM渲染，无论它挂载了多少子组件。**

**You can use it to create a single page application, But be careful not to update the root component frequently**. This is because during the data update process, GFB will re render itself and all sub components under it that should be mounted. When the project volume is too large, frequent updating of the root component will affect the operation efficiency.**But the good news is that each update of a component will only render DOM once, no matter how many sub components it has attached.**


### 文档
**关于文档的使用方式**

**About how documents are used**

**第一步**：克隆代码库到本地

**Step 1**： clone the code base locally

**第二步**：在浏览器环境运行项目中的index.html文件即可查阅文档

**Step 2**： Run the index.html file in the project in the browser environment to view the document


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


### 想要帮助它

如果你想要帮助它尽快成长，可以加入它的开发团队

If you want to help it grow as quickly as possible, you can join its development team

**邮箱（Email）**: gfb_js@163.com
**QQ交流群(QQ)**: 894682919

如果发现它存在的一些缺陷，可以邮箱告知于它，它会第一时间回复您。

If you find some defects in it, you can email it and it will reply you in the first time.