var express		            =	require('express');
var router 		            =	express.Router();
var csrf		              =	require('csurf');
var passport	            =	require('passport');
var User                  =	require('../models/user.js');
var Message               =	require('../models/messages.js');

//import the controller of users
var userController        = require("../controllers/userController");

//All methods for control users
var methodsController     = require("../controllers/methods");

var csrfProtection  = csrf();
router.use(csrfProtection);


/*router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }));
router.get('/auth/facebook',
  passport.authenticate('facebook', { scope: 'email' })
);
*/
//route user profile page
router.get('/profile', methodsController.isLoggedIn ,userController.profille);

//route user profile page
router.get('/admin',methodsController.isAdmin, methodsController.isLoggedIn ,userController.admin);

//Delete user
router.get('/delete/:id',methodsController.isLoggedIn,userController.deleteUser);

//delete message of the user
router.get('/deletmessage/:id',methodsController.isLoggedIn,function(req, res){
  console.log(req.params.id);
  Message.remove({_id: req.params.id }, function(err,removed) {
    if (err) {
      res.redirect('/');
    }
    res.redirect('/users/profile');
  });
});

//page user
router.get('/userpage/:id',methodsController.isLoggedIn,methodsController.isAdmin, function(req, res){
  User.findOne({_id: req.params.id}, function(err, results) {
    if (err) {
      return res.write('Error!');
    }
      var username = results.fullname;

      var gender = false;
      if (results.gender == "1") {
        gender = true;
      }

      Message.find({id:results.id}, function(err, messages){
        if (err) {
          throw err;
        }
        res.render('admin/profile', { title: 'Ensa7ny',username: username, gender: gender, id:results._id,messages: messages});
      });
  });
});

//get update users page
router.get('/update/:id',methodsController.isLoggedIn,userController.updateUser);

//save updateUser
router.post('/update/:id',userController.updateUserPost);

//logout user
router.get('/logout', methodsController.isLoggedIn ,userController.userLogout);




router.use('/', methodsController.notLoggedIn, function(req, res, next) {
  next();
});

/* GET Register Page. */
router.get('/register', userController.register);

/* Authenticated Register. */
router.post('/register', passport.authenticate('local.signup', {
		successRedirect: '/users/profile',
		failureRedirect: '/users/register',
		failureFlash: true
}));

/* GET Login Page. */
router.get('/login', userController.login);

/* Authenticated Login*/
router.post('/login', passport.authenticate('local.signin', {
		successRedirect: '/users/profile',
		failureRedirect: '/users/login',
		failureFlash: true
}));

module.exports = router;
