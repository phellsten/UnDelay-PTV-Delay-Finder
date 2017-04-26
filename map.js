var fs = require('fs');
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var gtfsdb = mongoose.createConnection('mongodb://localhost:27017/gtfs');
var delaydb = mongoose.createConnection('mongodb://localhost:27017/testdb');

var routeSchema = mongoose.Schema({
	route_id: String,
	agency_id: String,
	route_short_name: String,
	route_long_name: String,
	route_type: Number,
	agency_key: String
});

var Route = gtfsdb.model("Route", routeSchema);


router.get('/',function(req,res){
   res.render("index",{
       pageId:'map'
   });
});

router.get('/gtfs/routes',function(req,res){
	Route.find(function(err,response){
		res.json(response);
	});
});

router.get('/gtfs/geojson',function(req,res){
	files = {};
	fs.readdir('geojson/', function(err, items) {
		for (var i=0; i<items.length; i++) {
			files[i] = [];
			fs.readdir('geojson/'+items[i]+'/', function(err, items2) {
				for (var j=0; j<items2.length; j++) {
					files[i].append((j,items2));
				}
			});
		}
	});
	res.json(files);
});

router.get('/gtfs/geojson/:agency([0-2])',function(req,res){
	agency = req.params.agency;
	fs.readdir('geojson/', function(err, items) {
		res.json(items[agency]);
	});
});

router.get('/gtfs/geojson/:agency([0-2])/:route([0-9]{1,2})',function(req,res){
	agency = req.params.agency;
	route = req.params.route;
	fs.readdir('geojson/', function(err, items) {
		fs.readdir('geojson/'+items[agency]+'/', function(err, items2) {
			res.json(items2[route]);
		});
	});
});

module.exports = router;
