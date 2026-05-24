const db = require("../config/dbConfig");

const getCart = (req, res) => {

    db.query("SELECT * FROM cart", (err, result) => {

        if(err){
            res.json(err);
        }

        else{
            res.json(result);
        }

    });

};

const addToCart = (req, res) => {

    const { food_name, price } = req.body;

    const sql =
    "INSERT INTO cart(food_name,price) VALUES(?,?)";

    db.query(sql, [food_name, price], (err, result) => {

        if(err){
            res.json(err);
        }

        else{

            res.json({
                message:"✅ Added To Cart"
            });

        }

    });

};

const deleteCartItem = (req, res) => {

    const id = req.params.id;

    const sql =
    "DELETE FROM cart WHERE id=?";

    db.query(sql,[id],(err,result)=>{

        if(err){
            res.json(err);
        }

        else{

            res.json({
                message:"✅ Removed From Cart"
            });

        }

    });

};

module.exports = {

    getCart,
    addToCart,
    deleteCartItem

};