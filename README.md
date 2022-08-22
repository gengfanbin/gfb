<p align="center">GFB</p>

<p align="center">G(generousa) F(fluent) B(brief)</p>


### Special note:

**GFB is not a data-driven framework. It is a library** that encapsulates data-driven functions. However, it implements functions similar to the framework. You can introduce it into any project and use it in a native JS way.

It is not invasive and will not affect the host, but it should be noted that it is based on the class feature of ES6. If you need to be compatible with low version browsers, it is not suitable for you.


**You can use it to create a single page application, But be careful not to update the root component frequently**. This is because during the data update process, GFB will re render itself and all sub components under it that should be mounted. When the project volume is too large, frequent updating of the root component will affect the operation efficiency.**But the good news is that each update of a component will only render DOM once, no matter how many sub components it has attached.**


### document
**About how documents are used**

**Step 1**： clone the code base locally

**Step 2**： Run the index.html file in the project in the browser environment to view the document


### Why use it

If you don't want to use a huge framework and want to experience the convenience of data-driven, it will be a good choice for you.


Its size is only a few K, and it realizes a simple and practical data-driven function.


**It can be guaranteed at any time that the update logic will be executed only when you explicitly need to update it**

**It has only a few easy-to-use and easy to understand APIs, without complex API design**, so developers do not need to spend effort to understand its underlying can be easily used.

It uses native JavaScript as the development language, and there is no virtual DOM, which allows developers to quickly become familiar with it.

**Because all its features only depend on the special implementation of its code itself, it can be easily embedded in any known front-end UI framework**, provided that you are familiar with that framework.

For example, you can use it to develop your own UI components, and then embed them into react, Vue, angular and other frameworks at the same time.

At present, it is still young and needs to grow. Hope to get more help.


### Want to help it

**Email**: gfb_js@163.com

If you find some defects in it, you can email it and it will reply you in the first time.