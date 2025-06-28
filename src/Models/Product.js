import { sequelize } from "../Objects/sqlite_db.js";
import { Model, DataTypes } from "sequelize";

class Product extends Model { };

Product.init({
	name: {
		type: DataTypes.TEXT,
		allowNull: false
	},
	item_code: {
		type: DataTypes.STRING,
		allowNull: false
	},
	unit_cost: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	total_inventory: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	availability: {
		type: DataTypes.STRING,
		allowNull: false
	},
	category_id: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
}, {
	sequelize,
	modelName: 'product',
	deletedAt: 'deletedAt',
	paranoid: true,
	timestamps: true
});

export { Product };