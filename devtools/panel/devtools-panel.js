//browser.devtools.inspectedWindow.eval('document.querySelector("#qm").innerHTML').then(function(result) {
//  console.log(result)
//  document.querySelector('.qm-area').innerHTML = result.innerHTML;
//});

chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.type === "qm-div")
      document.querySelector('.qm-area').innerHTML = request.message;
});
