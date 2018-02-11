var mongoose	= require('mongoose');
var Schema		= mongoose.Schema;
var bcrypt      = require('bcrypt-nodejs');

var message = new Schema({
	text: 		{type: String, required: true},
	id:       {type: String, required: true},
});

module.exports = mongoose.model('message', message);
