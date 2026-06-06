const db = require("../config/dbConfig");



// GET ALL FOODS

const getFoods = (req, res) => {

    const sql = `
        SELECT 
            foods.food_no,
            foods.category_id,
            foods.name,
            foods.price,
            foods.image,
            category.name AS category

        FROM foods

        JOIN category
        ON foods.category_id = category.category_id

        ORDER BY foods.category_id, foods.food_no
    `;

    db.query(sql, (err, result) => {

        if (err) {

            return res.status(500).json({
                error: err.message
            });
        }

        res.json(result);
    });
};



// ADD FOOD

const addFood = (req, res) => {

    const {
        category_id,
        name,
        price,
        image
    } = req.body;



    // CHECK DUPLICATE

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



        // GET NEXT FOOD NUMBER INSIDE CATEGORY

        const numberQuery = `
            SELECT IFNULL(MAX(food_no), 0) + 1 AS nextFoodNo
            FROM foods
            WHERE category_id = ?
        `;

        db.query(numberQuery, [category_id], (err, data) => {

            if (err) {

                return res.status(500).json({
                    error: err.message
                });
            }

            const food_no = data[0].nextFoodNo;



            // INSERT FOOD

            const sql = `
                INSERT INTO foods
                (food_no, category_id, name, price, image)

                VALUES (?, ?, ?, ?, ?)
            `;

            db.query(

                sql,

                [
                    food_no,
                    category_id,
                    name,
                    price,
                    image
                ],

                (err, result) => {

                    if (err) {

                        return res.status(500).json({
                            error: err.message
                        });
                    }

                    res.json({
                        message:`✅ ${name} added successfully`
                    });
                }
            );

        });

    });

};



// DELETE FOOD


const deleteFood = (req, res) => {

    const food_no = req.params.id;

    const category_id = req.body.category_id;


    // GET FOOD NAME

    const checkQuery =
    "SELECT name FROM foods WHERE food_no=? AND category_id=?";


    db.query(

        checkQuery,

        [food_no, category_id],

        (err, result) => {

            if (err) {

                return res.status(500).json({
                    error: err.message
                });
            }

            if(result.length === 0){

                return res.json({
                    message: "❌ Food item not found"
                });
            }


            const foodName = result[0].name;


            // DELETE QUERY

            const sql =
            "DELETE FROM foods WHERE food_no=? AND category_id=?";

            db.query(

                sql,

                [food_no, category_id],

                (err, result) => {

                    if (err) {

                        return res.status(500).json({
                            error: err.message
                        });
                    }

                    res.json({
                        message: `✅ ${foodName} deleted successfully`
                    });
                }
            );

        }
    );
};





const updateFood = (req, res) => {

    const food_no = req.params.id;

    const {
        category_id,
        price
    } = req.body;


    // GET FOOD NAME

    const checkQuery =
    "SELECT name FROM foods WHERE food_no=? AND category_id=?";


    db.query(

        checkQuery,

        [food_no, category_id],

        (err, result) => {

            if (err) {

                return res.status(500).json({
                    error: err.message
                });
            }

            if(result.length === 0){

                return res.json({
                    message: "❌ Food item not found"
                });
            }


            const foodName = result[0].name;


            // UPDATE QUERY

            const sql =
            "UPDATE foods SET price=? WHERE food_no=? AND category_id=?";

            db.query(

                sql,

                [
                    price,
                    food_no,
                    category_id
                ],

                (err, result) => {

                    if (err) {

                        return res.status(500).json({
                            error: err.message
                        });
                    }

                    res.json({
                        message: `✅ ${foodName} price updated successfully`
                    });
                }
            );

        }
    );
};




module.exports = {
    getFoods,
    addFood,
    deleteFood,
    updateFood
};