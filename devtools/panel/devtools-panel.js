jQuery(function ($) {
  var port = browser.runtime.connect({name: "wpquery"});

  port.onMessage.addListener(function (request, sender) {
	if (request.type === "qm-div" && request.html !== '') {
	  document.querySelector('#qm').innerHTML = request.message;
	  console.log(request.vars)
	  loadQM();
	}
//	if (request.type === "qm-js" && request.var !== '') {
//	  console.log(request.var)
////	  var body = document.querySelector('body').innerHTML;
////	  document.querySelector('body').innerHTML = body + request.message;
//	}

  });

  function loadagain() {
	port.postMessage({
	  tabId: browser.devtools.inspectedWindow.tabId,
	  type: "qm-div-load"
	});
  }
  loadagain();
});