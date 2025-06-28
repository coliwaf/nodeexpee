import { sequelize } from "../Objects/sqlite_db.js";
import { Model, DataTypes } from "sequelize";

class Contact extends Model { };

Contact.init({
	contact_name: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			min: {
				args: [3],
				msg: 'Name is too short'
			},
			/* isAlphanumeric: {
				msg: 'Illegal name format'
			}, */
			notNull: {
				msg: 'Please provide contact name'
			},
			notEmpty: {
				msg: 'Name cannot be blank'
			}
		}
	},
	contact_phone: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			/* is: { 
				args: ["/(\+*\d{1,})*([ |\(])*(\d{3})[^\d]*(\d{3})[^\d]*(\d{4})/"], 
				msg: "Unknown phone number format" 
			}, */
			notNull: { msg: "Enter phone number" },
			notEmpty: { msg: 'Enter phone number!' }
		}
	},
	customer_id: {
		type: DataTypes.INTEGER
	},
	user_id: {
		type: DataTypes.INTEGER
	}
}, {
	sequelize,
	modelName: 'contact',
	deletedAt: 'deletedAt',
	paranoid: true,
	timestamps: true
});
// Contact.sync({ force: true });

export { Contact };