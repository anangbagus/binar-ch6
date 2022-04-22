const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const router = require("./router")

const db = require('./config/config')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(router)

app.listen(port, function(){
    console.log(`Server Listening to http://localhost:${port}`)
})

db.sequelize.sync({alter:true})