const { Authentication } = require("../services");
const {
  registerValidation,
  loginValidation,
  resetPasswordValidation
} = require("../validation/UserValidation");
const { hasEmptySpace } = require("../utils/helper");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

/**
 * @route POST /v1/signup
 * @desc Account creation
 * @access Public
 */

exports.signup = catchAsyncError(async (req, res, next) => {
  const passwordEmptySpace = hasEmptySpace(req.body.password);
  if (passwordEmptySpace)
    throw new ErrorHandler("Password must not contain empty space", 400);
  const validateData = await registerValidation(req.body);
  const newUser = await Authentication.register(validateData);

  return res.status(201).json({
    success: true,
    newUser,
    message: "Signup successful!"
  });
});

/**
 * @route POST /v1/login
 * @desc Account Authentication
 * @access Public
 */
exports.login = catchAsyncError(async (req, res, next) => {
  const validateData = await loginValidation(req.body);
  const response = await Authentication.login(validateData);

  res.status(200).json(response);
});

/**
 * @route POST v1/password/forgot
 * @desc Forgot password
 * @access Public
 */
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const { token } = await Authentication.passwordRecovery(req.body.email);

  const link = `${process.env.APP_BASE_URL}/auth/reset-password?resetToken=${token}`;

  return res.status(200).json({
    success: true,
    message: "A password reset link has been sent to your mail",
    link
  });
});

/**
 * @route POST /v1/reset-password
 * @desc Reset password
 * @access Public
 */
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const { password, confirmPassword } = req.body;
  const { resetToken } = req.query;

  const passwordEmptySpace = hasEmptySpace(password.trim());
  if (passwordEmptySpace)
    throw new ErrorHandler("Password must not contain empty space", 400);

  const validateData = await resetPasswordValidation({
    resetToken,
    password,
    confirmPassword
  });

  await Authentication.passwordReset(validateData);

  return res.status(200).json({
    success: true,
    message: "Password reset successful"
  });
});
