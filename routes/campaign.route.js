let express = require('express')
let router = express.Router()
let campaignHandler = require('../modules/campaign/campaign')



router.get("/campaigns", function(req, res){
    campaignHandler.findAll(req, function(result){
        res.json(result)
    })
})

router.post("/campaigns", function(req, res){
    campaignHandler.exist(req.body, function(response){
        if(response.data.length == 0){
            campaignHandler.insert(req.body, function(result){
                res.json(result)
            })
        }else{
            res.json({code: 409, status: 'error', message: 'duplicate entry', data: 'Conflict'})
        }
    })    
})

router.post("/campaigns/:id", function(req, res){
    campaignHandler.update(req, function(result){
        res.json(result)
    }) 
})

router.get("/campaigns/:id", function(req, res){
     campaignHandler.findOne(req.params, function(result){
        res.json(result)
    })
})

module.exports = router;





