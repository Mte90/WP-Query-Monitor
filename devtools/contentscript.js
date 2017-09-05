browser.runtime.sendMessage({
  type: "qm-div",
  message: document.querySelector("#qm").innerHTML
});