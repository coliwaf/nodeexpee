import { sequelize } from "../Objects/sqlite_db.js";
import { Model, DataTypes } from "sequelize";

class Unit extends Model { };

Unit.init({
	name: {
		type: DataTypes.STRING,
		allowNull: false
	}
}, {
	sequelize,
	modelName: 'unit',
	deletedAt: 'deletedAt',
	paranoid: true,
	timestamps: true
});

export { Unit };