var FacebookStrategy = require('passport-facebook').Strategy;
var session			  = require('express-session');
var MongoStroe    = require('connect-mongo')(session);
var mongoose      = require('mongoose');
module.exports = function(app, passport){

  router.use(passport.initialize());
  router.use(passport.session());
  router.use(session({
    secret: 'mysupersecret',
    resave: false,
    saveUninitialized: false,
    store: new MongoStroe({ mongooseConnection: mongoose.connection}),
    cookie: { maxAge: 18000 * 6000 * 100000}
  }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(new FacebookStrategy({
      clientID: '147826179171551',
      clientSecret: '3792d86d19bd1f100ffebb6923e626ba',
      callbackURL: "http://localhost:3000/auth/facebook/callback",
      profileFields: ['id', 'displayName', 'photos', 'email']
    },
    function(accessToken, refreshToken, profile, done) {
      console.log(profile);
      /*User.findOrCreate(..., function(err, user) {
        if (err) { return done(err); }
        done(null, user);
      });*/

      done(null, profile);
    }
  ));

  return passport;
}
