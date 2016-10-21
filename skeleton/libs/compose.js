const MessageStore = require('./message_store.js');

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
