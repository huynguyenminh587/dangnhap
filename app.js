const express = require('express')
const path = require('path')
const mysql = require('mysql')
const dotenv = require('dotenv')

dotenv.config({ path: './.env' })
// dotenv.config()
const app = express();
const db = require('./common/connect')
// const db = mysql.createConnection({
//     host: process.env.DATABASE_HOST,
//     user: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE
// })


const publicDirectory = path.join(__dirname, './public')
app.use(express.static(publicDirectory))

//Parse URl-encoded bodies (as send by html form)
app.use(express.urlencoded({ extended: false }))
// Parse json bodies(as sent by API Client)
app.use(express.json())

app.set('view engine', 'hbs')
// db.connect((err) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log('My Sql connected...')
//     }
// })


//Define router

app.use('/', require('./routes/pages.js'))
app.use('/auth', require('./routes/auth.js'))

app.listen(3000, () => {
    console.log('Server started on Port 3000')
})