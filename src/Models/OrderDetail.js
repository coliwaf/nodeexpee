import { sequelize } from "../Objects/sqlite_db.js";
import { Model, DataTypes } from "sequelize";

class OrderDetail extends Model { };

OrderDetail.init({
	order_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		validate: {
			notNull: {
				msg: 'Provide details id for reference'
			},
			notEmpty: {
				msg: 'Order Id cannot be blank'
			}
		}
	},
	product_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		validate: {
			notNull: {
				msg: 'Provide product id for reference'
			},
			notEmpty: {
				msg: 'Product Id cannot be blank'
			}
		}
	},
	payment_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		validate: {
			notNull: {
				msg: 'Provide details id for reference'
			},
			notEmpty: {
				msg: 'Order Id cannot be blank'
			}
		}
	},
	amount: {
		type: DataTypes.INTEGER,
		allowNull: false,
		validate: {
			notNull: {
				msg: 'Provide order amount for reference'
			},
			notEmpty: {
				msg: 'Order amount cannot be blank'
			}
		}
	},
	discount: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 0
	},
	delivery_fee: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 0
	}
}, {
	sequelize,
	modelName: 'order_detail',
	deletedAt: 'deletedAt',
	paranoid: true,
	timestamps: true
});

export { OrderDetail };