import { sequelize } from "../Objects/sqlite_db.js";
import { Model, DataTypes } from "sequelize";

class Payable extends Model { };

Payable.init({
	type: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: "Quotation"
	},
	prefix: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: "AG/QTN/"
	},
	our_ref: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	customer_id: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	user_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		validate: {
			notNull: {
				msg: 'Provide user id for reference'
			},
			notEmpty: {
				msg: 'User id cannot be blank'
			}
		}
	},
	payment_id: {
		type: DataTypes.INTEGER
	}
}, {
	sequelize,
	modelName: 'payable',
	deletedAt: 'deletedAt',
	paranoid: true,
	timestamps: true
});

Payable.sync({ force: true });

export { Payable };