const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const config = require("./utils/config");

//TODO separar en modulos, agregar la verificación de campos
//TODO corregir el ingles y los codigos
//TODO no pueda registrar usuarios repetidos
//TODO editar el get params query y que ademas el TOken se origine a partir de email no de id
//TODO agregar nuevos campos en los posts y en los modelos de items
//a veces buscar por id y no por name
//organizar las urls, si puedes meterlas varias dentro de una


//MIDLLEWARE
const app= express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const conection =mysql.createConnection({
    host:"localhost",
    database:"herbatica",
    user:"root",
    password:"Damian26"
});



//Data

let response = {
    error: false,
    codigo: "",
    mensaje: ""
    };

let newItem={
    commonName:"", scientistName:"", description:"", price:"", photos:"", type:"", createdBy:""
}

let newUser={
    name:"",lastName:"",phone:"",email:"",password:""
}



//!DATABASE
conection.connect(function(err){
    if(err){
        console.error('Error de conexion: ' + err.stack);
        return;
    }
    console.log('Conectado con el identificador ' + conection.threadId);

})

//!API REST GET

//ROOT
app.get("/API", (req, res) => {

        const array=[]
    
        conection.query('SELECT * FROM items',function(err,results,fields){
            if(err){
                throw err
            } 
            results.forEach(element => {
                    array.push(element);
            });
            res.json(array)  
        })   
})

//GET ITEMS CREATED BY
app.get('/API/misProductos/:id',(req,res)=>{
    const id= req.params.id;
    conection.query('SELECT * FROM items WHERE createdBy= ?',[id],function(err,results,fields){
        if(err){throw err}
        res.send(results);
        console.log(results)
    })
})

//CATEGORIA EXTERIOR
app.get("/API/exterior", (req, res) => {

    const arrayExterior=[]

    conection.query('SELECT * FROM items WHERE type="Exterior"', function(err,results,fields){
        if(err){
            throw err
        }
        results.forEach(item =>{
            arrayExterior.push(item)
        })
        res.json(arrayExterior)
    })
})

//CATEGORIA INTERIOR
app.get("/API/interior", (req, res) => {
    const arrayInterior=[]

    conection.query('SELECT * FROM items WHERE type="Interior"', function(err,results,fields){
        if(err){
            throw err
        }
        results.forEach(item =>{
            arrayInterior.push(item)
        })
        res.json(arrayInterior)
    })
})

//!SEARCH BY QUERY PARAMS 
app.get('/API/shop',(req,res) => {

    const queryParam=req.query.name

    conection.query('SELECT * FROM items WHERE commonName=?',[queryParam],function(err,results,fields){
            if(err){
                throw err;
            }
            else if (results.length>0){
                res.json(results[0])
                console.log(results[0])
            } 
    })
})

//!SEARCH BY PARAMS
app.get('/API/shop/:name',(req,res)=>{
    const name=req.params.name;
    conection.query('SELECT * FROM items WHERE commonName=?',[name],function(err,results,fields){
        if(err){ throw err}
        else if (results.length >0){
            res.json(results[0])
        }
    })
})


//!AGREGAR NUEVO ELEMENTO

app.post("/API",(req,res) => {
    if(!req.body.commonName|| !req.body.scientistName || !req.body.description || !req.body.price || !req.body.photos || !req.body.type || !req.body.createdBy){
        response = {
            error: true,
            codigo: 502,
            mensaje: 'Los campos son requeridos'
           };
    }else if(req.body.commonName==="" || req.body.scientistName==="" || req.body.description==="" || req.body.price==="" || req.body.photos==="" || req.body.type==="" || req.body.createdBy===""){
        response = {
            error: true,
            codigo: 503,
            mensaje: 'Algunos campos estan vacios'
           };
    }else{
        newItem={
            commonName:req.body.commonName, scientistName:req.body.scientistName, description:req.body.description, price:req.body.price, photos:req.body.photos, type:req.body.type, createdBy:req.body.createdBy
        } 

        conection.query('INSERT INTO items (commonName,scientistName,description,price,photos,type,createdBy) values (?,?,?,?,?,?,?)',
            [newItem.commonName, newItem.scientistName, newItem.description, newItem.price, newItem.photos, newItem.type,newItem.createdBy],
            function (error,result,fields) {
                if(error){
                    response = {
                        error: true,
                        codigo: 500,
                        mensaje: error
                       };
                }
                else{
                    response = {
                        error: false,
                        codigo: 200,
                        mensaje: 'Item Creado',
                        respuesta: {newItem: newItem,newRow: result.insertId}}
                    
                }
            })   
    }
    console.log(req.body)
    console.log(response)
    res.send(response);

})

//!EDIT PRODUCT
app.put('/API/:name',(req,res) =>{
    
   if(!req.body.commonName|| !req.body.scientistName || !req.body.description || !req.body.price  || !req.body.type || !req.body.id){
        response = {
            error: true,
            codigo: 502,
            mensaje: 'Los campos son requeridos'
           };
        console.log(response)
    }else if (req.body.commonName===""|| req.body.scientistName==="" || req.body.description==="" || req.body.price===""  || req.body.type==="" || req.body.id===""){
        response = {
            error: true,
            codigo: 503,
            mensaje: 'Alguno de los campos se encuentra vacio'
        };
    }else{

        newItem={
            commonName:req.body.commonName, scientistName:req.body.scientistName, description:req.body.description, price:req.body.price, type:req.body.type
        }     

        conection.query('UPDATE items SET commonName=?, scientistName=?, description=?, price=?, type=? WHERE id = ?',[newItem.commonName , newItem.scientistName , newItem.description , newItem.price , newItem.type,  req.body.id], function(err, results,fields){
            if(err){

                response={  error: true,
                            codigo: 500,
                            mensaje: `${err}`}
            }
            else{
                response = {
                    error: false,
                    codigo: 200,
                    mensaje: 'Item editado exitosamente'}

                console.log(results.affectedRows);
            }
        })
    }
    res.send(response);
})

app.delete('/API/:name',(req,res) => {
    const productoToDelete=req.params.name;
    
    if(!productoToDelete){
        response={
            error:true,
            code:502,
            mensaje:"No has seleccionado ningun producto"
        }
    }else{
        conection.query('DELETE FROM items WHERE commonName = ?',[productoToDelete],function(err,results,fields){
            if(err){
                response={
                    error:true,
                    code:500,
                    mensaje:`${err}`
                }
            }
            else{
                response={
                    error:false,
                    code:200,
                    mensaje:"Borrado elemento: "+ results.affectedRows,
                }
            }
        })
    }
    res.send(response)
})








//!USERS TABLE
//LOGIN
app.post("/API/users", (req,res) =>{
    console.log(req.body)
    if(!req.body.email || !req.body.password){
        response={
            error:true,
            codigo:"502",
            mensaje:"Campos inexistentes"
        }
        res.send(response)

    }
    else if(req.body.email==="" || req.body.password===""){
        response={
            error:true,
            codigo:"503",
            mensaje:"Campos vacios"
        }
        res.send(response)

    } else{

        conection.query('SELECT * FROM usersTable WHERE email = ?',[req.body.email], function(error,results,fields){
            if(error){
                response={
                    error:true,
                    codigo:500,
                    mensaje:error
                }
                res.send(response)

            }else{
                
                if(results.length >0){
                    currentUser={
                        name:results[0].name,
                        id:results[0].id
                    };
                    const token = jwt.sign(currentUser, config.SECRET);
                    
                    response={
                        error:false,
                        codigo:200,
                        mensaje:"Login Exitoso",
                        response:{quanty:results,token:token}
                    }
                    res.send(response)
                    console.log(response.response.quanty.length)

                }else{
                    response={
                        error:true,
                        codigo:300,
                        mensaje:"Usuario inexistente",
                    }
                    res.send(response)

                }
                
            }
        })
       
    }
})


//!AUTH alreay logged user 
const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
}

app.get("/API/users/token", (req,res) =>{

    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, config.SECRET);

    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }else{
        conection.query('SELECT * FROM usersTable WHERE id = ?',[decodedToken.id],function(err,results,fields){
            if(err){
                throw err
            }else{
                res.send(results)
                console.log(results)
            }
        })
    }


})

//! REGISTER
app.post('/API/usersTable',(req,res) =>{
    if(!req.body.name || !req.body.lastName || !req.body.phone || !req.body.email || !req.body.password || !req.body.profilePhoto || !req.body.country || !req.body.state || !req.body.address){
        
        response={
            error:true,
            codigo:502,
            mensaje:"No existen los datos"
        }
        res.send(response)

    }else if(req.body.name==="" || req.body.lastName==="" || req.body.phone==="" || req.body.email==="" || req.body.password==="" || req.body.profilePhoto==="" || req.body.country==="" || req.body.state==="" || req.body.address===""){
        
        response={
            error:true,
            codigo:503,
            mensaje:"Campos vacios"
        }
        res.send(response)
    }
    else{
        newUser={name:req.body.name, lastName:req.body.lastName, phone:req.body.phone, email:req.body.email, password:req.body.password, profilePhoto:req.body.profilePhoto, country:req.body.country, state:req.body.state, address:req.body.address}

        conection.query('INSERT INTO usersTable (name,lastName,phone,email,password,profilePhoto,country,state,address) values (?,?,?,?,?,?,?,?,?)',[newUser.name ,newUser.lastName ,newUser.phone ,newUser.email ,newUser.password, newUser.profilePhoto, newUser.country, newUser.state, newUser.address],function(error,results,fields){

            if(error){ 
                response={
                    error:true,
                    codigo:500,
                    mensaje:error
                }
                res.send(response)
            }
            else{
                response={
                    error:false,
                    codigo:200,
                    mensaje:"Usuario creado con exito",
                    respuesta:newUser
                }
                console.log(results.insertId)
                res.send(response)

            }
        })

    }
})


//!DELETE USER
app.delete('/API/usersTable/:id',(req,res) =>{
    const idToDelete= req.params.id

    if(!idToDelete){
        response={
            error:true,
            codigo:502,
            mensaje:"Error: Usuario no existe"
        }
        res.send(response)
        console.log("caso1")

    }else{

        conection.query('DELETE FROM usersTable WHERE id = ?',[idToDelete],function(err,results,fields){
            if(err){ 
                response={
                    error:true,
                    codigo:500,
                    mensaje:`${err}`
                }
                    res.send(response)
                    console.log("caso2")

            }
            else{
                response={
                    error:false,
                    codigo:200,
                    mensaje:"Eliminado con éxito"
                }
                console.log(results.affectedRows)
                res.send(response)
                console.log("caso3")


            }
        })
    }
})

//!STRIPE
const stripe = require('stripe')('sk_test_CGGvfNiIPwLXiDwaOfZ3oX6Y');

//No se a que dominio se refiere y si hay que usar static:
const YOUR_DOMAIN = 'http://localhost:3000/carrito';

//Llamada
app.post('/API/create-checkout-session', async (req, res) => {
    console.log("entro")
    console.log(req.body)

    const productsList=req.body;
    let array=[]

    productsList.map( item => 
            array.push({
            price_data: {
                currency: 'usd',
                product_data: {
                  name: item.name,
                },
                unit_amount: item.price*100,
              },
              quantity: item.quanty,
            })
    )
    console.log(array)

    const session = await stripe.checkout.sessions.create({
      line_items: array,
      mode: 'payment',

      //Son urls del backend o del frontend?
      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });
    console.log("hola")
    console.log(session)
    res.send({url: session.url});
  });





//!LISTENING
app.listen(config.PORT, () => {
    console.log("Server is listening")
})

