let express = require('express')
let router = express.Router()
let companyHandler = require('../modules/company/company')
let bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({extended: false}))


router.get("/companies", function(req, res){
    companyHandler.findAll(req, function(result){
        res.json(result)
    })
})

router.post("/companies", function(req, res){   
    companyHandler.exist(req.body, function(result){
        if(result.data.length == 0){
            companyHandler.insert(req.body, function(result){
                res.json(result)
            })
        }
        res.json({code: 409, status: 'error', message: 'duplicate entry', data: 'Conflict'})
    })
})

router.post("/companies/:id", function(req, res){
    companyHandler.update(req, function(result){
        res.json(result)
    }) 
})

router.get("/companies/:id", function(req, res){
     companyHandler.findOne(req.params, function(result){
        res.json(result)
    })
})




module.exports = router;





