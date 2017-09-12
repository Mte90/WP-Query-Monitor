browser.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(function (request, sender) {
	if (request.type === "qm-div-load") {
	  browser.tabs.executeScript(request.tabId, {"code": "document.querySelector(\"#qm\").outerHTML;"}, function (qm) {
		if (typeof qm !== "undefined") {
		  var url = browser.extension.getURL('devtools/content-script.js');
		  browser.tabs.executeScript(request.tabId, {"code": "t = document.querySelector(\"script:last-child\");var s = document.createElement(\"script\");s.type = \"text/javascript\";s.src = '" + url + "';t.parentNode.insertBefore(s, t);"}, function () {
			retrieveWindowVariables(request, port, qm[0]);
		  });
		}
	  });
	}
  });
});

function retrieveWindowVariables(request, port, qm) {
  var ret = {};
  var variables = [window.qm, window.qm_l10n, window.qm_locale];

  variables.forEach(function (item, i) {
	browser.tabs.executeScript(request.tabId, {"code": "document.querySelector('body').getAttribute('tmp_" + i + "')"}, function (qm_vars) {
	  ret[item] = qm_vars;
	});
//	$("body").removeAttr("tmp_" + currVariable);
  });
  console.log(ret);
  port.postMessage({
	type: "qm-div",
	html: qm,
	vars: ret
  });
}