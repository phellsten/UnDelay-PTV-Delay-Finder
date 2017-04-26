var express = require('express');
var app = express();
var path = require('path');

app.use(express.static('public'));
app.set('view engine','ejs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());








app.post('/formsubmit', function(req, res) {

    var location = req.body.location;
    var description = req.body.description;
    var selection = req.body.sel1;
    var delaytype = req.body.delaytype;
    var locationdata = req.body.locationdata;



    var MongoClient = require('mongodb').MongoClient
        , format = require('util').format;

    MongoClient.connect('mongodb://127.0.0.1:27017/userdata', function(err, db) {
        if(err) throw err;

        var collection = db.collection('userdata');
        collection.insert({
            'location' : location,
            'description' : description,
            'type' : selection,
            'DelayType' : delaytype,
            'locationData' : locationdata,
        }, function(err, docs) {
            collection.count(function(err, count) {
                console.log(format("count = %s", count));
            });
        });

        // Locate all the entries using find
        collection.find().toArray(function(err, results) {
            console.dir(results);
            // Let's close the db
            res.send(results);
            db.close();
        });
    });









});

// Create route for the root
app.get('/',function(req,res){
   res.render("index",{
       pageId:'home'
   });
});

app.get('/about',function(req,res){
   res.render("index",{
       pageId:'about'
   });
});

app.get('/issues',function(req,res){
   res.render("index",{
       pageId:'issues'
   });
});

app.get('/map',function(req,res){
   res.render("index",{
       pageId:'map'
   });
});

app.get('/login',function(req,res){
   res.render("index",{
       pageId:'login'
   });
});

app.get('/signup',function(req,res){
   res.render("index",{
       pageId:'signup'
   });
});

app.get('/delay',function(req,res){
   res.render("index",{
       pageId:'delay'
   });
});

app.listen(3000,function(req,res){
    console.log('Listening at port 3000');
})



