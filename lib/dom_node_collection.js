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
