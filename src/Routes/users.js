import { Router } from "express";
import userModel from "../Models/User_mongo-db.js";
const router = Router();
import bcrypt from "bcrypt";
import { generateAccessToken, authenticateToken } from "../Middleware/Authentication/authentication.middleware.js";
import db from "../Objects/Db.js";
import { User } from "../Models/User.js"
import logger from "node-color-log";
const serverLog = logger.createNamedLogger("Server");

router.get("/users", async (req, res) => {
	//logged in user if admin see's all users if employee see' only their data
	const users = await User.findAll();
	res.status(200).send(users);

	/* 
	User.findAll({})
	.then((users) => {
		res.json(users);
	})
	.catch((error) => {
		console.log(error);
	}); 
	*/
});

//create user(s)
router.post("/users", async (req, res) => {
	// User can be employer, employee or customer
	await User.create(req.body);
	serverLog.info("User is inserted");
	res.status(201).send({ msg: 'Created User' });
});

//single user
router.get("/users/:id", async (req, res) => {
	const requestedId = req.params.id;
	const user = await User.findOne({ where: {id: requestedId}});
	//implement user fetch fails
	res.status(200).send(user);

	/* 
	User.findAll({})
	.then((users) => {
		res.json(users);
	})
	.catch((error) => {
		console.log(error);
	}); 
	*/
});

//update user
router.put("/users/:id", async (req, res) => {
	const requestedId = req.params.id;
	const user = await User.findOne({ where: {id: requestedId}});
	user.username = req.body.username;

	//update database
	user.save();
	//implement user fetch fails
	serverLog.info("User has been updated");
	res.status(200).send({ msg: 'Updated!' });

});

//delete user
router.delete("/users/:id", async (req, res) => {
	const requestedId = req.params.id;
	await User.destroy({ where: {id: requestedId}});
	res.status(200).send({ msg: 'User Removed!' });
});


/* router.use((req, res, next) => {
	console.log('request made to /USERS route');
	next();
}); */

/* // Using Mysql
router.post("/users", (req, res) => {
	const { username, password } = req.body;
	if (username && password){
		try {
			db.promise().query(`INSERT INTO USERS VALUES('${username}', '${password}')`);
			res.status(201).send({ msg: 'Created User'});		
		} catch (error) {
			console.log(error);
		}
	}
}); 
*/

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