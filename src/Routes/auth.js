import { Router } from "express";
const router = Router();
import bcrypt from "bcrypt";
import { generateAccessToken, authenticateToken } from "../Middleware/Authentication/authentication.middleware.js";
import { User } from "../Models/User.js"
import logger from "node-color-log";
const serverLog = logger.createNamedLogger("Server");


//register user(s)
router.post("/register", async (req, res) => {
	// Users can register but will only be approved by SuperAdmin.
	const username = req.body.username;
	const email = req.body.email;
	//password
	const salt = bcrypt.genSaltSync(10);
	const passHash = bcrypt.hashSync(req.body.password, salt);

	const theUser = User.build({
		username: username,
		email: email
	})

	theUser.password = passHash;

	await theUser.save();
	serverLog.info("User is registered");
	res.status(201).send({ msg: 'Registered User' });
});

//login user(s)
router.post("/login", async (req, res) => {
	// have to be logged in to access all of the app
	const e_mail = req.body.email;	
	const pWord = req.body.password;
	const thisUser = await User.findOne({ where: {email: e_mail}});

	if (thisUser) {
		const validPassword = await bcrypt.compare(pWord, thisUser.password);
		if (validPassword) {
			const token = generateAccessToken(thisUser.email);
			serverLog.info("User logged in");
			res.status(200).json({
				token: token,
				...thisUser
			});
		} else {
			res.json({
				error: "Invalid Password"
			})
		}
	}
});





/* router.post("/register", async (req, res) => {
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

router.post("/create", authenticateToken, async (req, res) => {
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

*/

// export default router;
export { router };
// module.exports = { router };