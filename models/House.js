const mongoose = require('mongoose');

const HouseSchema = new mongoose.Schema({
	numberOfBeds: {
		type: String,
		required: true
	},
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
	houseUrl: {
		type: String,
		required: true
	},
	searchTerm: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'search'
	},
	investmentReturn: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'propertyYield'
	}
});

module.exports = House = new mongoose.model('House', HouseSchema);
