const connection = require("../models/sqlModel");
const { errorInfo,info } = require("../utils/loggers");



const productsRoute = require("express").Router();

let response = {
    error: false,
    code: "",
    message: ""
    };

let newItem={
    commonName:"", scientistName:"", description:"", price:"", photos:"", type:"", createdBy:""
}



//!Get all products
productsRoute.get("/", (req, res) => {

    const array=[]

    connection.query('SELECT * FROM items',function(err,results,fields){
        if(err){
            errorInfo(err)
            throw err
        } 
        results.forEach(element => {
                array.push(element);
        });
        info(array.length)
        res.json(array)  
    })   
})

//!GET ITEMS CREATED BY A USER
productsRoute.get('/myproducts/:id',(req,res)=>{

const id= req.params.id;

connection.query('SELECT * FROM items WHERE createdBy= ?',[id],function(err,results,fields){
    if(err){
        errorInfo(err); 
        throw err
    }
    res.send(results);
    info(results)
})
})

//! OUTDOOR CATEGORY

productsRoute.get('/outdoor', (req, res) => {

const outdoorArray=[]

    connection.query('SELECT * FROM items WHERE type="Exterior"', function(err,results,fields){
        if(err){
            errorInfo(err)
            throw err

        }
        results.forEach(item =>{
            outdoorArray.push(item)
        })

        info(outdoorArray.length)
        res.json(outdoorArray)
    })
})


//! INDOOR CATEGORY

productsRoute.get('/indoor', (req, res) => {
    info("hi")
    const indoorArray=[]

    connection.query('SELECT * FROM items WHERE type="Interior"', function(err,results,fields){
        if(err){
            errorInfo(err)
            throw err
        }
        results.forEach(item =>{
            indoorArray.push(item)
        })
        info(indoorArray.length)
        res.json(indoorArray)
    })
})



//!SEARCH BY QUERY PARAMS 
productsRoute.get('/shop',(req,res) => {

    const queryParam=req.query.name

    connection.query('SELECT * FROM items WHERE commonName=?',[queryParam],function(err,results,fields){
            if(err){
                errorInfo(err)
                throw err;

            }
            else if (results.length>0){
                info(results[0])
                res.json(results[0])
            } 
    })
})



//!SEARCH BY PARAMS
productsRoute.get('/shop/:name',(req,res)=>{

    const name=req.params.name;

    connection.query('SELECT * FROM items WHERE commonName=?',[name],function(err,results,fields){
        if(err){
            errorInfo(err)
            throw err
        }
             
        else if (results.length >0){
            info(results[0])
            res.json(results[0])
        }
    })
})


//!ADD NEW PRODUCT

productsRoute.post("/",(req,res) => {
    if(!req.body.commonName|| !req.body.scientistName || !req.body.description || !req.body.price || !req.body.photos || !req.body.type || !req.body.createdBy){
        response = {
            error: true,
            code: 502,
            message: 'Los campos son requeridos'
        };
    }else if(req.body.commonName==="" || req.body.scientistName==="" || req.body.description==="" || req.body.price==="" || req.body.photos==="" || req.body.type==="" || req.body.createdBy===""){
        response = {
            error: true,
            code: 503,
            message: 'Algunos campos estan vacios'
        };
    }else{
        newItem={
            commonName:req.body.commonName, scientistName:req.body.scientistName, description:req.body.description, price:req.body.price, photos:req.body.photos, type:req.body.type, createdBy:req.body.createdBy
        } 

        connection.query('INSERT INTO items (commonName,scientistName,description,price,photos,type,createdBy) values (?,?,?,?,?,?,?)',
            [newItem.commonName, newItem.scientistName, newItem.description, newItem.price, newItem.photos, newItem.type,newItem.createdBy],
            function (error,result,fields) {
                if(error){

                    response = {
                        error: true,
                        code: 500,
                        message: error
                    };
                    errorInfo(error)
                }
                else{
                    response = {
                        error: false,
                        code: 200,
                        message: 'Item Creado',
                        respuesta: {newItem: newItem,newRow: result.insertId}}
                    
                    info(response)
                }
            })   
    }

    res.send(response);

})



//!EDIT PRODUCT
productsRoute.put('/:name',(req,res) =>{

    if(!req.body.commonName|| !req.body.scientistName || !req.body.description || !req.body.price  || !req.body.type || !req.body.id){
        response = {
            error: true,
            code: 502,
            message: 'Los campos son requeridos'
        }

    }else if (req.body.commonName===""|| req.body.scientistName==="" || req.body.description==="" || req.body.price===""  || req.body.type==="" || req.body.id===""){
        response = {
            error: true,
            code: 503,
            message: 'Alguno de los campos se encuentra vacio'
        }

    }else{

        newItem={
            commonName:req.body.commonName, scientistName:req.body.scientistName, description:req.body.description, price:req.body.price, type:req.body.type
        }     

        connection.query('UPDATE items SET commonName=?, scientistName=?, description=?, price=?, type=? WHERE id = ?',[newItem.commonName , newItem.scientistName , newItem.description , newItem.price , newItem.type,  req.body.id], function(err, results,fields){
            if(err){

                response={  error: true,
                            code: 500,
                            message: `${err}`}
                errorInfo(err)
            }
            else{
                response = {
                    error: false,
                    code: 200,
                    message: 'Item editado exitosamente'}

                info(results.affectedRows);
            }
        })
    }
    res.send(response);
})

productsRoute.delete('/:name',(req,res) => {
    const productoToDelete=req.params.name;

    if(!productoToDelete){
        response={
            error:true,
            code:502,
            message:"No has seleccionado ningun producto"
        }
    }else{
        connection.query('DELETE FROM items WHERE commonName = ?',[productoToDelete],function(err,results,fields){
            if(err){

                response={
                    error:true,
                    code:500,
                    message:`${err}`
                }
                errorInfo(err)

            }
            else{

                response={
                    error:false,
                    code:200,
                    message:"Borrado elemento: "+ results.affectedRows,
                }
                info(response)

            }
        })
    }
res.send(response)
})


module.exports=productsRoute