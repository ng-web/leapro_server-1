let express = require('express')
let router = express.Router()
let productHandler = require('../models/product/product')


let serviceValidator = require('../models/service/service.validator')


router.get("/products", function(req, res){
    productHandler.findAll(req, function(result){
        res.json(result)
    })
})

router.post("/products", function(req, res){
    productHandler.exist(req.body, function(response){
        console.log(req);
        if(response.data.length == 0){
            productHandler.insert(req.body, function(result){
                res.json(result)
            })
        }else{
            res.json({code: 409, status: 'error', message: 'duplicate entry', data: 'Conflict'})
        }
    })    
})

router.post("/products/:id", function(req, res){
    productHandler.update(req, function(result){
        res.json(result)
    }) 
})

router.get("/products/:id", function(req, res){
     productHandler.findOne(req.params, function(result){
        res.json(result)
    })
})

module.exports = router;





