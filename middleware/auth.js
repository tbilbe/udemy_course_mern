const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
	// Get token
	const token = req.header('x-auth-token');
	if (!token) {
		return res.status(401).json({ msg: 'No Token, authorisation denied!' });
	}

	// verify token
	try {
		const decodedToken = jwt.verify(token, config.get('jwt-token'));

		req.user = decodedToken;
		next();
	} catch (error) {
		res.status(401).json({ msg: 'Token is not valid' });
	}
};
