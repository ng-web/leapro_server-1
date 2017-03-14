let express = require('express')
let router = express.Router()
let userHandler = require('../models/user/user')
let security = require('../common/security.js')
let config = require('../config/config.js')
let jwt = require('jsonwebtoken')


router.get("/users/login", function(req, res){
    userHandler.findOneActive(req.query, function(result){
        if(result.data.length > 0){
            //generate salt and hashed password
            let salt = result.data[0].salt;
            let password = security.genertateHash(req.query.password,salt);
           
            if(password.passwordHash != result.data[0].password){
                res.json({code: 401, status: 'error', message: 'invalid username or password', data: ''})
            }else{
                let tokenData = {username:result.data[0].username, userType: result.data[0].type}
                //generate token
                let token = jwt.sign(tokenData, config.secret, {expiresIn : 60*60*12 });
                res.json({code: 200, status: 'success', message: '', data: result.data[0].username, token: token})
            }
           
        }else{ 
          res.json({code: 401, status: 'error', message: 'invalid username or password', data: ''})
        }

    })
})

router.get("/users", function(req, res){
    userHandler.findAll(req, function(result){
        res.json(result)
    })
})

router.post("/users", function(req, res){
    userHandler.exist(req.body, function(response){
        if(response.data.length == 0){
            userHandler.insert(req.body, function(result){
                res.json(result)
            })
        }else{
            res.json({code: 409, status: 'error', message: 'duplicate entry', data: 'Conflict'})
        }
    })    
})

router.post("/users/:id/credential", function(req, res){
    userHandler.updateCredential(req, function(result){
        res.json(result)
    }) 
})

router.post("/users/:id/role", function(req, res){
    userHandler.updateInfo(req, function(result){
        res.json(result)
    }) 
})

router.get("/users/:id", function(req, res){
     userHandler.findOne(req.params, function(result){
        res.json(result)
    })
})

module.exports = router;





