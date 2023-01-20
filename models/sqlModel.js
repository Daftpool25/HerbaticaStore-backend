const mysql = require("mysql");

const connection =mysql.createConnection({
    host:"localhost",
    database:"herbatica",
    user:"root",
    password:"Damian26"
});

module.exports=connection;
