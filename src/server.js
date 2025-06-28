import express from "express";
import morgan from "morgan";
import cors from "cors";
import logger from "node-color-log";
import { connectDB } from "./Objects/sqlite_db.js";

//register our routes
import { router as userRoutes } from './Routes/users.js';
import { router as authRoutes } from './Routes/auth.js';
import { router as bookRoutes } from './Routes/books.js';

const serverLog = logger.createNamedLogger("Server");

const app = express();

//connection to database
connectDB();

/* app.use(session({
	secret: 'some secret',
	cookie: {maxAge: 30000},
	saveUninitialized: false,
	store
})); */

// Parse request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));
// use middlewares
app.use(cors());

serverLog.info("Registering api routes.");
app.use("/api/v1", userRoutes);
app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1", bookRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	serverLog.info(`API is listening on port ${PORT}`);

	/* connectDB(process.env.DATABASE_URL)
		.then(() => {
			serverLog.info("Successfully connected to database.");
		})
		.catch(() => {
			serverLog.info("There was an error connecting to your database.");
		}); */
});