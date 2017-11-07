browser.runtime.onConnect.addListener(function (port) {
  // Wait from communication from the panel
  port.onMessage.addListener(function (request, sender) {
	if (request.type === "qm-div-load") {
	  // Get the html panel
	  browser.tabs.executeScript(request.tabId, {"code": "document.querySelector(\"#qm\").outerHTML;"}, function (qm) {
		if (typeof qm !== "undefined") {
		  // Inject a script inside the page sandbox
		  var url = browser.extension.getURL('devtools/content-script.js');
		  browser.tabs.executeScript(request.tabId, {"code": "t = document.querySelectorAll(\"script\");t = t[t.length-1];var s = document.createElement(\"script\");s.type = \"text/javascript\";s.src = '" + url + "';t.parentNode.insertBefore(s, t);"}, function () {
			// Pass the output of the QM html to panel
			port.postMessage({
			  type: "qm-div",
			  html: qm[0]
			});
		  });
		}
	  });
	}
  });
});
