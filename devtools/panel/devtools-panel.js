jQuery(function ($) {
  // Inject the HTML in the panel
  var port = browser.runtime.connect({name: "wpquery"});
  port.onMessage.addListener(function (request, sender) {
	if (request.type === "qm-div" && request.html !== '') {
	  document.querySelector('#qm').innerHTML = DOMPurify.sanitize(request.html, {ADD_ATTR: ['row']});
	  document.querySelector('.qm-js').id = 'query-monitor';
	  document.querySelector('.qm-js').style = '';
	  document.querySelector('.qm-js').className = ' qm-show';
	  qm_load();
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