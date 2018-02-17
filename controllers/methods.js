var mongoose    = require("mongoose");
var passport    = require("passport");
var User        = require("../models/user");

//object for methods
var methodsControl = {};

// Update user function
methodsControl.update = function (userId,fullname,email,phone,age, res){
  User.findOneAndUpdate({_id:userId}, { $set: { fullname: fullname, email:email, phone: phone, age:age }}, null, function(err){
    if (err) {
      throw err;
    }
    res.redirect('/users/admin');
  });
}

//Remove user function
methodsControl.RemoveUser = function(userId, res){
  User.remove({_id: userId }, function(err,removed) {
    if (err) {
      res.redirect('/');
    }
    res.redirect('/users/admin');
  });
}

//The user is admin or not
methodsControl.isAdmin = function (req, res, next){
  User.findOne({email: req.user.email}, function(err, results) {
    if (err) {
      return res.write('Error!');
    }
    if (results.permation == "1") {
      return next();
    }
    res.redirect('/users/profile');
  });
}

//The user is LoggedIn or not
methodsControl.isLoggedIn = function (req, res, next){
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

////The user is notLoggedIn or not
methodsControl.notLoggedIn = function (req, res, next){
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

module.exports = methodsControl;
