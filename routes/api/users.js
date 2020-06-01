// registering users and adding users ect
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../../models/User');
// const uuid = require('uuid/v4');

/*
  @route   POST api/users
  @desc    Register user route
  @access  Public
*/

router.post(
	'/',
	[
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'Please include a valid email').isEmail(),
		check(
			'password',
			'Please provide a password with 12 or more characters'
		).isLength({ min: 12 })
	],
	async (req, res) => {

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { name, email, password } = req.body;

		try {
			// see if user exists (using destructuring!)
			let user = await User.findOne({ email });
			
			// customer id for strip payments down the line!
			// const customerId = uuid();

			/* TODO:
			Create a subscription model
			possibly three tiers free - just email one a week
			lvl1 -> £20 / month
			lvl2 -> £50 / month
			*/

			if (user) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'User already exists' }] });
			}

			// get the user gravatar
			const avatar = gravatar.url(email, {
				s: '200',
				r: 'pg',
				d: 'mm'
			});

			user = new User({
				name,
				email,
				avatar,
				password,
				// customerId
			});

			//encrypt password
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);

			// save the user to the db
			await user.save();
			// return the token
			const payload = {
				user: {
					id: user.id
				}
			};
			jwt.sign(
				payload,
				config.get('jwt-token'),
				{ expiresIn: 3600 },
				(e, token) => {
					if (e) throw new Error();
					res.json({ token });
				}
			);

			// res.send('User Registered!');
		} catch (error) {
			console.error(error.message);
			res.status(500).send('server error!');
		}
	}
);

module.exports = router;
