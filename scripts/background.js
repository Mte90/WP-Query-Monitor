// Chrome automatically creates a background.html page for this to execute.
// This can access the inspected page via executeScript
// 
// Can use:
// browser.tabs.*
// browser.extension.*

browser.extension.onConnect.addListener(function (port) {

    var extensionListener = function (message, sender, sendResponse) {

        if(message.tabId && message.content) {

                //Evaluate script in inspectedPage
                if(message.action === 'code') {
                    browser.tabs.executeScript(message.tabId, {code: message.content});

                //Attach script to inspectedPage
                } else if(message.action === 'script') {
                    browser.tabs.executeScript(message.tabId, {file: message.content});

                //Pass message to inspectedPage
                } else {
                    browser.tabs.sendMessage(message.tabId, message, sendResponse);
                }

        // This accepts messages from the inspectedPage and 
        // sends them to the panel
        } else {
            port.postMessage(message);
        }
        sendResponse(message);
    }

    // Listens to messages sent from the panel
    browser.extension.onMessage.addListener(extensionListener);

    port.onDisconnect.addListener(function(port) {
        browser.extension.onMessage.removeListener(extensionListener);
    });

    // port.onMessage.addListener(function (message) {
    //     port.postMessage(message);
    // });

});
browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    return true;
});