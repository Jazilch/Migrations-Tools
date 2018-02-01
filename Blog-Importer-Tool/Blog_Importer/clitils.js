'use strict';
const inquirer = require('inquirer');
const figlet = require('figlet');
const chalk = require('chalk');

var cliUtils = {
	showFiglet: function() {
    console.log(
    	chalk.green(
    		figlet.textSync('Blog Importer!', { font: 'doom' })
    	)
    );
  },
	getUserPreferences: function(callback) {
		let questions = [
			{
				type: 'input',
				name: 'parentBlogID',
				message: 'Enter the Parent Blog ID (No Need to use Double Quotes here)'
			},
			{
				type: 'list',
				name: 'fieldName',
				message: 'Choose the Field Name that you would like to remove.',
				choices: [
					"sc",
					"vc",
					"fc"
				]
			}
			];
		inquirer.prompt(questions).then(callback);
	},
};

module.exports = cliUtils;
