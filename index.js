const express = require('express');
const path = require('path');
const routes = require('./routes/routes');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/',routes);

app.listen(2000,() => {
    console.log(`App is listening at port ${2000}`);
});