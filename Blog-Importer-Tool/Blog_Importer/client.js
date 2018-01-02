const http = require('https');
const fs = require('fs');

const outputJSON = fs.readFileSync('outputJSONstart.json');
outputJson = JSON.parse(outputJSON);



(function removeWordPressField(fieldName, outputJson) {
	 //turn it into a string
	var postSummaryString = JSON.stringify(outputJson);

	// create new RegEx, with our argument in the expression
	var regExp = new RegExp("\\[(" + fieldName + ".*?)\\]", "g");

	// return the replaced post body content
    return postSummaryString.replace(regExp, "");
    console.log(removeWordPressFields("et_pb", outputJson));
})();


