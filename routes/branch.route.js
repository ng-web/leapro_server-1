let express = require('express')
let router = express.Router()
let branchHandler = require('../modules/branch/branch')



router.get("/branches", function(req, res){
    branchHandler.findAll(req, function(result){
        res.json(result)
    })
})

router.post("/branches", function(req, res){
    branchHandler.exist(req.body, function(response){
        if(response.data.length == 0){
            branchHandler.insert(req.body, function(result){
                res.json(result)
            })
        }else{
            res.json({code: 409, status: 'error', message: 'duplicate entry', data: 'Conflict'})
        }
    })    
})

router.post("/branches/:id", function(req, res){
    branchHandler.update(req, function(result){
        res.json(result)
    }) 
})

router.get("/branches/:id", function(req, res){
     branchHandler.findOne(req.params, function(result){
        res.json(result)
    })
})

module.exports = router;





