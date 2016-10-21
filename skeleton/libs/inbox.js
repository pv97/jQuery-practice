let MessageStore = require('./message_store.js')

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
