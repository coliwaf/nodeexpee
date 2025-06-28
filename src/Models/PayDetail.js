import { sequelize } from "../Objects/sqlite_db.js";
import { Model, DataTypes } from "sequelize";

class PayDetail extends Model { };

PayDetail.init({
	amt_paid: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 0
	},
	balance_due: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	method: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notNull: {
				msg: 'Provide payment method'
			},
			notEmpty: {
				msg: 'Payment Method cannot be blank'
			}
		}
	},
	transaction_code: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notNull: {
				msg: 'Provide transaction code method'
			},
			notEmpty: {
				msg: 'Code cannot be blank'
			}
		}
	},
	paid_by: {
		type: DataTypes.INTEGER,
		allowNull: false,
		validate: {
			notNull: {
				msg: 'Provide paid by name details'
			},
			notEmpty: {
				msg: 'Name cannot be blank'
			}
		}
	},
	payment_phone: {
		type: DataTypes.STRING
	},
	payment_id: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
}, {
	sequelize,
	modelName: 'payDetail',
	deletedAt: 'deletedAt',
	paranoid: true,
	timestamps: true
});

export { PayDetail };