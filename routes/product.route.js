let express = require('express')
let router = express.Router()
let productHandler = require('../modules/product/product')

let bodyParser = require('body-parser')
let serviceValidator = require('../modules/service/service.validator')

router.use(bodyParser.urlencoded({extended: false}))

router.get("/products", function(req, res){
    productHandler.findAll(req, function(result){
        res.json(result)
    })
})

router.post("/products", function(req, res){
    productHandler.exist(req.body, function(response){
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





