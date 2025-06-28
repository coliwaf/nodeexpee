import { sequelize } from "../Objects/sqlite_db.js";
import { Model, DataTypes } from "sequelize";

class Payment extends Model { };

Payment.init({
	amt_due: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	payable_id: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	user_id: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	payment_status: {
		type: DataTypes.STRING,
		allowNull: false
	}
}, {
	sequelize,
	modelName: 'payment',
	deletedAt: 'deletedAt',
	paranoid: true,
	timestamps: true
});

export { Payment };