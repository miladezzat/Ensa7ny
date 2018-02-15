var mongoose	= require('mongoose');
var Schema		= mongoose.Schema;

var feedbackSchema = new Schema({
	text: 		{type: String, required: true},
	email:   	{type: String, required: true}
});

module.exports = mongoose.model('Feedback', feedbackSchema);
