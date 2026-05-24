const db = require("../config/dbConfig");

// GET all foods
const getFoods = (req, res) => {

    db.query("SELECT * FROM foods", (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json(result);
    });
};

// ADD food
const addFood = (req, res) => {

    const { name, price, image } = req.body;

    // Check if item already exists
    const checkQuery =
        "SELECT * FROM foods WHERE LOWER(name)=LOWER(?)";

    db.query(checkQuery, [name], (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        if (result.length > 0) {

            return res.json({
                message: "❌ Item already exists"
            });
        }

        const sql =
            "INSERT INTO foods (name, price, image) VALUES (?, ?, ?)";

        db.query(sql, [name, price, image], (err, result) => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.json({
                message: "✅ Item added successfully"
            });

        });

    });

};

// DELETE food using ID
const deleteFood = (req, res) => {

    const id = req.params.id;

    const checkQuery =
        "SELECT * FROM foods WHERE id=?";

    db.query(checkQuery, [id], (err, result) => {

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
            "DELETE FROM foods WHERE id=?";

        db.query(sql, [id], (err, result) => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.json({
                message: "✅ Item deleted successfully"
            });

        });

    });

};

// UPDATE food price using ID
const updateFood = (req, res) => {

    const id = req.params.id;

    const { price } = req.body;

    const checkQuery =
        "SELECT * FROM foods WHERE id=?";

    db.query(checkQuery, [id], (err, result) => {

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
            "UPDATE foods SET price=? WHERE id=?";

        db.query(sql, [price, id], (err, result) => {

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