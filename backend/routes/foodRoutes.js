const express = require("express");
const router = express.Router();

const controller = require("../controllers/foodController");

router.get("/", controller.getFoods);
router.post("/", controller.addFood);
router.delete("/:id", controller.deleteFood);
router.put("/:id", controller.updateFood);

module.exports = router;