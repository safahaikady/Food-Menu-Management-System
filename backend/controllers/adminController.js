const db = require("../config/dbConfig");


const loginAdmin = (req, res) => {

    const {
        username,
        password
    } = req.body;


    const sql =
    "SELECT * FROM admin WHERE username=? AND password=?";


    db.query(

        sql,

        [username, password],

        (err, result) => {

            if(err){

                return res.status(500).json({
                    error: err.message
                });
            }


            if(result.length > 0){

                res.json({

                    success: true,

                    message: "✅ Login Successful",

                    role: result[0].role
                });
            }

            else{

                res.json({

                    success: false,

                    message: "❌ Invalid Username or Password"
                });
            }

        }
    );
};


module.exports = {
    loginAdmin
};