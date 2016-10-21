/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const DOMNodeCollection = __webpack_require__(1);

	window.$l = function(selector){
	  let nodeList = [];
	  if (typeof selector === "function" ){
	      window.addEventListener("load", selector)
	  }
	  else if (selector instanceof HTMLElement) {
	    nodeList = selector
	  }
	  else {
	    nodeList = document.querySelectorAll(selector);
	  }

	  let arr = [];
	  for (var i = 0; i < nodeList.length; i++) {
	    arr.push(nodeList[i]);
	  }

	  return new DOMNodeCollection(arr)
	}


	window.$l.extend = function(...args) {
	  let mainArg = args[0];
	  let argList = args.slice(1);
	  argList.forEach((el) => {
	    for(let k in el) {
	      mainArg[k] = el[k];
	    }
	  })

	  return mainArg
	}

	window.$l.ajax = function(options){
	  let defaults = {
	    success: (e)=>{console.log(`${JSON.parse(e)}`)},
	    error:(e)=>{console.log(`${JSON.parse(e)}`)},
	    url:"",
	    method:"GET",
	    data:{},
	    contentType:'application/x-www-form-urlencoded; charset=UTF-8'
	  }

	  options = window.$l.extend(defaults,options)
	  const xhr = new XMLHttpRequest();

	  xhr.open(options["method"],options["url"])
	  xhr.onload = options["success"]

	  xhr.send(options["data"])

	}


/***/ },
/* 1 */
/***/ function(module, exports) {

	class DOMNodeCollection {
	  constructor(elements) {
	    this.elements = elements;
	  }

	  empty(){
	    this.html("")
	  }

	  remove(){
	    for (var i = 0; i < this.elements.length; i++) {
	      let parent = this.elements[i].parentElement
	      parent.removeChild(this.elements[i])
	    }
	    this.elements = []
	  }

	  attr(attrName=""){
	    if (attrName !== "") {
	      return this.elements[0].getAttribute(attrName)
	    }
	    else {
	      return this.elments[0].attributes
	    }
	  }

	  addClass(arg){
	    for (var i = 0; i < this.elements.length; i++) {
	      this.elements[i].classlist.add(arg)
	    }
	  }

	  removeClass(arg){
	    for (var i = 0; i < this.elements.length; i++) {
	      this.elements[i].classlist.remove(arg)
	    }
	  }

	  append(arg){
	    if (arg instanceof DOMNodeCollection) {
	      for (var i = 0; i < this.elements.length; i++) {
	        for (var j = 0; j < arg.elements.length; j++) {
	          this.elements[i].innerHTML += arg.elements[j].outerHTML
	        }
	      }
	    } else if (typeof arg === "string") {
	      for (var i = 0; i < this.elements.length; i++) {
	        this.elements[i].innerHTML += arg
	      }
	    } else if (arg instanceof HTMLElement) {
	      for (var i = 0; i < this.elements.length; i++) {
	        this.elements[i].innerHTML += arg.outerHTML
	      }
	    }
	  }


	  html(string = null){
	    if (string === null) {
	      return this.elements[0].innerHTML
	    } else {
	      for (var i = 0; i < this.elements.length; i++) {
	        this.elements[i].innerHTML = string
	      }
	    }
	  }

	  find(selector){
	    let array = []
	    for (var i = 0; i < this.elements.length; i++) {
	      array.push(this.elements[i].querySelectorAll(selector))
	    }
	    return new DOMNodeCollection(array)
	  }

	  children(){
	    let childList = [];
	    for (var i = 0; i < this.elements.length; i++) {
	      childList.push(this.elements[i].children);
	    }

	    return new DOMNodeCollection(childList)
	  }

	  parent(){
	    let parentList = [];
	    for (var i = 0; i < this.elements.length; i++) {
	      parentList.push(this.elements[i].parentElement);
	    }

	    return new DOMNodeCollection(parentList)
	  }

	  on(action, callback){
	    for (var i = 0; i < this.elements.length; i++) {
	      this.elements[i].addEventListener(action,callback)
	    }
	  }
	}

	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);