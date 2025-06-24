import logger from "node-color-log";
import { Sequelize } from "sequelize";

const serverLog = logger.createNamedLogger("Server");

const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: "./dev.sqlite"
});

const connectDB = async () => {
	// Synchronize
	sequelize.sync({
		// //recreate database each time
		// force: true
	});

	try {
		await sequelize.authenticate();
		serverLog.info('Connected to DB successfully.');
	} catch (error) {
		serverLog.error(`Connection Error: ${error}`);
	}
};

export { sequelize, connectDB };