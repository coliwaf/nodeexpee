import express from "express";
import morgan from "morgan";
import cors from "cors";
import logger from "node-color-log";
import { connectDB } from "./Objects/sqlite_db.js";

//register our routes
import { router as userRoutes } from './Routes/users.js';
import { router as authRoutes } from './Routes/auth.js';
import { router as categoryRoutes } from './Routes/categories.js';
import { router as contactRoutes } from './Routes/contacts.js';
import { router as customerRoutes } from './Routes/customers.js';
import { router as jobRoutes } from './Routes/jobs.js';
import { router as materialRoutes } from './Routes/materials.js';
import { router as orderRoutes } from './Routes/orders.js';
import { router as orderDetailsRoutes } from './Routes/order_details.js';
import { router as payDetailsRoutes } from './Routes/pay_details.js';
import { router as payableRoutes } from './Routes/payable.js';
import { router as paymentRoutes } from './Routes/payments.js';
import { router as productRoutes } from './Routes/products.js';
import { router as siteVisitRoutes } from './Routes/site_visits.js';
import { router as unitRoutes } from './Routes/units.js';

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
app.use("/api/v1", [
	userRoutes, 
	categoryRoutes,
	contactRoutes,
	customerRoutes,
	jobRoutes,
	materialRoutes,
	orderRoutes,
	orderDetailsRoutes,
	payDetailsRoutes,
	payableRoutes,
	paymentRoutes,
	productRoutes,
	siteVisitRoutes,
	unitRoutes
 ]);
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