<h1>Blog Importer Tool</h1>

![Blog Importer Tool Gif](https://cdn2.hubspot.net/hubfs/2676636/Tooltip/source.gif)


When customers come into HubSpot and import their blog posts a lot of the time WordPress markup ends up coming into HubSpot also as our Blog Importer doesn't clean up this markup. This tool is created to hit our Blog Post endpoint get the response in the form of the Post Body. Once we have the post body we can transform the response using a RegEx and then make a post request to publish the cleaned data back into the Post Body of the Response. 

We use Node.js and Axios in order to make requests to the HubSpot Blog API. 

You can read the full documentation here on making requests in Axios. 

https://www.npmjs.com/package/axios

We created two different files. The first is the Tool for a single Blog Post under the `singlePost.js` and making a request to all of the Blog Posts in the `multiplePost.js`. 

You will need to change the variable called fieldName for the String you're trying to match from the WordPress markup. 

In order to complete this we use optional paramter called Transform Response. This is an option paramters that you can add to the HTTP Call and after we make a GET request to the API we can change the structure of the returning data before the promise is resolved and we make a PUT Request for the modified data. 

<h2>Command Line Arguments</h2>
When using the singlePost.js you can now add a command line argument for the Post ID directly into the Command Line. Before you would have had to modify the Node.js file and add in your Post ID from the Post you want to update. With this new addition the only thing you will need to do is type the following into the command line. 

`node singlePost.js -p "Blog_Post_Id"`

We are calling the Node file with node and then we use the -p to tell the Node file we are going to expect an argument of the Post ID taken as a string. 

The file will then take in this argument and run your request as it did before. 
