const Router = require('./router.js');
const Inbox = require('./inbox.js');
const Sent = require('./sent.js')
const Compose = require('./compose.js')

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
