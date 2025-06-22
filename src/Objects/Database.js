const mongoose = require("mongoose");

function connectToDatabase(databaseString) {
	return new Promise((resolve, reject) => {
		mongoose.connect(databaseString)
			.then(resolve)
			.catch(reject);
	});
}

module.exports = connectToDatabase;