const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const config = require("./utils/config");
const usersRoute = require("./controllers/users");
const connection = require("./models/sqlModel");
const productsRoute = require("./controllers/products");



//MIDLLEWARE
const app= express();
app.user(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use('/API/users',usersRoute)
app.use('/API',productsRoute)




//DATABASE
connection.connect(function(err){
    if(err){
        console.error('Error de conexion: ' + err.stack);
        return;
    }
    console.log('Conectado con el identificador ' + connection.threadId);

})


//!LISTENING
app.listen(config.PORT, () => {
    console.log("Server is listening")
})



