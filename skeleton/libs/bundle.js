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

	const Router = __webpack_require__(1);
	const Inbox = __webpack_require__(2);
	const Sent = __webpack_require__(4)
	const Compose = __webpack_require__(5)

	document.addEventListener("DOMContentLoaded", function(event) {
	  let selection = document.querySelectorAll("ul.sidebar-nav li")
	  for (var i = 0; i < selection.length; i++) {
	    selection[i].addEventListener("click", (e) => {
	      window.location.hash = e.currentTarget.innerText.toLowerCase()
	    })
	  }

	  let content = document.querySelectorAll(".content")[0]
	  let route = new Router(content, routes)
	  route.start();

	})

	const routes = {
	  inbox: Inbox,
	  sent: Sent,
	  compose: Compose
	}


/***/ },
/* 1 */
/***/ function(module, exports) {

	function Router(node, routes) {
	  this.node = node;
	  this.routes = routes;
	}

	Router.prototype.start = function () {
	  window.addEventListener("hashchange",() => this.render() )
	  this.render()
	};

	Router.prototype.render = function () {
	  this.node.innerHTML = ""
	  let component = this.activeRoute()
	  if (component) {
	    let node = component.render();
	    // let p = document.createElement("p")
	    // p.innerHTML = currentRoute;
	    this.node.appendChild(node)
	  }
	};


	Router.prototype.activeRoute = function () {
	  let frag = window.location.hash
	  return this.routes[frag.slice(1)]
	};

	module.exports = Router;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	let MessageStore = __webpack_require__(3)

	let Inbox = {
	  render: () => {
	    let ul = document.createElement("ul")
	    ul.className = "messages";
	    ul.innerHTML = "<h1>inbox</h1>"
	    let inbox = MessageStore.getInboxMessages()
	    for (var i = 0; i < inbox.length; i++) {
	      // ul.append(MessageStore.Inbox[i])
	      let DOMMessage = Inbox.renderMessage(inbox[i])
	      ul.appendChild(DOMMessage)
	    }

	    return ul
	  },
	  renderMessage: (message) => {
	    let li = document.createElement("li")
	    li.className = "message"
	    li.innerHTML += `<span class="from">${message.from}</span>`
	    li.innerHTML += `<span class="subject">${message.subject}</span>`
	    li.innerHTML += `<span class="body">${message.body}</span>`
	    return li
	  }
	}





	module.exports = Inbox;


/***/ },
/* 3 */
/***/ function(module, exports) {

	let messages = {
	  sent: [
	    {to: "friend@mail.com", subject: "Check this out", body: "It's so cool"},
	    {to: "person@mail.com", subject: "zzz", body: "so booring"}
	  ],
	  inbox: [
	    {from: "grandma@mail.com", subject: "Fwd: Fwd: Fwd: Check this out", body:
	"Stay at home mom discovers cure for leg cramps. Doctors hate her"},
	  {from: "person@mail.com", subject: "Questionnaire", body: "Take this free quiz win $1000 dollars"}
	]
	};

	let MessageStore = {
	  getInboxMessages: ()=>{ return messages.inbox },
	  getSentMessages: ()=>{ return messages.sent },
	  getMessageDraft: ()=> { return messageDraft },
	  updateDraftField: (field, value) => { messageDraft[field] = value },
	  sendDraft: () => {
	    messages.sent.push(messageDraft)
	    messageDraft = new Message();
	   }
	}

	function Message(from="", to="", subject="", body="") {
	  this.from = from
	  this.to = to
	  this.subject = subject
	  this.body = body
	}

	let messageDraft = new Message()


	module.exports = MessageStore


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	let MessageStore = __webpack_require__(3)

	let Sent = {
	  render: () => {
	    let ul = document.createElement("ul")
	    ul.className = "messages";
	    ul.innerHTML = "<h1>Sent</h1>"
	    let sent = MessageStore.getSentMessages()
	    for (var i = 0; i < sent.length; i++) {
	      // ul.append(MessageStore.Sent[i])
	      let DOMMessage = Sent.renderMessage(sent[i])
	      ul.appendChild(DOMMessage)
	    }

	    return ul
	  },
	  renderMessage: (message) => {
	    let li = document.createElement("li")
	    li.className = "message"
	    li.innerHTML += `<span class="to">${message.to}</span>`
	    li.innerHTML += `<span class="subject">${message.subject}</span>`
	    li.innerHTML += `<span class="body">${message.body}</span>`
	    return li
	  }
	}





	module.exports = Sent;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const MessageStore = __webpack_require__(3);

	const Compose = {
	  render: function() {
	    let div = document.createElement("div")
	    div.className = "new-message"
	    div.innerHTML = Compose.renderForm()
	    div.addEventListener("change",(e)=>{
	      let target = e.target
	      let name = target.name
	      let value = target.value
	      MessageStore.updateDraftField(name,value)
	    })

	    div.addEventListener("submit",(e)=>{
	      e.preventDefault()
	      MessageStore.sendDraft()
	      window.location.hash = "inbox"
	    })
	    return div
	  },
	  renderForm: function() {
	    let draft = MessageStore.getMessageDraft()
	    let str = `<p class="new-message-header">New Message</p>`
	    str += `<form class="compose-form"><input placeholder="Recipient" name="to" type="text" value="${draft.to}"
	    ><input placeholder="Subject" name="subject" type="text" value="${draft.subject}"
	    ><textarea name="body" rows=20>${draft.body}</textarea
	    ><button type="submit" class="btn btn-primary submit-message">Send</button></form>`

	    return str
	  }
	}

	module.exports = Compose;


/***/ }
/******/ ]);