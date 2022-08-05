const mysql = require('mysql')
const dotenv = require('dotenv')
dotenv.config({ path: '../.env' })
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})
console.log(process.env.DATABASE_HOST)
db.connect((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('My Sql connected...')
    }
})

module.exports = db