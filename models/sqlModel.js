const mysql = require("mysql");
const { PASSWORD, HOST_DB, DATABASE,USER } = require("../utils/config");

const connection =mysql.createConnection({
    host:HOST_DB,
    database:DATABASE,
    user:USER,
    password:PASSWORD
});

module.exports=connection;
