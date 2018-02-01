'use strict';
require('dotenv').config({ path: 'variables.env' });
const axios = require('axios');
const cliUtils = require('./cliutils');

cliUtils.showFiglet();
cliUtils.getUserPreferences(function(answers) {
    let parentBlogID = answers.parentBlogID;
    let fieldName = answers.fieldName;
    console.log(parentBlogID);
    console.log(fieldName);

    let endpointSingleBlogPost = `https://api.hubapi.com/content/api/v2/blog-posts/:blog_post_id?access_token=` + process.env.ACCESS_TOKEN;
    console.log(endpointSingleBlogPost);
    let endpointAllBlogPosts =   `https://api.hubapi.com/content/api/v2/blog-posts?content_group_id=${parentBlogID}&access_token=` + process.env.ACCESS_TOKEN;
    console.log(endpointAllBlogPosts);

    let regExp = new RegExp("\\[\/?(" + fieldName + ".*?)\\]", "g");

    axios.get(endpointAllBlogPosts)
        .then(function(response) {

            let blogPostIndex = (-1);
            let contents = response.data.objects;

            function blogPostLoop() {
                setTimeout(function () {
                    blogPostIndex++;
                    console.log('blogPostIndex: ' + blogPostIndex + ' of ' + contents.length);

                    if(blogPostIndex < contents.length) {
                    // if(blogPostIndex < 3) {

                        if( (contents[blogPostIndex].parent_blog) && (contents[blogPostIndex].parent_blog.id == parentBlogID)) {

                            // console.log('\n');
                            // console.log("yep, this is the right blog.");

                            // let's do stuff

                            let postID = contents[blogPostIndex].id;
                            let postBody = contents[blogPostIndex].post_body;
                            let postBodyFixed = contents[blogPostIndex].post_body.replace(regExp, '');
                            let endpointSingleBlogPostThis = endpointSingleBlogPost.replace(':blog_post_id', postID);

                            console.log('postID: ', postID);
                            // console.log('postBody: ', postBody);
                            // console.log('postBodyFixed: ', postBodyFixed);
                            // console.log('endpointSingleBlogPostThis: ', endpointSingleBlogPostThis);

                            if(postBody != postBodyFixed) {

                                // console.log('post body to PUT: ', postBodyFixed);
                                // console.log(typeof postBodyFixed);

                                axios.put(endpointSingleBlogPostThis, {
                                    "post_body": postBodyFixed
                                }).then(function(response) {
                                    // console.log(response);
                                    console.log('***************************************');
                                    console.log("response.status: ", response.status);
                                    console.log("response.statusText: ", response.statusText);
                                    console.log('***************************************');
                                }).catch(function(error) {
                                    console.log(error);
                                });

                            }
                            console.log('\n');
                        }

                        blogPostLoop();
                    }
                }, 500);
            }
            blogPostLoop();
        });
    });
