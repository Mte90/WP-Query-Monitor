jQuery(function ($) {
  var port = browser.runtime.connect({name: "wpquery"});
  port.onMessage.addListener(function (request, sender) {
	if (request.type === "qm-div" && request.html !== '') {
	  document.querySelector('#qm').innerHTML = request.html;
	  retrieveWindowVariables();
	}
  });
  function loadagain() {
	port.postMessage({
	  tabId: browser.devtools.inspectedWindow.tabId,
	  type: "qm-div-load"
	});
  }
  loadagain();

  function retrieveWindowVariables() {
	browser.devtools.inspectedWindow.eval("document.querySelector('body').getAttribute('tmp_0')").then(function (qm_vars) {
	  window.qm = JSON.parse(qm_vars[0]);
	  console.log(window.qm)
	});
	browser.devtools.inspectedWindow.eval("document.querySelector('body').getAttribute('tmp_1')").then(function (qm_vars) {
	  window.qm_locale = JSON.parse(qm_vars[0]);
	  loadQM();
	});
  }
});