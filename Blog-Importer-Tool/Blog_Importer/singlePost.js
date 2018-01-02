'use strict';
require('dotenv').config({ path: 'variables.env' });
const axios = require('axios');

const singlePost = 'https://api.hubapi.com/content/api/v2/blog-posts/5411148913?access_token=' + process.env.ACCESS_TOKEN;
const putURL = 'https://api.hubapi.com/content/api/v2/blog-posts/5411148913?access_token=' + process.env.ACCESS_TOKEN;

var fieldName = "et_pb";
var regExp = new RegExp("\\[\/?(" + fieldName + ".*?)\\]", "g");


    // ////////////////////
    axios.get(singlePost, {
        transformResponse: axios.defaults.transformResponse.concat(function(data, headers) {
            Object.keys(i).forEach(function(k) {
                if( k == "post_body" ) {
                    data[k] = i[k].replace(regExp, '');
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
