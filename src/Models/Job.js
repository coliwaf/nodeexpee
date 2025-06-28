import { sequelize } from "../Objects/sqlite_db.js";
import { Model, DataTypes } from "sequelize";

class Job extends Model { };

Job.init({
	payable_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		validate: {
			notNull: {
				msg: 'Provide Quotation/Invoice for reference'
			},
			notEmpty: {
				msg: 'Quotation | Invoice cannot be blank'
			}
		}
	},
	customer_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		validate: {
			notNull: {
				msg: 'Provide Customer Details for reference'
			},
			notEmpty: {
				msg: 'Customer cannot be blank'
			}
		}
	},
	user_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		validate: {
			notNull: {
				msg: 'Provide User Details for reference'
			},
			notEmpty: {
				msg: 'User cannot be blank'
			}
		}
	},
	delivered_by: {
		type: DataTypes.STRING,
		allowNull: false
	},
	delivered_at: {
		type: DataTypes.DATE
	},
	approved_by: {
		type: DataTypes.STRING
	},
	approved_at: {
		type: DataTypes.DATE
	}
}, {
	sequelize,
	modelName: 'job',
	deletedAt: 'deletedAt',
	paranoid: true,
	timestamps: true
});

export { Job };