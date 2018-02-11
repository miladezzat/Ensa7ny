var express         = require('express');
var router          = express.Router();
var Message         =	require('../models/messages.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Wp5any' });
});
router.get('/about', function(req, res, next) {
  res.render('user/about', { title: 'Wp5any' });
});

//message
router.get('/message/:id', function(req, res, next) {
  res.render('user/message', { title: 'Wp5any',id:req.params.id });
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

router.get('/help/:id', function(req, res, next) {
  res.render('user/help', { title: 'Wp5any' });
});

router.post('/help', function(req, res, next) {
});


module.exports = router;
