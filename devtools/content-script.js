browser.runtime.onConnect.addListener(function (port) {
  port.postMessage({
	type: "qm-js",
	message: {l10n:qm_l10n,locale:qm_locale,qm:qm}
  });
});