import { sequelize } from "../Objects/sqlite_db.js";
import { DataTypes } from "sequelize";

const Book = sequelize.define('books', {
	id:{
		type:DataTypes.BIGINT, 
		autoIncrement: true,
		primaryKey: true,
		allowNull:false
	},
	title:{
		type:DataTypes.STRING,
		allowNull:false
	},
	author:{
		type:DataTypes.STRING
	},
	ISBN:{
		type:DataTypes.INTEGER,
		allowNull:false
	},
	genre:{
		type:DataTypes.STRING,
		allowNull:false
	},
	pubYear:{
		type:DataTypes.INTEGER,
		allowNull:false
	}
})

export { Book };