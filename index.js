// require libraries
var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

// checks for page request / 
app.get("/", function(req, res){
	//delivers search.ejs page
    res.render("search");
});

// checks for page request /results 
app.get("/results", function(req, res){

	//takes search query 
    var searchTerm = req.query.search;

    //places search query into api url 
    var url = "http://omdbapi.com/?s=" + searchTerm + "&apikey=thewdb"

    //requests api url
    request(url, function(error, response, body){

    	//checks for errors 
        if(!error && response.statusCode == 200) {

        	//parses body into JSON returned by api request 
            var parsedData = JSON.parse(body);

            //delivers results.ejs page and passes api requested JSON
            res.render("results", {data: parsedData});
        }
    });
});

//turns on server listening
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("movie app has started");
});