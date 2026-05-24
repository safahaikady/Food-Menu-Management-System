const express = require("express");

const router = express.Router();

const {
    getFoods,
    addFood,
    deleteFood,
    updateFood
} = require("../controllers/foodController");

router.get("/", getFoods);

router.post("/", addFood);
router.delete("/:id", deleteFood);
router.put("/:id", updateFood);

module.exports = router;