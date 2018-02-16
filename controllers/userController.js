var mongoose        = require("mongoose");
var passport        = require("passport");
var User            = require("../models/user");
var methodsControl  = require("./methods.js");
var Message         =	require('../models/messages.js');
var FeedBack               =	require('../models/feedback.js');
var userController  = {};

// Restrict access to profile page
userController.profille = function(req, res, next) {
  User.findOne({email: req.user.email}, function(err, results) {
    if (err) {
      return res.write('Error!');
    }
    if (results.permation == "2") {
      console.log(results.gender);
      var username = results.fullname;
      var gender = false;
      if (results.gender == "1") {
        gender = true;
      }

      Message.find({id:results.id}, function(err, messages){
        if (err) {
          throw err;
        }
        res.render('user/profile', { title: 'Ensa7ny',username: username, gender: gender, id:results._id,messages: messages, userImage: results.image });
      });
    }
    if (results.permation == "1") {
      res.redirect('/users/admin');
    }
  });
};

// Restrict access to admin page
userController.admin = function(req, res, next) {
  User.findOne({email: req.user.email}, function(err, admin) {
    if (err) {
      return res.write('Error!');
    }
    User.find({}, function(err, results) {
      if (err) {
        throw err;
      }
      FeedBack.find({}, function(err, feedbacks){
        if (err) {
          throw err
        }
        var username = admin.fullname;
        res.render('admin/admin', { title: 'Ensa7ny',username: username, users: results, feedback : feedbacks});
      });
      //var decrypt      = require('decrypt-nodejs');
      //return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
      //console.log(decrypt.hashSync(results[0].password, decrypt.genSaltSync(5), null));
      //console.log(decrypt.hashSync(password, bcrypt.genSaltSync(5), null));
      });
  });
};


// Restrict access to delete user
userController.deleteUser = function(req, res, next) {
  var userId = req.params.id;
  methodsControl.RemoveUser(userId, res)
};

// Restrict access to Update page
userController.updateUser = function(req, res, next) {
  var userId = req.params.id;
  User.findOne({_id: userId}, function(err, results) {
    if (err) {
      return res.write('Error!');
    }
    res.render('admin/update', { title: 'Ensa7ny',user: results,csrfToken: req.csrfToken()});
  });
};

//Post Update user data
userController.updateUserPost = function(req, res, next) {
  var userId = req.params.id;
  var fullname = req.body.fullname;
  var email = req.body.email;
  var phone = req.body.tel;
  var age = req.body.age;
  methodsControl.update(userId, fullname,email,phone,age, res);
};

//Logout User
userController.userLogout = function(req, res, next) {
  req.logout();
  res.redirect('/');
};

// Restrict access to Register page
userController.register = function(req, res, next) {
  var messages = req.flash('error');
  res.render('user/register', { title: 'Ensa7ny', csrfToken: req.csrfToken(), messages: messages, hasError: messages.length >0 });
};

// Restrict access to login page
userController.login = function(req, res, next) {
  var messages = req.flash('error');
  res.render('user/login', { title: 'Ensa7ny', csrfToken: req.csrfToken(), messages: messages, hasError: messages.length >0 });
};

module.exports = userController;
