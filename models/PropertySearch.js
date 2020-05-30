const mongoose = require('mongoose');

const PropertySearchSchema = new mongoose.Schema({
	searchTerm: {
		type: String,
		required: true
	},
	maxprice: {
		type: String,
		required: true
  },
  date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Search = new mongoose.model('Search', PropertySearchSchema);