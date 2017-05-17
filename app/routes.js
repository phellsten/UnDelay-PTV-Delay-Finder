// app/routes.js
module.exports = function(app, passport) {
  app.set('view engine','ejs');

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function(req, res) {
    res.render("index",{
        pageId:'home',
        user : req.user,
        message: req.flash('successRegister')
    });
	});

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
	   res.render('index', {
       message: req.flash('loginMessage'),
       pageId:'login',
       user : req.user
     });
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('index', {
        message: req.flash('signupMessage'),
        pageId:'signup',
        user : req.user
    });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('index', {
      pageId: 'profile',
			user : req.user // get the user out of session and pass to template
		});
	});

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
        req.flash('successRegister', 'Successfully logged out. See you next time!')
		res.redirect('/');
	});

  app.get('/delay',function(req,res){
     res.render("index",{
         pageId:'delay',
         user : req.user
     });
  });
  app.get('/issues',function(req,res){
     res.render("index",{
         pageId:'issues',
         user : req.user
     });
  });

  app.get('/about',function(req,res){
     res.render("index",{
         pageId:'about',
         user : req.user
     });
  });
  var map = require('../map.js');
  app.use('/map', map);

  app.post('/formsubmit', function(req, res) {

      var sanitize = require('mongo-sanitize');

      var route = sanitize(req.body.routelist);
      var description = sanitize(req.body.description);
      var selection = sanitize(req.body.sel1);
      var delaytype = sanitize(req.body.delaytype);
      var locationdata = sanitize(req.body.locationdata);



      var MongoClient = require('mongodb').MongoClient
          , format = require('util').format;

      MongoClient.connect('mongodb://127.0.0.1:27017/userdata', function(err, db) {
          if(err) throw err;

          var collection = db.collection('delays');
          collection.insert({
              'route' : route,
              'description' : description,
              'type' : selection,
              'delayType' : delaytype,
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
              res.render("index",{
                  pageId:'delay2',
                  user: req.user
              });
              db.close();
          });
      });
  });
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
