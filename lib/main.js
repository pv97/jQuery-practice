const DOMNodeCollection = require('./dom_node_collection.js');

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
