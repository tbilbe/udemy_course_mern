const mongoose = require('mongoose');

const HouseSchema = new mongoose.Schema({
	listingSummary: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	listPrice: {
		type: String,
		require: true
	},
	fullDescription: {
		type: String
	},
	image: {
		type: String,
		require: true
	},
	rentalSummaryInArea: {
		type: String,
		require: true
	},
	rentalAverageInArea: {
		type: String,
		require: true
	},
	searchTerm: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'search'
	}
});

module.exports = House = new mongoose.model('House', HouseSchema);
