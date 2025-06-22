const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const logger = require("node-color-log");
const connectToDatabase = require("./Objects/Database");

//register our routes
const userRoutes = require("./Routes/User");

const serverLog = logger.createNamedLogger("Server");

const app = express();

/* app.use(session({
	secret: 'some secret',
	cookie: {maxAge: 30000},
	saveUninitialized: false,
	store
})); */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use(cors());

serverLog.info("Registering user route.");
//user api route suffix
app.use("/api", userRoutes);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, 'localhost', () => {
	serverLog.info(`API is listening on port ${PORT}`);

	connectToDatabase(process.env.DATABASE_URL)
		.then(() => {
			serverLog.info("Successfully connected to database.");
		})
		.catch(() => {
			serverLog.info("There was an error connecting to your database.");
		});
});