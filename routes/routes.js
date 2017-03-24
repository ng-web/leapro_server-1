let express = require('express')
let router = express.Router()
let bodyParser = require('body-parser')
let config = require('../config/config.js')
let jwt = require('jsonwebtoken')

router.use(bodyParser.urlencoded({
    extended: false
}));
router.use(bodyParser.json());
/*
// route middleware to verify a token
router.use(function(req, res, next) {
   var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) {
        return res.json({ code: 401, status:'fail', message: 'Failed to authenticate token.', data:'' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {
    return res.json({ code: 403, status: 'error', message: 'No token provided.',data:''});
  }
});
*/

router.use(require('./branch.route'))
router.use(require('./client.route'))
router.use(require('./company.route'))
router.use(require('./category.route'))
router.use(require('./campaign.route'))
router.use(require('./job.route'))
router.use(require('./service.route'))
router.use(require('./product.route'))
router.use(require('./user.route'))

module.exports = router;


