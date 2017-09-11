var port = chrome.runtime.connect({name: "wpquery"});
port.onMessage.addListener(function (request, sender) {
  if (request.type === "qm-div" && request.message !== '') {
	document.querySelector('#qm').innerHTML = request.message;
  }
});

function loadagain() {
  port.postMessage({
	tabId: browser.devtools.inspectedWindow.tabId,
	type: "qm-div-load"
  });
}
loadagain();
