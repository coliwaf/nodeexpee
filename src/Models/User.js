import { sequelize } from "../Objects/sqlite_db.js";
import { Model, DataTypes } from "sequelize";

class User extends Model { };

User.init({
	title: {
		// If Owner, Customer, Employee
		type: DataTypes.STRING,
		allowNull: false
	},
	first_name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	last_name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	username: {
		type: DataTypes.STRING,
		allowNull:false,
		unique: true
	},
	email: {
		type: DataTypes.STRING,
		allowNull:false,
		unique: true
	},
	password: {
		type: DataTypes.INTEGER,
		// allowNull:false
	},
	image: {
		type: DataTypes.STRING,
	},
	signature: {
		type: DataTypes.STRING,
	}
}, {
	sequelize,
	modelName: 'user',
	deletedAt: 'deletedAt',
	paranoid: true,
	timestamps: true
});

// User.belongsToMany(roles, { through: userRoles });

export { User };