const Food = require("../models/Food");

const getFoods = async (req, res) => {

    try {

        const foods = await Food.find();

        res.json(foods);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const addFood = async (req, res) => {

    try {

        const newFood = new Food(req.body);

        await newFood.save();

        res.json({
            message: "Food Added Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    getFoods,
    addFood
};