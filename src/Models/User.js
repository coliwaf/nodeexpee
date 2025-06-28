import { sequelize } from "../Objects/sqlite_db.js";
import { Model, DataTypes } from "sequelize";

/* const User = sequelize.define('users', {
	id:{
		type:DataTypes.BIGINT, 
		autoIncrement: true,
		primaryKey: true,
		// allowNull:false
	},
	username:{
		type:DataTypes.STRING,
		allowNull:false,
		unique: true
	},
	email:{
		type:DataTypes.STRING,
		allowNull:false,
		unique: true
	},
	password:{
		type:DataTypes.INTEGER,
		allowNull:false
	},
	created_at:{
		type:DataTypes.DATE,
		defaultValue: DataTypes.NOW,
		allowNull:false
	},
	updated_at:{
		type:DataTypes.DATE,
		defaultValue: DataTypes.NOW,
		allowNull:false
	}

	// // It is possible to create foreign keys:
	// book_id: {
	// 	type: DataTypes.INTEGER,
  
	// 	references: {
	// 	  // This is a reference to another model
	// 	  model: Book,
  
	// 	  // This is the column name of the referenced model
	// 	  key: 'id',
  
	// 	},
}); */

class User extends Model { };

User.init({
	/* id:{
		type:DataTypes.BIGINT, 
		autoIncrement: true,
		primaryKey: true,
		allowNull:false
	}, */
	title: {
		// If Owner, Customer, Employee
		type: DataTypes.STRING,
		allowNull: false
	},
	firstName: {
		type: DataTypes.STRING,
		allowNull: false
	},
	lastName: {
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
		allowNull:false,
	},
	signature: {
		type: DataTypes.STRING,
		allowNull:false,
	},
	role_id: {
		type: DataTypes.INTEGER
	},
	user_details_id: {
		type: DataTypes.INTEGER
	},
}, {
	sequelize,
	modelName: 'user'
});

// User.belongsToMany(roles, { through: userRoles });
// console.log(User === sequelize.models.User);

export { User };