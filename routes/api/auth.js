// handling getting the tokens
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
/*
  @route   GET api/auth
  @desc    Test route
  @access  Public
*/

router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.user.id).select('-password');
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error!');
	}
});

/*
  @route   POST api/auth
  @desc    Authenticate user and get token
  @access  Public
*/
router.post(
	'/',
	[
		check('email', 'Please include a valid email').isEmail(),
		check('password', 'Please provide a password').exists()
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { email, password } = req.body;
		try {
			//  see if user exists (using destructuring!)
			let user = await User.findOne({ email });

			if (!user) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'Invalid credentials' }] });
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'Invalid credentials' }] });
			}

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
