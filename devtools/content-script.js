function saveWindowVariables() {
  var variables = [window.qm, window.qm_locale];
  for (var i = 0; i < variables.length; i++) {
	if (typeof variables[i] !== 'undefined') {
	  document.querySelector('body').setAttribute('tmp_' + i, JSON.stringify(variables[i]));
	}
  }
}
saveWindowVariables();