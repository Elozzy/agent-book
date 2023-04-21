const Joi = require("@hapi/joi");
const isEmpty = require("./is-empty");

exports.registerValidation = (data) => {
  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  const userSchema = Joi.object({
    firstName: Joi.string().trim().required().messages({
      "string.base": "firstname must be string",
      "string.empty": "First name field is required",
      "any.required": "First name field is required"
    }),
    lastName: Joi.string().trim().required().messages({
      "string.base": "lastname must be string",
      "string.empty": "Last name field is required",
      "any.required": "Last name field is required"
    }),
    email: Joi.string().email().trim().required().messages({
      "string.email": "Not a valid email",
      "string.base": "Not a valid email",
      "string.empty": "Email field is required",
      "any.required": "Email field is required"
    }),
    password: Joi.string().trim().min(8).required().messages({
      "string.empty": "Password field is required",
      "string.min": "Password must be atleast 8 character long",
      "any.required": "Password field is required"
    }),
    confirmPassword: Joi.string()
      .trim()
      .equal(Joi.ref("password"))
      .messages({ "any.only": "Password does not Match!" })
  });
  return userSchema.validateAsync(data, { abortEarly: false });
};

exports.loginValidation = (data) => {
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  const userSchema = Joi.object({
    email: Joi.string().email().trim().required().messages({
      "string.email": "Not a valid email",
      "string.base": "Not a valid email",
      "string.empty": "Email field is required",
      "any.required": "Email field is required"
    }),
    password: Joi.string().required().messages({
      "string.empty": "Password field is required",
      "string.min": "Password must be atleast 8 character long",
      "any.required": "First name field is required"
    })
  });
  return userSchema.validateAsync(data, { abortEarly: false });
};
exports.resetPasswordValidation = (data) => {
  data.resetToken = !isEmpty(data.resetToken) ? data.resetToken : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirmPassword = !isEmpty(data.confirmPassword)
    ? data.confirmPassword
    : "";

  const userSchema = Joi.object({
    resetToken: Joi.string().trim().required().messages({
      "string.base": "Reset Token must be string",
      "string.empty": "Reset Token field is required",
      "any.required": "Reset Token field is required"
    }),
    password: Joi.string().trim().min(8).required().messages({
      "string.empty": "Password field is required",
      "string.min": "Password must be atleast 8 character long",
      "any.required": "Password field is required"
    }),
    confirmPassword: Joi.string()
      .trim()
      .equal(Joi.ref("password"))
      .messages({ "any.only": "Password does not Match!" })
  });
  return userSchema.validateAsync(data, { abortEarly: false });
};
