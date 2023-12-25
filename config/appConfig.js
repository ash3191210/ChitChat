const express= require('express');
const bodyParser = require('body-parser');
const router = require('../routes/primary')
const app = express()

app.set('view engine','ejs');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/',router)
app.use(express.static('./public'))
module.exports = app