let MessageStore = require('./message_store.js')

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
