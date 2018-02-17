var mongoose      = require('mongoose');
var url           = 'mongodb://wp5any:123456@ds229418.mlab.com:29418/wp5any';
//mongodb://wp5any:123456@ds229418.mlab.com:29418/wp5any
//mongodb://localhost:27017/wp5any

mongoose.Promise = global.Promise;
mongoose.connect(url)
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));
