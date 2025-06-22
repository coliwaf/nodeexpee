const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	uuid: {
		required: true,
		type: String
	},
	username: {
		required: true,
		type: String
	},
	password: {
		required: false,
		type: String
	},
	/* email: {
		required: true,
		type: String
	} */
});

module.exports = mongoose.model("user", userSchema);