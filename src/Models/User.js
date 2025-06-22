const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	/* uuid: {
		required: true,
		type: String
	}, */
	username: {
		required: true,
		unique: [true, 'Username already taken'],
		type: String
	},
	password: {
		required: true,
		type: String
	},
	/* email: {
		required: true,
		unique: [true, 'Email Taken: An account with this Email already exists'],
		lowercase: true,
		type: String
	} */
});

module.exports = mongoose.model("user", userSchema);