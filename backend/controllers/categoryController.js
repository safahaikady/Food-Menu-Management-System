const db = require("../config/dbConfig");

exports.getCategories = (req,res)=>{

    db.query(
        "SELECT * FROM category",

        (err,result)=>{
            if(err) res.send(err);
            else res.json(result);
        }
    );
};

exports.addCategory = (req,res)=>{

    const {name,description} = req.body;

    db.query(
        "INSERT INTO category(name,description) VALUES(?,?)",

        [name,description],

        (err,result)=>{
            if(err) res.send(err);
            else res.json(result);
        }
    );
};