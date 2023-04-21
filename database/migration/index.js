require('dotenv').config();
const {sequelize, User, Token} = require('../../models');



sequelize
  .authenticate()
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));
(async () => {
	try {
		await sequelize.sync({alter: true});
		await User.sync({alter: true});
        await Token.sync({alter: true});
		await Card.sync({alter: true})
	} catch (error) {
		console.log(error);
	}
})();
