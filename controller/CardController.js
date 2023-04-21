const catchAsyncError = require("../middleware/catchAsyncError");
const { Card } = require("../services");
const { CardValidation } = require("../validation/CardValidation");

/**
 * @route POST v1/card/create
 * @desc create a card
 * @access Private
 */
exports.createCard = catchAsyncError(async (req, res, next) => {
  const validatedData = await CardValidation(req.body);
  await Card.create(validatedData, req.user.id);

  res.status(201).json({
    success: true,
    message: "card created successfully"
  });
});

/**
 * @route Get /v1/cards
 * @des Get all course
 * @access Private
 */

exports.getAllCards = catchAsyncError(async (req, res, next) => {
  const cards = await Card.findAllCards();

  return res.status(200).json({
    success: true,
    data: cards
  });
});
