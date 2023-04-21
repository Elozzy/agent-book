const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const models = require("../models");
const User = require("./User");
const Token = require("./Token");
const ErrorHandler = require("../utils/ErrorHandler");
const { validateEmail } = require("../utils/helper");

class Authentication {
  /**
   * @des password check
   * @param {*} data
   */
  static async hashpassword(password) {
    return bcrypt.hash(password, 10);
  }

  /**
   * @description Compare password
   * @param {*} data
   */

  static async comparePassword(password, dbpassword) {
    return bcrypt.compare(password, dbpassword);
  }

  /**
   * @des User Registration
   * @param {*} data
   */

  static async register(data) {
    const { firstName, lastName, email, password } = data;

    const hashedPassword = await this.hashpassword(password);
    await User.create({ firstName, lastName, email, hashedPassword });

    // const code = randomSixDigits();
    // await Token.genCode(email, code);

    return { firstName, email };
  }

  /**
   * @desc User login
   * @param {*} email
   * @param {*} password
   */
  static async login({ email, password }) {
    const dbuser = await User.findOne(email);
    let data;

    if (dbuser === null) {
      throw new ErrorHandler("Invalid credential", 401);
    }

    if (!dbuser.isVerified && !dbuser.isAdmin) {
      throw new ErrorHandler("Account not verified", 401);
    }

    const checkedPassword = await dbuser.comparePassword(password);
    if (!checkedPassword) {
      throw new ErrorHandler("Invalid credential", 401);
    }
    data = dbuser.generateJwtToken();
    return {
      success: true,
      message: "Sign in successful",
      token: `Bearer ${data}`,
      roleName: dbuser.role ? dbuser.role.roleName : null,
      privileges: dbuser.role ? dbuser.role.privileges : null
    };
  }

  /**
   * @description Send password reset link
   * @param {*} email
   */
  static async passwordRecovery(email) {
    if (!email) {
      throw new ErrorHandler("Email is required", 400);
    }
    if (!validateEmail(email)) {
      throw new ErrorHandler("Email is invalid", 400);
    }

    const user = await User.findOne(email);
    if (user === null) {
      throw new ErrorHandler(
        "User not found! Please ensure that the email provided is correct",
        404
      );
    }
  
    const token = crypto.randomBytes(20).toString("hex");

    Token.resetToken(email, token);
    return { email, token, firstName: user.firstName };
  }

   /**
   * @description Reset user password
   * @param {*} resetToken
   * @param {*} password
   */
   static async passwordReset({ resetToken, password }) {
    const token = await Token.validateToken(resetToken);
    const hashedPassword = await this.hashpassword(password);

    await models.user.update(
      { password: hashedPassword },
      { where: { email: token.email } }
    );

    Token.deleteEmail(token.email);
  }
}

module.exports = Authentication;
