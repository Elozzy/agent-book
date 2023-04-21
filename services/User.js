const models = require('../models');

class User {
  /**
   * Create new user
   * @param {*} data
   */

  static async create(data) {
    const isVerified = data.isVerified ? data.isVerified : true;
    const isAdmin = data.isAdmin ? data.isAdmin : false;
    return await models.user.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.hashedPassword,
      isVerified,
      isAdmin
    });
  }

  /**
   * @description Find User by Email
   * @param {1} email
   */
  static async findOne(email) {
    return await models.user.findOne({
      where: { email }
    });
  }

  
}

module.exports = User;
