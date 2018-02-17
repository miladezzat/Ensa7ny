var passport 				= 	require('passport');
var User					=	require('../models/user');
var LocalStrategy 			= require('passport-local').Strategy;
var FacebookStrategy 		= require('passport-facebook').Strategy;

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done){
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

passport.use('local.signup', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
}, function(req, email, password, done) {

	req.checkBody('fullname','The fullname name field can not emapty.').notEmpty();
	req.checkBody('gender','The Gender field can not emapty.').notEmpty();
	req.checkBody('email','The Email field can not emapty.').notEmpty();
	req.checkBody('email','The Email you entered is invalid, please try again.').isEmail();
	req.checkBody('email','Email address must be between 4-100 characters long, please try again.').len({min:4,max:100});


	req.checkBody('password','Password must be between 8-100 characters long, please try again.').len({min:4,max:100});

	var errors = req.validationErrors();
	if (errors) {
		var messages = [];
		errors.forEach(function(error){
			messages.push(error.msg);
		});
		return done(null, false, req.flash('error', messages));
	}
	User.findOne({'email': email}, function(err, user){
		if (err) {
			return done(err);
		}
		if (user) {
			if (user.email) {
				return done(null, false, {message: ' Email is already in use'})
			}
		}
		var newUser = new User();
		newUser.fullname = req.body.fullname;
		newUser.email = email;
		newUser.gender = req.body.gender;
		newUser.permation = "2";
		newUser.password = newUser.encryptPassword(password);
		newUser.save(function (err, result) {
			if (err) {
				return done(err);
			}
			return done(null, newUser);
		});
	});
}));

passport.use('local.signin', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
}, function(req, email, password, done) {
	req.checkBody('email','The Email field can not emapty.').notEmpty();
	req.checkBody('email','The Email you entered is invalid, please try again.').isEmail();
	req.checkBody('email','Email address must be between 4-100 characters long, please try again.').len({min:4,max:100});

	req.checkBody('password','Password must be between 8-100 characters long, please try again.').len({min:4,max:100});
	var errors = req.validationErrors();
	if (errors) {
		var messages = [];
		errors.forEach(function(error){
			messages.push(error.msg);
		});
		return done(null, false, req.flash('error', messages));
	}

	User.findOne({'email': email}, function(err, user){
		if (err) {
			return done(err);
		}
		if (!user) {
			return done(null, false, {message: ' User Not founded'})
		}
		if (!user.validPassword(password)) {
			return done(null, false, {message: ' Password Not Valid'})
		}
			return done(null, user);
		});
}));


passport.use('facebook',new FacebookStrategy({
    clientID: '147826179171551',
    clientSecret: '3792d86d19bd1f100ffebb6923e626ba',
    callbackURL: "https://ensa7ny.herokuapp.com/auth/facebook/callback",
		profileFields: ['id', 'displayName', 'photos', 'email','gender']
  },
  function(accessToken, refreshToken, profile, done) {

		User.findOne({email:profile.emails[0].value}, function(err, results) {
			if (err) {
				return res.write('Error!');
			}
			if (results && results != null ) {
				done(null, results)
			} else{
				console.log("Done");
				var newUser = new User();
				newUser.fullname 	= profile.displayName;
				newUser.email    	= profile.emails[0].value;
				if (profile.gender == "male") {
					newUser.gender   	= '1';
				} else {
					newUser.gender   	= "2";
				}
				newUser.image    	= profile.photos[0].value;
				newUser.permation = '2';
				newUser.save(function (err, result) {
					if (err) {
						return done(err);
					}
					return done(null, newUser);
				});
			}
		});
  }
));
