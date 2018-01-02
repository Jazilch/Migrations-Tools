'use strict';
require('dotenv').config({ path: 'variables.env' });
const axios = require('axios');

const singlePost = 'https://api.hubapi.com/content/api/v2/blog-posts/5411148913?access_token=' + process.env.ACCESS_TOKEN;
const allPosts =   'https://api.hubapi.com/content/api/v2/blog-posts?access_token=' + process.env.ACCESS_TOKEN;
const putURL = 'https://api.hubapi.com/content/api/v2/blog-posts/5411148913?access_token=' + process.env.ACCESS_TOKEN;

var fieldName = "et_pb";
var regExp = new RegExp("\\[\/?(" + fieldName + ".*?)\\]", "g");



  axios.get('https://api.hubapi.com/content/api/v2/blog-posts?content_group_id=5411147786&access_token=03f89542-ffd4-4450-ab69-348e813df24d', {
        transformResponse: axios.defaults.transformResponse.concat(function(data, headers) {
            // use data I passed into the function and the objects from the API
            // pass in data into the function using forEach this will return an array
            data.objects.forEach(function(i) {
                // use the returned array on Objects.key to find the name of the array
                Object.keys(i).forEach(function(k) {
                    // if the key equals execute code
                    // console.log(k);
                    if (k === "post_body") {
                        // fire Regex
                        data[k] = i[k].replace(regExp, '');
                        console.log(data[k])
                    }
                })
            })
            return data;
        })
    })
    .then(function(res) {
        // console.log(res.data.post_body);
        res.data.forEach(function(post) {
            console.log(post)
        });
        // axios({
        //     method: 'put',
        //     url: putURL,
        //     header: {
        //         "Content-Type": "application/json"
        //     },
        //     data: { "post_body":res.data.post_body }
        // })
        // if ( res.status == 200 || res.status == 201) {
        //     console.log("Post Body successfully updated!");
        // }
    })

