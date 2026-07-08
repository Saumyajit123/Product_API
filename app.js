require('dotenv').config();
const express = require('express');
const Dbconnect = require('./src/config/dbconnect');


Dbconnect();


const app = express();
const Port = process.env.PORT || 3005;


app.use(express.json());
const productroute = require('./src/router/api/product.api');
app.use('/api', productroute);



app.listen(Port, () => {
    console.log(`The server is running on port: ${Port}`);
});


