const menu = require("../data/menuData");

// GET all foods
const getFoods = (req, res) => {
    res.json(menu);
};

// ADD food
const addFood = (req, res) => {
    const newFood = {
        id: Date.now(),
        name: req.body.name,
        price: req.body.price,
        image: req.body.image
    };

    menu.push(newFood);
    
    res.json({
    message: "✅ Item is added to menu",
    item: newFood
});
};

// DELETE food
const deleteFood = (req, res) => {
    const id = parseInt(req.params.id);
    const index = menu.findIndex(item => item.id === id);

    if (index !== -1) {
        menu.splice(index, 1);
        res.json({ message: "✅ Item deleted successfully"});
    } else {
        res.status(404).json({ error: "❌ Item not found" });
    }
};

// UPDATE food
const updateFood = (req, res) => {
    const id = parseInt(req.params.id);
    const item = menu.find(f => f.id === id);

    if (item) {
        item.name = req.body.name || item.name;
        item.price = req.body.price || item.price;
        item.image = req.body.image || item.image;
         res.json({
            message: "✅ Item updated successfully",
            item: item
        });

        
    } else {
        res.status(404).json({
            message: "❌ Item not found"
        });
    }
};

module.exports = {
    getFoods,
    addFood,
    deleteFood,
    updateFood
};