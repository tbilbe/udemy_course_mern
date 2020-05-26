// getting profile, saving profile ect
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');

/*
  @route   GET api/profile/me
  @desc    Get current users profile
  @access  Private
*/

router.get('/me', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.user.user.id
		}).populate('user', ['name', 'avatar']);
		if (!profile) {
			return res.status(400).json({ msg: 'There is no profile for this user' });
		}
		res.json(profile);
	} catch (error) {
		console.log(error);
		res.status(500).send('Server Error');
	}
});

/*
  @route   POST api/profile
  @desc    Create or Update a users profile
  @access  Private
*/

router.post(
	'/',
	[
		auth,
		check('status', 'Status is required').not().isEmpty(),
		check('location', 'Location is required to set up a profile')
			.not()
			.isEmpty()
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const {
			company,
			website,
			location,
			status,
			skills,
			bio,
			facebook,
			instagram,
			twitter,
			linkedin
		} = req.body;

		// Build the profile;
		const profileFields = {};
		profileFields.user = req.user.user.id;

		profileFields.company = company ? company : undefined;
		profileFields.website = website ? website : undefined;
		profileFields.location = location ? location : undefined;
		profileFields.status = status ? status : undefined;
		profileFields.bio = bio ? bio : undefined;

		profileFields.skills = skills
			? skills.split(',').map((skill) => skill.trim())
			: undefined;

		profileFields.social = {};

		profileFields.social.facebook = facebook ? facebook : undefined;
		profileFields.social.instagram = instagram ? instagram : undefined;
		profileFields.social.twitter = twitter ? twitter : undefined;
		profileFields.social.linkedin = linkedin ? linkedin : undefined;

		try {
			let profile = await Profile.findOne({ user: req.user.user.id });
			if (profile) {
				//  update profile
				profile = await Profile.findOneAndUpdate(
					{ user: req.user.user.id },
					{ $set: profileFields },
					{ new: true }
				);
				return res.json(profile);
			}
			// create if no profile
			profile = new Profile(profileFields);
			await profile.save();
			res.json(profile);
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Server error!');
		}
	}
);

/*
  @route   GET api/profile
  @desc    Get all users profile
  @access  Public
*/

router.get('/', async (req, res) => {
	try {
		const profiles = await Profile.find().populate('user', ['name', 'avatar']);
		res.json(profiles);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

/*
  @route   GET api/profile/user/:user_id
  @desc    Get users profile by id
  @access  Public
*/

router.get('/user/:user_id', async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.params.user_id
		}).populate('user', ['name', 'avatar']);

		if (!profile) return res.status(400).send({ msg: 'Profile not found' });

		res.json(profile);
	} catch (err) {
		console.error(err.message);
		if (err.kind == 'ObjectId')
			return res.status(400).send({ msg: 'Profile not found' });
		res.status(500).send('Server Error');
	}
});

/*
  @route   DELETE api/profile
  @desc    Delete the user, and profile
  @access  Private
*/

router.delete('/', auth, async (req, res) => {
	try {
		// todo remove posts

		//Remove profile
		await Profile.findOneAndRemove({ user: req.user.user.id });
		// Remove user
		await User.findOneAndRemove({ _id: req.user.user.id });
		res.json({ msg: 'Success' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

/*
  @route   PUT api/profile/searchhistory
  @desc    Add users property search history
  @access  Private
*/

router.put(
	'/searchhistory',
	[
		auth,
		check('searchLocation', 'Search location is required').not().isEmpty(),
		check('purchasePriceTarget', 'Purchase price required').not().isEmpty()
	],
	async (req, res) => {
		// validation
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).send({ errors: errors.array() });
		}
		const { searchLocation, purchasePriceTarget } = req.body;

		const newSearch = {
			searchLocation,
			purchasePriceTarget
		};
		try {
			const profile = await Profile.findOne({ user: req.user.user.id });
			if (profile) {
				if (
					!profile.propertySearchHistory ||
					profile.propertySearchHistory.length === 0
				) {
					profile.propertySearchHistory = [];
					profile.propertySearchHistory.push(newSearch);
				} else {
					profile.propertySearchHistory.unshift(newSearch);
				}
				await profile.save();
			} else {
				res.status(400).send('Error Saving: Search History -> Resend');
			}
			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

//TODO maybe !
/*
  @route   DELETE api/profile/searchhistory
  @desc    Delete users property search history
  @access  Private
*/

/*
  @route   PUT api/profile/portfolio
  @desc    Add users property portfolio
  @access  Private
*/

router.put(
	'/portfolio',
	[
		auth,
		check('title', 'Title of the property is required').not().isEmpty(),
		check('location', 'location is required').not().isEmpty(),
		check('size', 'size is required').not().isEmpty(),
		check('status', 'status is required').not().isEmpty(),
		check('contractType', 'contract type is required').not().isEmpty()
	],
	async (req, res) => {
		// validation
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).send({ errors: errors.array() });
		}
		const { title, location, size, status, contractType } = req.body;

		const newPortfolio = { title, location, size, status, contractType };
		try {
			const profile = await Profile.findOne({ user: req.user.user.id });
			if (profile) {
				if (!profile.portfolio || profile.portfolio.length === 0) {
					profile.portfolio = [];
					profile.portfolio.push(newPortfolio);
				} else {
					profile.portfolio.unshift(newPortfolio);
				}
				await profile.save();
			} else {
				res.status(400).send('Error Saving: Portfolio -> Resend');
			}
			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

/*
  @route   DELETE api/profile/portfolio/:portfolio_id
  @desc    Delete users property portfolio
  @access  Private
*/

router.delete('/portfolio/:portfolio_id', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.user.id });

		if (profile) {
			if (profile.portfolio && profile.portfolio.length > 0) {
				const filteredPortfolios = profile.portfolio.filter(
					(el) => el.id !== req.params.portfolio_id
				);
				profile.portfolio = filteredPortfolios;
				await profile.save();
				res.json(profile);
			} else {
				res.status(400).send('Error deleting: Portfolio -> Resend');
			}
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
