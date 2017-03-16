let express = require('express')
let bodyParser = require('body-parser')
let cors = require('cors')
let app = express()

app.use('/crm/api/v1/', require('./routes/routes'))

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.listen(3000, function(){
   console.log("listening on port 3000");
})