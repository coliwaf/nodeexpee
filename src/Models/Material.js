import { sequelize } from "../Objects/sqlite_db.js";
import { Model, DataTypes } from "sequelize";

class Material extends Model { };

Material.init({
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notNull: {
				msg: 'Provide material name'
			},
			notEmpty: {
				msg: 'Name cannot be blank'
			}
		}
	},
	description: {
		type: DataTypes.TEXT,
		allowNull: false,
		validate: {
			notNull: {
				msg: 'Provide material description'
			},
			notEmpty: {
				msg: 'Description cannot be blank'
			}
		}
	},
	units: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notNull: {
				msg: 'Provide measurement units'
			},
			notEmpty: {
				msg: 'Units cannot be blank'
			}
		}
	},
	unit_cost: {
		type: DataTypes.INTEGER,
		allowNull: false,
		validate: {
			notNull: {
				msg: 'Provide per unit cost'
			},
			notEmpty: {
				msg: 'Per Unit Cost cannot be blank'
			}
		}
	},
	total_inventory: {
		type: DataTypes.INTEGER,
		allowNull: false,
		validate: {
			notNull: {
				msg: 'Provide all available units'
			},
			notEmpty: {
				msg: 'Inventory cannot be blank'
			}
		}
	},
	availability: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notNull: {
				msg: 'Are these available?'
			},
			notEmpty: {
				msg: 'Availability cannot be blank'
			}
		}
	},
	category_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		validate: {
			notNull: {
				msg: 'Provide category id for reference'
			},
			notEmpty: {
				msg: 'Cat id cannot be blank'
			}
		}
	}
}, {
	sequelize,
	modelName: 'material',
	deletedAt: 'deletedAt',
	paranoid: true,
	timestamps: true
});

export { Material };