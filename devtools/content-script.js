window.postMessage({
  type: "qm-js",
  var: {l10n: qm_l10n, locale: qm_locale, qm: qm}
}, "*");