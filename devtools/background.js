browser.runtime.onConnect.addListener(function (port) {
  // Wait from communication from the panel
  port.onMessage.addListener(function (request, sender) {
	if (request.type === "qm-div-load") {
	  // Get the html panel
	  browser.tabs.executeScript(request.tabId, {"code": "document.querySelector(\"#query-monitor\").outerHTML;"}, function (qm) {
		if (typeof qm !== "undefined") {
			// Pass the output of the QM html to panel
			port.postMessage({
			  type: "qm-div",
			  html: qm[0]
			});
		}
	  });
	}
  });
});
