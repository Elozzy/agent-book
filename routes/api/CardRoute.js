const { createCard, getAllCards } = require("../../controller/CardController");
const { isVerified } = require("../../middleware/auth");


const router = require("express").Router();

router.post('/create', isVerified, createCard);
router.get('/all-cards', isVerified, getAllCards)


module.exports = router;

