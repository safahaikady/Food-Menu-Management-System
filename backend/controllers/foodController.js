const db = require("../config/dbConfig");

// GET all foods
const getFoods = (req, res) => {
    db.query("SELECT * FROM foods", (err, result) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.json(result);
        }
    });
};

// ADD food
const addFood = (req, res) => {

    const { name, price, image } = req.body;

    // Check if item already exists
    const checkQuery = "SELECT * FROM foods WHERE name = ?";

    db.query(checkQuery, [name], (err, result) => {

        if (result.length > 0) {
            return res.json({
                message: "❌ Item already exists"
            });
        }

        const sql =
            "INSERT INTO foods (name, price, image) VALUES (?, ?, ?)";

        db.query(sql, [name, price, image], (err, result) => {

            if (err) {
                res.status(500).json({ error: err });
            } else {
                res.json({
                    message: "✅ Item added successfully"
                });
            }
        });
    });
};

const deleteFood = (req, res) => {

    const name = req.params.name;

    const checkQuery = "SELECT * FROM foods WHERE LOWER(name) = LOWER(?)";

    db.query(checkQuery, [name], (err, result) => {

        if (err) return res.status(500).json({ error: err.message });

        if (result.length === 0) {
            return res.json({ message: "❌ Item not found" });
        }

        const sql = "DELETE FROM foods WHERE LOWER(name) = LOWER(?)";

        db.query(sql, [name], (err) => {

            if (err) return res.status(500).json({ error: err.message });

            res.json({ message: "✅ Item deleted successfully" });
        });
    });
};

// UPDATE food by name
// UPDATE PRICE
const updateFood = (req, res) => {

    console.log(req.params);
    console.log(req.body);

    const foodName = req.params.name;

    const price = req.body.price;

    const checkQuery =
        "SELECT * FROM foods WHERE LOWER(name)=LOWER(?)";

    db.query(checkQuery, [foodName], (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        if (result.length === 0) {
            return res.json({
                message: "❌ Item not found"
            });
        }

        const sql =
            "UPDATE foods SET price=? WHERE LOWER(name)=LOWER(?)";

        db.query(sql, [price, foodName], (err, result) => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.json({
                message: "✅ Price updated successfully"
            });

        });

    });

};
module.exports = {
    getFoods,
    addFood,
    deleteFood,
    updateFood
};