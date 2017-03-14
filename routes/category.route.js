let express = require('express')
let router = express.Router()
let categoryHandler = require('../models/category/category')



router.get("/categories", function(req, res){
    categoryHandler.findAll(req, function(result){
        res.json(result)
    })
})

router.post("/categories", function(req, res){
    categoryHandler.exist(req.body, function(response){
        if(response.data.length == 0){
            categoryHandler.insert(req.body, function(result){
                res.json(result)
            })
        }else{
            res.json({code: 409, status: 'error', message: 'duplicate entry', data: 'Conflict'})
        }
    })    
})

router.post("/categories/:id", function(req, res){
    categoryHandler.update(req, function(result){
        res.json(result)
    }) 
})

router.get("/categories/:id", function(req, res){
     categoryHandler.findOne(req.params, function(result){
        res.json(result)
    })
})

module.exports = router;





