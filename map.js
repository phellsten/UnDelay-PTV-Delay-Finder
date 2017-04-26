var fs = require('fs');
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var gtfsdb = mongoose.createConnection('mongodb://localhost:27017/gtfs');
var delaydb = mongoose.createConnection('mongodb://localhost:27017/userdata');

var routeSchema = mongoose.Schema({
	route_id: String,
	agency_id: String,
	route_short_name: String,
	route_long_name: String,
	route_type: Number,
	agency_key: String
});

var Route = gtfsdb.model("Route", routeSchema);

var delaySchema = mongoose.Schema({
	location: String,
	description: String,
	type: String,
	DelayType: String,
	locationData: String
});

var Delay = delaydb.model("Delay", delaySchema);


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

router.get('/delays',function(req,res){
	Delay.find(function(err,response){
		res.json(response);
	});
});

router.get('/route_names/:agency([0-2])',function(req,res){
	agency = req.params.agency;
	agency_name = '';
	if (agency == 0) { agency_name = 'PTV-MetroBus'; }
	else if (agency == 1) { agency_name = 'PTV-MetroTrain'; }
	else if (agency == 2) { agency_name = 'PTV-MetroTram'; }
	Route.find({agency_key: agency_name}).distinct('route_short_name', function(error,ids) {
		// res.json(ids.reverse());
		res.contentType('json');
		res.send(JSON.stringify(ids.reverse()));
	});
});

router.get('/gtfs/geojson',function(req,res){
	// files = [];
	// fs.readdir('geojson/', function(err, items) {
		// for (var i=0; i<items.length; i++) {
			// geojsons = [];
			// fs.readdir('geojson/'+items[i]+'/', function(err, items2) {
				// for (var j=0; j<items2.length; j++) {
					// geojsons.push((j,items2[j]));
					// res.json(items2[j]);
				// }
			// });
			// console.log("a"+items[i]);
			// files.push(geojsons);
		// }
	// });
	// console.log("Files "+files);
	files = [];
	fs.readdir('geojson/', (err, files) => {
		files.forEach(file => {
			files.push(file);
		});
	})
	console.log(files);
});

router.get('/gtfs/geojson/:agency([0-2])',function(req,res){
	agency = req.params.agency;
	fs.readdir('geojson/', function(err, items) {
		res.json(items[agency]);
	});
});

router.get('/gtfs/geojson/:agency([0-2])/:route([0-9]{1,3})',function(req,res){
	agency = parseInt(req.params.agency);
	route = parseInt(req.params.route);
	console.log('Geojson get '+agency+route);
	// fs.readdir('geojson/', function(err, items) {
		// fs.readdir('geojson/'+items[agency]+'/', function(err, items2) {
			// res.json(items2[route]);
		// });
	// });
	if (agency == 0) {
		fs.readdir('geojson/PTV-MetroBus', (err, files) => {
			if (err) throw err
			fs.readFile('geojson/PTV-MetroBus/'+files[route], 'utf-8', function(err,data) {
				if (err) throw err;
				console.log(data);
				res.contentType('json');
				res.send(JSON.stringify(data));
			});
		});
	} else if (agency == 1) {
		fs.readdir('geojson/PTV-MetroTrain', (err, files) => {
			if (err) throw err
			fs.readFile('geojson/PTV-MetroTrain/'+files[route], 'utf-8', function(err,data) {
				if (err) throw err;
				res.contentType('json');
				res.send(JSON.stringify(data));
			});
		});
	} else if (agency == 2) {
		fs.readdir('geojson/PTV-MetroTram', (err, files) => {
			if (err) throw err
			fs.readFile('geojson/PTV-MetroTram/'+files[route], 'utf-8', function(err,data) {
				if (err) throw err;
				res.contentType('json');
				res.send(JSON.stringify(data));
			});
		});
	}
});

module.exports = router;
