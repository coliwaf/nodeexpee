import { sequelize } from "../Objects/sqlite_db.js";
import { Model, DataTypes } from "sequelize";

class SiteVisit extends Model { };

SiteVisit.init({
	customer_id: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	alternate_phn: {
		type: DataTypes.STRING,
		allowNull: false
	},
	user_id: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	invoiced: {
		type: DataTypes.STRING,
		allowNull: false
	},
	payable_id: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false
	},
	date_visited: {
		type: DataTypes.DATE
	},
	closed_at: {
		type: DataTypes.DATE
	}
}, {
	sequelize,
	modelName: 'siteVisit',
	deletedAt: 'deletedAt',
	paranoid: true,
	timestamps: true
});

export { SiteVisit };