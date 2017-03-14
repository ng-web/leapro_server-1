let express = require('express')
let router = express.Router()
let bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({extended: false}))

router.use(require('./branch.route'))
router.use(require('./client.route'))
router.use(require('./company.route'))
router.use(require('./category.route'))
router.use(require('./campaign.route'))
router.use(require('./service.route'))
router.use(require('./product.route'))
router.use(require('./user.route'))

module.exports = router;
