var express               = require('express');
var router                = express.Router();
var Message               =	require('../models/messages.js');
var User                  =	require('../models/user.js');
var FeedBack              =	require('../models/feedback.js');
var passport		          = require('passport');


//router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/users/login' }));

router.get('/auth/facebook',
  passport.authenticate('facebook', { scope: 'email' })
);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Ensa7ny' });
});

router.get('/about', function(req, res, next) {
  res.render('user/about', { title: 'Ensa7ny' });
});

router.post('/about', function(req, res, next) {
  //console.log(req.body.msg);
  var newFeedback = new FeedBack();
  newFeedback.text = req.body.msg;
  newFeedback.email = req.body.email;
  newFeedback.save(function (err, result) {
    if (err) {
      return done(err);
    }
    res.redirect('/');
  });
});

//message
router.get('/message/:id', function(req, res, next) {
  //var username = req.user.fullname;

  User.findOne({_id: req.params.id}, function(err, user) {
    if (err) {
      return res.write('Error!');
    }

    var gender = false;
    if (user.gender == "1") {
      gender = true;
    }

    res.render('user/message', { title: 'Ensa7ny',id:req.params.id, username: user.fullname,gender: gender});
  });
});

router.post('/message/:id', function(req, res, next) {
  var newMessage = new Message();
  newMessage.text = req.body.msg;
  newMessage.id = req.params.id;
  newMessage.save(function (err, result) {
    if (err) {
      return done(err);
    }
    res.redirect('/');
  });
});
module.exports = router;
