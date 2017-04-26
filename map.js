var express = require('express');
var router = express.Router();


router.get('/',function(req,res){
   res.render("index",{
       pageId:'map'
   });
});

module.exports = router;