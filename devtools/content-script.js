function saveWindowVariables() {
  var ret = {};
  var variables = [window.qm, window.qm_l10n, window.qm_locale];
  for (var i = 0; i < variables.length; i++) {
	var currVariable = variables[i];

	if (typeof currVariable !== 'undefined') {
	  document.querySelector('body').setAttribute('tmp_' + i, JSON.stringify(currVariable));
	}
  }
}
saveWindowVariables();