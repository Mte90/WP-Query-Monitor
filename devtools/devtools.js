/**
 Create a panel, and add listeners for panel show/hide events.
 */
if (typeof browser === "undefined") {
    var contentscript = chrome;
} else {
    var contentscript = browser;
}
contentscript.devtools.panels.create(
		"WP Query Monitor",
		"icon.png",
		"/devtools/panel/panel.html"
);
