module.exports = (sequelize, DataTypes) => {
	const Card = sequelize.define('card', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		},
		userId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: {
					args: true,
					msg: 'card title field is required',
				},
			},
		},
		selectProject: {
			type: DataTypes.ENUM,
			values: ['design', 'development', 'marketing', 'general'],
			allowNull: false,
			validate: {
				notNull: {
					args: true,
					msg: 'select a project field is required',
				},
			},
		},
		cardStage: {
			type: DataTypes.ENUM,
			values: ['todo', 'backlogs', 'inprogress', 'inreveiw', 'completed'],
			allowNull: false,
			validate: {
				notNull: {
					args: true,
					msg: 'select a card stage field is required',
				},
			},
		}
	});
	Card.associate = function (models) {
		Card.belongsTo(models.user);
	};
	return Card;
};
