const { errorInfo, info } = require('../utils/loggers');
const jwt = require('jsonwebtoken');
const config = require("../utils/config");
const connection = require('../models/sqlModel');


let usersRoute =require('express').Router();

let response = {
    error: false,
    code: "",
    message: ""
    };

let newUser={
    name:"",lastName:"",phone:"",email:"",password:""
}

//!USERS TABLE
//LOGIN
usersRoute.post("/", (req,res) =>{
    console.log(req.body)
    if(!req.body.email || !req.body.password){

        response={
            error:true,
            code:"502",
            message:"Campos inexistentes"
        }

        res.send(response)

    }
    else if(req.body.email==="" || req.body.password===""){

        response={
            error:true,
            code:"503",
            message:"Campos vacios"
        }
        res.send(response)

    } else{

        connection.query('SELECT * FROM usersTable WHERE email = ?',[req.body.email], function(error,results,fields){
            if(error){

                response={
                    error:true,
                    code:500,
                    message:error
                }
                info(response);
                res.send(response);

            }else{

                if(results.length >0){

                    let currentUser={
                        name:results[0].name,
                        id:results[0].id
                    };

                    const token = jwt.sign(currentUser, config.SECRET);
                    
                    response={
                        error:false,
                        code:200,
                        message:"Login Exitoso",
                        response:{quanty:results,token:token}
                    }

                    res.send(response)
                    info(response.response.quanty.length)

                }else{

                    response={
                        error:true,
                        code:300,
                        message:"Usuario inexistente",
                    }

                    info("Usuario inexistente")
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

usersRoute.get("/token", (req,res) =>{

    let token = getTokenFrom(req);
    let decodedToken = jwt.verify(token, config.SECRET);

    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
        
    }else{
        connection.query('SELECT * FROM usersTable WHERE id = ?',[decodedToken.id],function(err,results,fields){
            if(err){
                errorInfo(err)
            }else{
                info(results)
                res.send(results)
            }
        })
    }


})

//! REGISTER
usersRoute.post('/usersList',(req,res) =>{
    if(!req.body.name || !req.body.lastName || !req.body.phone || !req.body.email || !req.body.password || !req.body.profilePhoto || !req.body.country || !req.body.state || !req.body.address){
        
        response={
            error:true,
            code:502,
            message:"No existen los datos"
        }
        res.send(response)

    }else if(req.body.name==="" || req.body.lastName==="" || req.body.phone==="" || req.body.email==="" || req.body.password==="" || req.body.profilePhoto==="" || req.body.country==="" || req.body.state==="" || req.body.address===""){
        
        response={
            error:true,
            code:503,
            message:"Campos vacios"
        }
        res.send(response)
    }
    else{
        newUser={name:req.body.name, lastName:req.body.lastName, phone:req.body.phone, email:req.body.email, password:req.body.password, profilePhoto:req.body.profilePhoto, country:req.body.country, state:req.body.state, address:req.body.address}

        connection.query('INSERT INTO usersTable (name,lastName,phone,email,password,profilePhoto,country,state,address) values (?,?,?,?,?,?,?,?,?)',[newUser.name ,newUser.lastName ,newUser.phone ,newUser.email ,newUser.password, newUser.profilePhoto, newUser.country, newUser.state, newUser.address],function(error,results,fields){

            if(error){ 

                response={
                    error:true,
                    code:500,
                    message:error
                }
                errorInfo(error)
                res.send(response)
            }
            else{

                response={
                    error:false,
                    code:200,
                    message:"Usuario creado con exito",
                    respuesta:newUser
                }
                info(results.insertId)
                res.send(response)

            }
        })

    }
})


//!DELETE USER
usersRoute.delete('/:id',(req,res) =>{
    const idToDelete= req.params.id

    info("id:")
    info(idToDelete)


    if(!idToDelete){
        response={
            error:true,
            code:502,
            message:"Error: Usuario no existe"
        }
        info(response)
        res.send(response)

    } else if  (idToDelete===undefined){
        response={
            error:true,
            code:500,
            message:"Error del servidor"
        }
        info(response)
        res.send(response)
    }else{

        connection.query('DELETE FROM usersTable WHERE id = ?',[idToDelete],function(err,results,fields){
            if(err){ 

                response={
                    error:true,
                    code:500,
                    message:`${err}`
                }
                    
                info(response)
                res.send(response)

            }
            else{

                response={
                    error:false,
                    code:200,
                    message:"Eliminado con éxito"
                }
                info(results.affectedRows)
                info(response)
                res.send(response)

            }
        })
    }
})

module.exports=usersRoute;