require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const Dbconnect = require('./src/config/dbconnect');
const path = require('path');


Dbconnect();

const app = express();
const Port = process.env.PORT || 3005;


// Static folder:
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static('uploads'));

// Setup EJS
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.json());
app.use(express.urlencoded({extended:true}));


const productroute = require('./src/router/api/product.api');
app.use('/api', productroute);

const productejsroute = require('./src/router/productEjsRouter');
app.use(productejsroute)



app.listen(Port, () => {
    console.log(`The server is running on port: ${Port}`);
});


