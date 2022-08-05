const mysql = require('mysql')
const dotenv = require('dotenv')

const express = require('express')
// const express = require('express')
const app = express();

dotenv.config({ path: './.env' })
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})


db.connect((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('My Sql connected...')
    }
})

var id, result;
var a = db.query('select id from taikhoan where id=1 ', (err, result) => {
    if (err) {
        console.log(err)
    } else {
        console.log(result[0].id)
        console.log(typeof (result[0]))
    }
})

// db.query('select id from taikhoan where id=1')

// app.use(function (req, res, next) {
//     console.log('Time:', Date.now())
//     next()
// })

// app.get('/', (req, res) => {
//     // alert('Hello')
//     res.send('Hello')
// })

// app.use('/user/:id', function (req, res, next) {
//     console.log('Request Type:', req.method)
//     next()
// })

// // app.get('/user/:id', function (req, res, next) {
// //     res.send('USER')
// // })

// app.get('/user/:id', function (req, res, next) {
//     // if the user ID is 0, skip to the next route
//     if (req.params.id === '0') next('route')
//     // otherwise pass the control to the next middleware function in this stack
//     else next()
// }, function (req, res, next) {
//     // render a regular page
//     res.render('regular')
// })

// handler for the /user/:id path, which renders a special page
// app.get('/user/:id', function (req, res, next) {
//     res.render('special')
// })

// app.use('/user/:id', function (req, res, next) {
//     console.log('Request URL:', req.originalUrl)
//     next()
// }, function (req, res, next) {
//     console.log('Request Type:', req.method)
//     next()
// })

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})
app.listen(3000, () => {
    console.log('Success')
})