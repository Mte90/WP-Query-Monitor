jQuery(function ($) {
  // Get the QM var inside the dev tools
  function retrieveWindowVariables() {
	browser.devtools.inspectedWindow.eval("document.querySelector('body').getAttribute('tmp_0')").then(function (qm_vars) {
	  window.qm = JSON.parse(qm_vars[0]);
	});
	browser.devtools.inspectedWindow.eval("document.querySelector('body').getAttribute('tmp_1')").then(function (qm_vars) {
	  window.qm_locale = JSON.parse(qm_vars[0]);
	  loadQM();
	});
  }
  // Inject the HTML in the panel
  var port = browser.runtime.connect({name: "wpquery"});
  port.onMessage.addListener(function (request, sender) {
	if (request.type === "qm-div" && request.html !== '') {
	  document.querySelector('#qm').innerHTML = DOMPurify.sanitize(request.html, {ADD_ATTR: ['row']});;
	  retrieveWindowVariables();
	}
  });
  // Ask again to stuff
  function loadagain() {
	port.postMessage({
	  tabId: browser.devtools.inspectedWindow.tabId,
	  type: "qm-div-load"
	});
  }
  loadagain();
  // In case of refresh load again
  browser.devtools.network.onNavigated.addListener(function () {
	loadagain();
  });
});