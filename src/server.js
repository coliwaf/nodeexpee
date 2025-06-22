const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("node-color-log");
const connectToDatabase = require("./Objects/Database");

//register our routes
const userRoutes = require("./Routes/User");

const serverLog = logger.createNamedLogger("Server");

const app = express();

app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(cors());

serverLog.info("Registering user route.");
//user api route suffix
app.use("/api", userRoutes);

const server = app.listen(8081, 'localhost', () => {
	serverLog.info("API is listening on port 8081");

	connectToDatabase(process.env.DATABASE_URL)
		.then(() => {
			serverLog.info("Successfully connected to database.");
		})
		.catch(() => {
			serverLog.info("There was an error connecting to your database.");
		});
});