import express from "express";
// const express = require("express");
import morgan from "morgan";
import cors from "cors";
import logger from "node-color-log";
import { connectToDatabase } from "./Objects/Database.js";

//register our routes
import { router as userRoutes } from './Routes/users.js';

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
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, 'localhost', () => {
	serverLog.info(`API is listening on port ${PORT}`);

	/* connectToDatabase(process.env.DATABASE_URL)
		.then(() => {
			serverLog.info("Successfully connected to database.");
		})
		.catch(() => {
			serverLog.info("There was an error connecting to your database.");
		}); */
});