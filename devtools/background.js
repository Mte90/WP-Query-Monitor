browser.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(function (request, sender) {
	if (request.type === "qm-div-load") {
	  browser.tabs.executeScript(request.tabId, {"code": "document.querySelector(\"#qm\").outerHTML;"}, function (qm) {
		if (typeof qm !== "undefined") {
		  var url = browser.extension.getURL('devtools/content-script.js');
		  browser.tabs.executeScript(request.tabId, {"code": "t = document.querySelector(\"script:last-child\");var s = document.createElement(\"script\");s.type = \"text/javascript\";s.src = '" + url + "';t.parentNode.insertBefore(s, t);"});
		  var vars = retrieveWindowVariables(request);
		  port.postMessage({
			type: "qm-div",
			html: qm[0],
			vars: vars
		  });
		}
	  });
	}
  });
});

function retrieveWindowVariables(request) {
  var ret = {};
  var variables = [window.qm, window.qm_l10n, window.qm_locale];

  for (var i = 0; i < variables.length; i++) {
	var currVariable = variables[i];
	browser.tabs.executeScript(request.tabId, {"code": "document.querySelector('body').getAttribute('tmp_" + i + "')"}, function (qm_vars) {
	  ret[currVariable] = qm_vars;
	});
//	$("body").removeAttr("tmp_" + currVariable);
  }

  return ret;
}