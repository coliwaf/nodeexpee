const express = require("express");
const userModel = require("../Models/User");
const router = express.Router();
// const router = express();
const bcrypt = require("bcrypt");
const { generateAccessToken, authenticateToken } = require("../Middleware/Authentication/authentication.middleware");

router.post("/register", async (req, res) => {
	// if(req.body)

	const salt = bcrypt.genSaltSync(10);
	const passHash = bcrypt.hashSync(req.body.password, salt);

	const { uuid, username } = req.body;

	const data = new userModel({
		uuid,
		username,
		password: passHash
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

		const salt = bcrypt.genSaltSync(10);
		const passHash = bcrypt.hashSync(req.body.password, salt);

		const { uuid, username } = req.body;

		const data = new userModel({
			uuid,
			username,
			password: passHash
		});

		await data.save();

		res.status(200).json(data);

	} catch (error) {
		res.status(400).json({ error: error?.message })
	}
});

router.get("/users", (req, res) => {
	userModel.find({})
		.then((users) => {
			res.json(users);
		})
		.catch((error) => {
			console.log(error);
		});
	// res.json({...user});
});

module.exports = router;