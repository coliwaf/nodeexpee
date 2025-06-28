import { sequelize } from "../Objects/sqlite_db.js";
import { Model, DataTypes } from "sequelize";

class Customer extends Model { };

Customer.init({
	company_name: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			min: {
				args: [3],
				msg: 'Company Name is too short'
			},
			notNull: {
				msg: 'Please provide company name'
			},
			notEmpty: {
				msg: 'Name cannot be blank'
			}
		}
	},
	company_address: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			min: {
				args: [3],
				msg: 'Company Address is too short'
			},
			notNull: {
				msg: 'Please provide company address'
			},
			notEmpty: {
				msg: 'Address cannot be blank'
			}
		}
	}/* ,
	contacts_id: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			isNumeric: {
				msg: 'Illegal name format'
			},
			notNull: {
				msg: 'Please provide contact name'
			},
			notEmpty: {
				msg: 'Provide primary contact reference'
			}
		}
	} */
}, {
	sequelize,
	modelName: 'customer',
	deletedAt: 'deletedAt',
	paranoid: true,
	timestamps: true
});

// Customer.belongsToMany(roles, { through: userRoles });

export { Customer };