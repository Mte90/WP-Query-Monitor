browser.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(function (request, sender) {
	if (request.type === "qm-div-load") {
	  browser.tabs.executeScript(request.tabId, {"code": "document.querySelector(\"#qm\").outerHTML;"}, function (qm) {
		if (typeof qm !== "undefined") {
		  var url = browser.extension.getURL('devtools/content-script.js');
		  browser.tabs.executeScript(request.tabId, {"code": "t = document.querySelector(\"script:last-child\");var s = document.createElement(\"script\");s.type = \"text/javascript\";s.src = '" + url + "';t.parentNode.insertBefore(s, t);"}, function () {
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
