browser.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(function (request, sender) {
	if (request.type === "qm-div-load") {
	  browser.tabs.executeScript(request.tabId, {"code": "document.querySelector(\"#qm\").outerHTML;"}, function (qm) {
		if (typeof qm !== "undefined") {
		  port.postMessage({
			type: "qm-div",
			message: qm[0]
		  });
		  browser.tabs.executeScript(request.tabId, {"code": "document.querySelectorAll(\"script:last-child\")[0].outerHTML"}, function (qm) {
			port.postMessage({
			  type: "qm-js",
			  message: qm[0]
			});
		  });
		}
	  });
	}
  });
});