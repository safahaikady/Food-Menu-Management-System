const express = require("express");

const router = express.Router();

const controller =
require("../controllers/cartController");

router.get("/", controller.getCart);

router.post("/", controller.addToCart);

router.delete("/:id", controller.deleteCartItem);

module.exports = router;