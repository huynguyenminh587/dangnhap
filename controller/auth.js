
// const mysql = require('mysql')
// const db = mysql.createConnection({
//     host: process.env.DATABASE_HOST,
//     user: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE
// })
const db = require('../common/connect')

exports.register = (req, res) => {
    // console.log(req.body)

    const username = req.body.username
    const password = req.body.password
    const confirmpassword = req.body.confirmpassword
    const fullname = req.body.fullname
    const gender = req.body.gender
    const birthday = req.body.birthday
    const email = req.body.email
    const address = req.body.address
    const phone = req.body.phone



    //const {username,password,confirmpassword,fullname,gender,birthday,email,phone}=req.body

    db.query('select *from taikhoan where username=?', [username], (err, result) => {
        if (err) {
            console.log(err)
            return;
        }
        if (result.length > 0) {
            console.log(result)
            return res.render('register', {
                message: 'that username is used'
            });
        } else if (password != confirmpassword) {
            return res.render('register', {
                message: 'Password do not match'
            });
        }


        db.query('insert into taikhoan set ?', { username: username, password: password }, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                // console.log(result)
                db.query('select id from taikhoan where username=?', [username], (err, result) => {
                    if (err) {
                        console.log(err)
                    } else {
                        db.query('insert into accountdetail set ?', {
                            accountid: result[0].id, fullname: fullname, gender: gender, birthday: birthday, address: address
                            , email: email, phone: phone
                        })
                    }
                })
                return res.render('register', {
                    message: 'User register '
                })
            }
        })



    })





    // res.send('Form submitted')
    // res.render('register')
}


exports.login = (req, res) => {
    const username = req.body.username
    const password = req.body.password

    db.query('select *from taikhoan where username=? and password=?', [username, password], (err, result) => {
        if (err) {
            console.log(err)
        }
        if (result.length == 0) {
            return res.render('login', {
                message: 'Username or password is incorrect'
            })
        } else {
            res.render('index',)
        }
    })
}