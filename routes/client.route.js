let express = require('express')
let router = express.Router()
let clientHandler = require('../modules/client/client')
let bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({extended: false}))


router.get("/clients", function(req, res){
    clientHandler.findAll(req, function(result){
        res.json(result)
    })
})

router.post("/clients", function(req, res){   
    clientHandler.insert(req.body, function(result){
        res.json(result)
    })
})

router.post("/clients/:id", function(req, res){
    clientHandler.update(req, function(result){
        res.json(result)
    }) 
})

router.get("/clients/:id", function(req, res){
     clientHandler.findOne(req.params, function(result){
        res.json(result)
    })
})

router.get("/clients/:id/companies/", function(req, res){
     clientHandler.company.findAll(req.params, function(result){
        res.json(result)
    })
})

router.post("/ex-clients", function(req, res){  
        if(req.body.customer_type == "C"){
            clientHandler.insertCommercial(req.body, function(result){
                res.json(result)
            })
        }else{
            clientHandler.insertResidential(req.body, function(result){
                res.json(result)
            })
        }
    
})

module.exports = router;





