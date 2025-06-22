const mongoose = require("mongoose");

export function connectToDatabase(databaseString) {
	return new Promise((resolve, reject) => {
		mongoose.connect(databaseString)
			.then(resolve)
			.catch(reject);
	});
}