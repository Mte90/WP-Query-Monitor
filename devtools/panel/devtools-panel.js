jQuery(function ($) {
  var port = browser.runtime.connect({name: "wpquery"});

  port.onMessage.addListener(function (request, sender) {
	if (request.type === "qm-div" && request.message !== '') {
	  document.querySelector('#qm').innerHTML = request.message;
	  loadQM();
	}
	/*if (request.type === "qm-js" && request.message !== '') {
	  var body = document.querySelector('body').innerHTML;
	  document.querySelector('body').innerHTML = body + request.message;
	}*/
  });

  function loadagain() {
	port.postMessage({
	  tabId: browser.devtools.inspectedWindow.tabId,
	  type: "qm-div-load"
	});
  }
  loadagain();
});