const mysql = require('mysql');

dbconnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_crud'
});

dbconnection.connect((err) => {
    if(err) {
        console.log(`There Error While connecting to database. ${err}`);
    }
});

module.exports = dbconnection;