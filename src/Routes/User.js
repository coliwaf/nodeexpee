const express = require("express");
const userModel = require("../Models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const { generateAccessToken, authenticateToken } = require("../Middleware/Authentication/authentication.middleware");

router.post("/register", async (req, res) => {
	// if(req.body)

	const hash = await bcrypt.hash(req.body.password, process.env.PASSWORD_SALT);
	const { uuid, username } = req.body;

	const data = new userModel({
		uuid,
		username,
		password: hash
	});

	try {
		await data.save();

		const token = generateAccessToken(data.uuid);
		res.status(200).json({ token: token });

	} catch (error) {
		res.status(400).json({ error: error?.message });
	}
});

router.post("/login", async (req, res) => {
	const { username, password } = req.body;

	const user = await userModel.findOne({
		username: username
	});

	if (user) {
		const validPassword = await bcrypt.compare(password, entry.password);

		if (validPassword) {
			const token = generateAccessToken(entry.username);

			res.status(200).json({
				token: token,
				...user
			});
		} else {
			res.json({
				error: "Invalid Password"
			})
		}
	}
});

router.post("/users/create", authenticateToken, async (req, res) => {
	try {
		const hash = await bcrypt.hash(req.body.password, process.env.PASSWORD_SALT);
		const { uuid, username } = req.body;

		const data = new userModel({
			uuid,
			username,
			password: hash
		});

		await data.save();

		res.status(200).json(data);

	} catch (error) {
		res.status(400).json({ error: error?.message })
	}
});

module.exports = router();