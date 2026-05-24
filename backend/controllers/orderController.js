const db = require("../config/dbConfig");

const placeOrder = (req, res) => {

    const { customer_name, items, total } = req.body;

    // Insert into orders table
    const orderQuery =
"INSERT INTO orders(customer_name, total) VALUES(?, ?)";

    db.query(orderQuery, [customer_name, total], (err, orderResult) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        // Get inserted order ID
        const orderId = orderResult.insertId;

        // Prepare order_items values
const values = [];

items.forEach(item => {

    values.push([

        orderId,
        item.name,
        item.price,
        item.quantity
    ]);

});

const itemQuery =
`INSERT INTO order_items
(order_id, food_name, price, quantity)
VALUES ?`;

db.query(itemQuery, [values], (err2, result2) => {

            if (err2) {

                return res.status(500).json({
                    error: err2.message
                });
            }

            res.json({
                message: "✅ Order placed successfully"
            });

        });

    });

};

module.exports = {
    placeOrder
};