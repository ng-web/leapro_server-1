let express = require('express')
let router = express.Router()
let jobHandler = require('../models/job/job')
let bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: false }))

router.post("/jobs/create", function (req, res) {
    if (req.body.customer_type == "C") {
        jobHandler.commercial.insertCommercial(req.body, function (result) {
            res.json(result)
        })
    } else {
        jobHandler.residential.insertResidential(req.body, function (result) {
            res.json(result)
        })
    }
})

router.get("/jobs", function (req, res) {
    jobHandler.findAll(req, function (result) {
        res.json(result)
    })
})

router.post("/jobs", function (req, res) {
    jobHandler.insert(req.body, function (result) {
        res.json(result)
    })
})

router.post("/jobs/:id", function (req, res) {
    jobHandler.update(req, function (result) {
        res.json(result)
    })
})

router.get("/jobs/:id", function (req, res) {
    jobHandler.findOne(req.params, function (result) {
        res.json(result)
    })
})


//TODO: test route
router.get("/jobs/:id/products", function (req, res) {
    jobHandler.area.products.findAll(req.params, function (result) {
        res.json(result)
    })
})

//TODO: test route
router.get("/jobs/:id/services", function (req, res) {
    jobHandler.services.findAll(req.params, function (result) {
        res.json(result)
    })
})


module.exports = router





