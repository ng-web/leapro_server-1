let express = require('express')
let router = express.Router()
let serviceHandler = require('../models/service/service')
let bodyParser = require('body-parser')
let serviceValidator = require('../models/service/service.validator')

router.use(bodyParser.urlencoded({extended: false}))


router.get("/services", function(req, res){
    serviceHandler.findAll(req, function(result){
        res.json(result)
    })
})

router.post("/services", serviceValidator.checkRequest,function(req, res){
    serviceHandler.exist(req.body, function(response){
        if(response.data.length == 0){
            serviceHandler.insert(req.body, function(result){
               res.json(result)
            })
        }else{
            res.json({code: 409, status: 'error', message: 'duplicate entry', data: 'Conflict'})
        }
    })    
})

router.post("/services/:id", serviceValidator.checkRequest,function(req, res){
    serviceHandler.update(req, function(result){
        res.json(result)
    }) 
})

router.get("/services/:id", function(req, res){
     serviceHandler.findOne(req.params, function(result){
        res.json(result)
    })
})

module.exports = router;





