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

router.delete("/:name", deleteFood);

router.put("/:name", updateFood);

module.exports = router;