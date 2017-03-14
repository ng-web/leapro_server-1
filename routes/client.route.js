let express = require('express')
let router = express.Router()
let clientHandler = require('../models/client/client')
let bodyParser = require('body-parser')
let multer = require('multer')

let upload = multer({
  dest: __dirname + '../public/uploads/',
})

router.use(bodyParser.urlencoded({extended: false}))

router.post("/clients/:id/uploadImage", upload.single('upload'), function(req, res){   
    clientHandler.upload(req, function(result){
        res.json(result)
    })
})

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

router.get("/clients/:id/companies/branches", function(req, res){
     clientHandler.company.branch.findAll(req.params, function(result){
        res.json(result)
    })
})

router.get("/clients/:id/companies/branches/areas", function(req, res){
     clientHandler.company.branch.area.findAll(req.params, function(result){
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





