import { sequelize } from "../Objects/sqlite_db.js";
import { Model, DataTypes } from "sequelize";

class Order extends Model { };

Order.init({
	customer_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		validate: {
			notNull: {
				msg: 'Provide category name'
			},
			notEmpty: {
				msg: 'Name cannot be blank'
			}
		}
	},
	shipping_address: {
		type: DataTypes.INTEGER,
		allowNull: false,
		validate: {
			notNull: {
				msg: 'Provide category name'
			},
			notEmpty: {
				msg: 'Name cannot be blank'
			}
		}
	}
}, {
	sequelize,
	modelName: 'order',
	deletedAt: 'deletedAt',
	paranoid: true,
	timestamps: true
});

export { Order };