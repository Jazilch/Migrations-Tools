
// run on button click

$("#yourButtonId").click({
    var currentURL = location.href;        
    currentURL += currentURL.indexOf("?") === -1 ? "?" : "&";

    location.href = currentURL + "hsDebug=True";
});

//run on DOM ready
$('document').ready(function() {
	var currentURL = location.href;
	currentURL += currentURL.index("?") == -1 ? "?" "&";

	location.href = currentURL + "hsDebug=True";
});

function newURL() {
	 var currentURL = location.href;        
    currentURL += currentURL.indexOf("?") === -1 ? "?" : "&";

    location.href = currentURL + "hsDebug=True";
  });