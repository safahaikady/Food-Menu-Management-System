const db = require("../config/dbConfig");

const placeOrder = (req, res) => {

    const { cart, total } = req.body;

    const orderSql =
    "INSERT INTO orders(total) VALUES(?)";

    db.query(orderSql,[total],(err,result)=>{

        if(err){
            res.json(err);
        }

        else{

            const orderId = result.insertId;

            cart.forEach(item => {

                const itemSql =
                "INSERT INTO order_items(order_id,food_name,price) VALUES(?,?,?)";

                db.query(itemSql,[

                    orderId,
                    item.name,
                    item.price

                ]);

            });

            db.query("DELETE FROM cart");

            res.json({
                message:"✅ Order Placed"
            });

        }

    });

};

module.exports = {
    placeOrder
};