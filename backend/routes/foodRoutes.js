const express = require("express");

const router = express.Router();

const {

    getFoods,
    addFood

} = require("../controllers/foodController");


// GET ALL FOODS
router.get("/", getFoods);


// ADD FOOD
router.post("/", addFood);

module.exports = router;