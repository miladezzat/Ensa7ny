var express 		  = require('express');
var path 			    = require('path');
var favicon 		  = require('serve-favicon');
var logger 			  = require('morgan');
var cookieParser 	= require('cookie-parser');
var bodyParser 		= require('body-parser');
var expressHbs    = require('express-handlebars');
var mongoose      = require('mongoose');
var session			  = require('express-session');
var passport		  = require('passport');
var flash  			  = require('connect-flash');
var validator     = require('express-validator');
var MongoStroe    = require('connect-mongo')(session);
var app 			    = express();

var users 			  = require('./routes/users');
var index 			  = require('./routes/index');
//var social        = require('./config/fblogin.js')(app, passport);



//connection to MongoDB Local

//mongodb://wp5any:123456@ds229418.mlab.com:29418/wp5any
//mongodb://localhost:27017/wp5any
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://wp5any:123456@ds229418.mlab.com:29418/wp5any')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));
require('./config/passport')

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'hbs');
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({
  secret: 'mysupersecret',
  resave: false,
  saveUninitialized: true,
  store: new MongoStroe({ mongooseConnection: mongoose.connection}),
  cookie: { maxAge: 18000 * 6000 * 100000}
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
  res.locals.login = req.isAuthenticated();
  res.locals.session = res.session;
  next();
});

app.use('/users', users);
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
