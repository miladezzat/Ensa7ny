var express               = require('express');
var router                = express.Router();
var Message               =	require('../models/messages.js');
var User                  =	require('../models/user.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Ensahny' });
});
router.get('/about', function(req, res, next) {
  res.render('user/about', { title: 'Ensahny' });
});

//message
router.get('/message/:id', function(req, res, next) {
  //var username = req.user.fullname;

  User.findOne({_id: req.params.id}, function(err, user) {
    if (err) {
      return res.write('Error!');
    }
    res.render('user/message', { title: 'Ensahny',id:req.params.id, username: user.fullname});
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
