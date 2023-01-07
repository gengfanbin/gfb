const GFB=Object.freeze({Service:class Service{constructor(e,t){e?(this.#service_name=e,this.#init(t)):this.#ERROR("The developer should give a service name to identify the service")}#service_name=void 0;#ObserverList={};#ServiceList={};#ERROR(e){console.error(e)}#isFunction(e,t){return"function"==typeof e||(t&&this.#ERROR(t),!1)}#init(t){if(t&&this.#isFunction(t,"Service Error: Constructor accepts only function type arguments")){let e=t.apply(this);for(var i in e)this.#isFunction(e[i])?this.#ServiceList[i]=e[i].bind(this):this[i]||(this[i]=e[i])}}#createRandomNum(t){if(t){let e="";for(var i=0;i<t;i++)e+=parseInt(10*Math.random());return e}return 0}#triggerObserver(){for(var e in this.#ObserverList)this.#isFunction(this.#ObserverList[e])&&this.#call_Observer(...arguments,this.#ObserverList[e])}async#call_Observer(){let e=[...arguments],t=e.pop();t(...e)}RegisterObserver(e){let{CallBack:t,ObserverID:i}=e;if("function"!=typeof t)return this.#ERROR("register service observer error : CallBack is not a function"),!1;if(i){if(this.#ObserverList[i])return this.#ERROR("This observer already exists"),!1}else i=(new Date).getTime()+this.#createRandomNum(4);return this.#ObserverList[i]=t,i}RemoveObserver(e){return!(!e||!this.#ObserverList[e])&&(this.#ObserverList[e]=void 0,e)}Register(t,i){if(this.#isFunction(i,"Service Error: Observer accepts only function type arguments"))return function(){var e=i.apply(this,arguments);return this.#triggerObserver({result:e,function:t,service:this.#service_name}),e}}Get(e){let t=this.#ServiceList;return t=e?this.#ServiceList[e]:t}get ServiceName(){return this.#service_name}Remove(e){return e&&(this.#ServiceList[e]=void 0),!1}},Router:class Router{constructor(e){this.#Config=e}__TEMPLATE_BOX__=void 0;#Type="hash";#Config=new Array;#Example=new Object;Init(){"hash"===this.#Type&&this.#HashRouterInit()}Update(){this.#RouterRender()}#CurrentRoute=null;#RouterStack=new Array;GetRouterStack(){return this.#RouterStack}BeforeRouter(e,t,i){i()}AfterRouter(e,t){}#HashRouterInit(){this.#RouterController(),this.#HashRouterListener()}#HashRouterListener(){window.addEventListener("hashchange",()=>{this.#RouterController()})}#HashUrlResolution(){let e=window.location.hash;return e=0==e.length?"/":e.substring(1)}#MatchRoute(t){let i=!1;return this.#Config.map(e=>{t.toLowerCase()===e.Path.toLowerCase()&&(i=e)}),i}#RouterController(){this.#CurrentRoute=this.#MatchRoute(this.#HashUrlResolution());var e=this.#RouterStack[this.#RouterStack.length-1];this.BeforeRouter(e,this.#CurrentRoute,this.#RouterRender.bind(this)),this.AfterRouter(e,this.#CurrentRoute)}#RouterRender(t){if(this.#CurrentRoute){let e=this.#CurrentRoute;for(var i in t&&(e=this.#MatchRoute(t)),this.#RouterStack.push(e),this.#Example[e.Path]?(this.#Example[e.Path].__TEMPLATE_BOX__=this.__TEMPLATE_BOX__,this.#Example[e.Path].Update()):(this.#Example[e.Path]=new e.Component,this.#Example[e.Path].__TEMPLATE_BOX__=this.__TEMPLATE_BOX__,this.#Example[e.Path].Init()),this.#Example)i!=e.Path&&this.#Example[i]&&(this.#Example[i].Destroy(),this.#Example[i]=void 0)}}Push(e){return window.location.hash=e}Replace(e){var t=this.#RouterStack.pop(),e=window.location.origin+window.location.pathname+"#"+e;return window.location.replace(e),t}},Component:class Component{constructor(e){e&&(1===e.nodeType?this.__TEMPLATE_BOX__=e:this.#ERROR("The constructor only accepts one standard DOM element node, and the nodeType of this node must be 1"))}__TEMPLATE_BOX__=void 0;Props={};Refs={};#InitState=!1;#template=void 0;#ComponentExample=[];#Component={};Service=[];ServiceObserver(){}BeforeMount(){}AfterMount(){}BeforeUpdate(){}AfterUpdate(){}BeforeDestroy(){}AfterDestroy(){}#regular={releaseComponent:e=>new RegExp(`<${e}(.*)</${e}>`,"gmsi")};#ERROR(e){console.error(`class: ${this.constructor.name}: `+e)}Render(){this.#ERROR("The instance class must implement the render method")}#isFunction(e,t){return"function"==typeof e||(t&&this.#ERROR(t),!1)}#isObject(e,t){return"[object Object]"===Object.prototype.toString.call(e)||(t&&this.#ERROR(t),!1)}#isArray(e,t){return!!Array.isArray(e)||(t&&this.#ERROR(t),!1)}Init(e={}){this.#isObject(e,"Init only accepts object type data")&&(e.Service&&(this.#isObject(e.Service)||this.#isArray(e.Service)?this.#registerService(e.Service):this.#ERROR("Service can only be an array or object type parameter")),e.Component&&this.#isObject(e.Component,"Component only accepts object type data")&&(this.#Component=e.Component),this.#InitState?this.#output("update"):(this.BeforeMount(),this.#output("init"),this.AfterMount(),this.#InitState=!0))}Update(){this.BeforeUpdate(),this.#output("update"),this.AfterUpdate()}Destroy(){this.BeforeDestroy(),this.#ComponentExample.map(e=>{e.Example.Destroy()}),this.AfterDestroy()}#output(e){this.__TEMPLATE_BOX__&&(this.#template=this.Render().trim(),this.#filterNotes(),this.#signComponent(),this.#analysisDom(),this.#registerComponent(e),this.__TEMPLATE_BOX__.innerHTML="",this.__TEMPLATE_BOX__.appendChild(this.#template))}#filterNotes(){let e="";for(;;){var t=this.#template.indexOf("\x3c!--"),i=this.#template.indexOf("--\x3e");if(-1==t){e+=this.#template;break}e+=this.#template.substring(0,t),this.#template=this.#template.substring(i+3),e+="\x3c!-- --\x3e"}this.#template=e}#signComponent(){for(let i in this.#Component)this.#template=this.#template.replace(this.#regular.releaseComponent(i),e=>{let t=e.replaceAll("<"+i,"<div component="+i);return t=t.replaceAll(`</${i}>`,"</div>")})}#analysisDom(){let e=document.createElement("div");if(e.innerHTML=this.#template,1<e.childNodes.length)return this.#ERROR("There can only be one root element in a template"),!1;this.#template=this.#ergodicNode(e.childNodes[0])}#ergodicNode(t){if((t=this.#bindDomAttr(t)).childNodes)for(let e=0;e<t.childNodes.length;e++)this.#ergodicNode(t.childNodes[e]);return t}#bindDomAttr(template){if(template.attributes&&0<template.attributes.length)for(let i=0;i<template.attributes.length;i++)if("ref"==template.attributes[i].name)this.Refs[template.attributes[i].value]=template;else if(0===template.attributes[i].name.indexOf("on:")){let eventName=template.attributes[i].name.substring(3),eventFunc=template.attributes[i].value,eventParams=eventFunc.split("(");eventParams=1<eventParams.length?(eventFunc=eventParams[0],eventParams[1].split(")")[0]):void 0,template.addEventListener(eventName,()=>{eventParams?eval(`this[eventFunc](${eventParams})`):this[eventFunc]()})}return template}#registerService(e){for(var t in e)e[t].RegisterObserver({CallBack:this.ServiceObserver.bind(this)}),this[e[t].ServiceName]=e[t].Get()}#registerComponent(r){this.#ComponentExample.map(e=>{e.State=!1});for(let i in this.#Component){let e=this.#template.querySelectorAll(`[component=${i}]`);e.forEach(t=>{if(t.getAttribute("key")){let e=this.#findSubComponent(t.getAttribute("key"));"update"==r&&e&&e.Example?(e.State=!0,e.Example.__TEMPLATE_BOX__=t,e.Example.Update()):this.#subComponentInit(t,this.#Component[i])}else this.#ERROR(`<${t.attributes.component.value}> The component must give a declared key value`)})}this.#ComponentExample=this.#ComponentExample.filter(e=>!!e.State||(e.Example.Destroy(),!1))}#subComponentInit(e,t){var i=e.getAttribute("key");let r=new t;r.__TEMPLATE_BOX__=e,r.Props=this.#registerProps(e),r.Init(),this.#ComponentExample.push({Key:i,State:!0,Example:r})}#findSubComponent(t){let i=null;return this.#ComponentExample.map(e=>{e.Key==t&&(i=e)}),i}#registerProps(t){let i=new Object;for(let e=0;e<t.attributes.length;e++)this.#isFunction(this[t.attributes[e].value])?i[t.attributes[e].name]=this[t.attributes[e].value].bind(this):this[t.attributes[e].value]?i[t.attributes[e].name]=this[t.attributes[e].value]:i[t.attributes[e].name]=t.attributes[e].value;return i.parent=this,i}GetSubExample(t){let i=this.#ComponentExample;return t&&this.#ComponentExample.map(e=>{e.Key==t&&(i=e.Example)}),i}}});