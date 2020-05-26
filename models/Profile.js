const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user'
	},
	company: {
		type: String
	},
	website: {
		type: String
	},
	location: {
		// landlord location
		type: String
	},
	status: {
		// active looking for property, active selling property
		type: String,
		required: true
	},
	skills: {
		// expirence of specific contract types - b2l, below market val, lease option aggre, ect
		type: [String]
	},
	bio: {
		type: String
	},
	propertySearchHistory: [
		{
			searchLocation: {
				type: String,
				required: true
			},
			purchasePriceTarget: {
				type: String,
				required: true
			}
		}
	],
	portfolio: [
		// has its own put route 'api/profile/experience'
		{
			title: {
				type: String,
				required: true
			},
			location: {
				// exact location not required - first half of Postcode
				type: String,
				required: true
			},
			size: {
				type: Number,
				required: true
			},
			status: {
				// Status is tennanted, un tennanted, for sale, looking for partner ect
				type: String,
				required: true
			},
			contractType: {
				// buy-to-let, lease option, fully owned, serviced let
				type: String,
				required: true
			},
			dateOwned: {
				type: Date
			},
			dateCreated: {
				type: Date,
				default: Date.now
			}
		}
	],
	social: {
		facebook: {
			type: String
		},
		instagram: {
			type: String
		},
		twitter: {
			type: String
		},
		linkedin: {
			type: String
		}
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Profile = new mongoose.model('Profile', ProfileSchema);
