const models = require("../models");
const {
  Sequelize: { Op }
} = models;

class Card {
  /**
   * create a new card
   * @access Private
   */

  static async create(data, userId) {
    const cardField = { ...data };
    cardField.userId = userId;
  
    const card = await models.card.create({ ...cardField });
    return card;
  }

  static async findAllCards() {
    const allCards = await models.card.findAll({
        include: [
            {
                model: models.user,
                attributes:{
                    exclude : [
                        "id", 
                        "isAdmin",
                        "isVerified", 
                        "password",
                        "lastName",
                        "deletedAt", 
                        "createdAt",
                        "deletedAt",
                        "updatedAt"
                    ]
                }
            }
        ],
        order: [["createdAt", "DESC"]]
    })
    return allCards
  }
}

module.exports = Card;
