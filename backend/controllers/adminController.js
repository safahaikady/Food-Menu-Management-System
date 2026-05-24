const db = require("../config/dbConfig");

const login = (req, res) => {

    console.log(req.body);

    const username = req.body.username;
    const password = req.body.password;

    const sql =
    "SELECT * FROM admins WHERE username=? AND password=?";

    db.query(sql, [username, password], (err, result) => {

        if(err){

            console.log(err);

            res.status(500).json({
                success:false,
                message:"Server Error"
            });

        }

        else{

            console.log(result);

            if(result.length > 0){

                res.json({
                    success:true,
                    message:"✅ Login Successful"
                });

            }

            else{

                res.json({
                    success:false,
                    message:"❌ Invalid Username or Password"
                });

            }

        }

    });

};

module.exports = {
    login
};