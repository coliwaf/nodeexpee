import { sequelize } from "../Objects/sqlite_db.js";
import { Model, DataTypes } from "sequelize";

class Category extends Model { };

Category.init({
	name: {
		type: DataTypes.STRING,
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
	description: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notNull: {
				msg: 'Provide description'
			},
			notEmpty: {
				msg: 'Name cannot be blank'
			}
		}
	},
	categorize: {
		//Materials, Users, 
		type: DataTypes.STRING,
		allowNull: false
	}
}, {
	sequelize,
	modelName: 'category',
	deletedAt: 'deletedAt',
	paranoid: true,
	timestamps: true
});

export { Category };