// Add Event Listener for when a user clicks on a tab
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.query({
        active: true,               // Select active tabs
        lastFocusedWindow: true     // In the current window
    }, function(array_of_Tabs) {
        // Since there can only be one active tab in one active window, 
        var tab = array_of_Tabs[0]; // Current active tab will have an index of 0. We save this tab as a variable
        var url = tab.url; // We can then access the URL of this tab and save this as a variable too
        var debugCheck = "hsDebug=True" 
        var queryCheck = "?";
        // checl to see if a query string exists, and if hsDebug=True is in it
        if (url.indexOf(debugCheck) != -1){
                var firstQueryParam = "?hsDebug=True&"
                var sequenQueryParam = "&hsDebug=True"
                    if    (url.indexOf(firstQueryParam) != -1) {
                        // if hsDebug=True is the first of multiple query parameters
                        var runUrl = url.replace('?hsDebug=True&','?');
                    }
                      else if (url.indexOf(sequenQueryParam) != -1) {
                          // if hsDebug=True is not the first query parameter
                         var runUrl = url.replace('&hsDebug=True','');
                     } else {
                         // if hsDebug=True is the only query parameter
                         var runUrl = url.replace('?hsDebug=True','');
                     }
        }
        else if (url.indexOf(queryCheck) != -1){
            var runUrl = url + "&hsDebug=True";
        } else {
            var runUrl = url + "?hsDebug=True";
        }

        chrome.tabs.update({url: runUrl}); // Finally update our active tab URL to the above variable
    });
});