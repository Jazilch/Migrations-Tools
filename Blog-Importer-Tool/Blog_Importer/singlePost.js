'use strict';
require('dotenv').config({ path: 'variables.env' });
const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        p: {
            demand: true,
            alias: 'post_id',
            describe: 'Add a Blog Post ID',
            string: true
        }
})
    .help()
    .alias('help', 'h')
    .argv;

let encodedPostID = encodeURIComponent(argv.post_id);
const singlePost = `https://api.hubapi.com/content/api/v2/blog-posts/${encodedPostID}?access_token=` + process.env.ACCESS_TOKEN;
const putURL = `https://api.hubapi.com/content/api/v2/blog-posts/${encodedPostID}?access_token=` + process.env.ACCESS_TOKEN;

var fieldName = "et_pb";
var regExp = new RegExp("\\[\/?(" + fieldName + ".*?)\\]", "g");


    // ////////////////////
    axios.get(singlePost, {
        transformResponse: axios.defaults.transformResponse.concat(function(data, headers) {
            Object.keys(data).forEach(function(k) {
                if( k == "post_body" ) {
                    data[k] = data[k].replace(regExp, '');
                }
            })
            return data;
        })
    })
    .then(function(res) {
        axios({
        	method: 'put',
        	url: putURL,
        	header: {
        		"Content-Type": "application/json"
        	},
        	data: { "post_body": res.data.post_body }
        })
        if ( res.status == 200 || res.status == 201) {
        	console.log("Post Body successfully updated!");
        }
    })
    .catch(function(err) {
    	if (err.res) {
    		console.log(error.response.data);
      	console.log(error.response.status);
      	console.log(error.response.headers);
    	} else {
    		console.log('Error', error.message);
    	}
    })
