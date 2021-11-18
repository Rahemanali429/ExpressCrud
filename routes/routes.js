const express = require('express');
const dbcon = require('../db/dbcon');
const router = express.Router();
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/',(req,res) => {
    dbcon.query('SELECT * FROM books',(err,rows) => {
        if(err) {
            console.log(`Error${err}`);
        }
        else {
            res.render('index',{data:rows});
        }
    });
});

router.get('/add',(req,res) => {
    res.render('add',{
        name: '',
        author: ''
    });
});

router.get('/edit/(:id)',(req,res) => {
    let id = req.params.id;
    dbcon.query('SELECT * FROM books WHERE id = ' + id, function(err, rows, fields) {
        if(err) throw err

        if (rows.length <= 0) {
            res.redirect('/')
        }
        else {
            res.render('edit', {
                id: rows[0].id,
                name: rows[0].name,
                author: rows[0].author
            })
        }
    });
});

router.post('/edit/(:id)',urlencodedParser,(req,res) => {
    let id = req.params.id;
    let name = req.body.name;
    let author = req.body.author;
    formdata = {
        name: name,
        author: author
    }

    if(name.length == 0 || author.length == 0) {
        res.send("<h4>Please Enter All Fields Correctly.</h4>")
    }
    else {
        dbcon.query('UPDATE books SET ? WHERE id = ' + id,formdata,(err,rows) => {
            if(err) {
                res.send(err);
            } else {
                res.redirect('/');
            }
        })
    }
});

router.post('/add',urlencodedParser,(req,res) => {
    // console.log(req.body);
    let name = req.body.name;
    let author = req.body.author;
    formdata = {
        name: name,
        author: author
    }

    if(name.length == 0 || author.length == 0) {
        res.send("<h4>Please Enter All Fields Correctly.</h4>")
    }
    else {
        dbcon.query('INSERT INTO books SET ?',formdata,(err,rows) => {
            if(err) {
                res.send(err);
            } else {
                res.redirect('/');
            }
        })
    }
});

router.get('/delete/(:id)', (req, res) => {

    let id = req.params.id;
     
    dbcon.query('DELETE FROM books WHERE id = ' + id, function(err, result) {
        if (err) {
            res.send(err)
        } else {
            res.redirect('/')
        }
    })
})


module.exports = router;