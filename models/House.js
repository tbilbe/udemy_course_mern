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
		type: String,
		require: true
	},
	maxCapitalValue: {
		type: Number,
		required: false
	}
});

module.exports = House = new mongoose.model('House', HouseSchema);
