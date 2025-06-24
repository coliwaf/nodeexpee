import mongoose from 'mongoose';

function connectToDatabase(databaseString) {
	return new Promise((resolve, reject) => {
		mongoose.connect(databaseString)
			.then(resolve)
			.catch(reject);
	});
}

export { connectToDatabase };
// module.exports = connectToDatabase;