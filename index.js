var express = require('express');
var app = express();
var path = require('path');

app.use(express.static('public'));
app.set('view engine','ejs');

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



