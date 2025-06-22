const jwt = require("jsonwebtoken");

require("dotenv").config();

function generateAccessToken(username) {
	return jwt.sign(username, process.env.TOKEN_SECRET);
}

function authenticateToken(req, res, next) {
	const bearerToken = req.headers["authorization"];

	if (bearerToken) {
		const bearer = bearerToken.split(" ")[1]; // Bearer token

		if (!bearer) {
			res.status(401);
		}

		jwt.verify(bearer, process.env.TOKEN_SECRET, (err, user) => {
			if (err) {
				return res.status(403);
			}

			req.user = user;
			next();
		});
	}
} 

module.exports = {
	generateAccessToken,
	authenticateToken
};