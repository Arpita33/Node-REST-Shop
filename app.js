const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
//const mongoose = require('mongoose');

//mongoose.connect("mongodb+srv://arpita33:jpn3EStyFD7iQmEI@cluster0.7dv9iry.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
//const mongoose = require('mongoose');
// const uri = "mongodb+srv://arpita33:2CSxnRknMqGFkZA0@cluster0.7dv9iry.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

// async function run() {
//   try {
//     // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
//     await mongoose.connect(uri, clientOptions);
//     await mongoose.connection.db.admin().command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await mongoose.disconnect();
//   }
// }
// run().catch(console.dir);



const productRoutes = require('./api/routes/products') //url starting with '/products' forwarded to product.js file
const orderRoutes = require('./api/routes/orders'); //url starting with '/products' forwarded to product.js file
//const { default: mongoose } = require('mongoose');

//middleware for every request
// app.use((req, res, next) => {
//     res.status(200).json({
//         message: 'It works!'
//     });
// });

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    //preventing CORS(Cross-Origin Resource Sharing) errors
    //CORS errors enforced by the browser as security measure
    //overwrite them with headers
    //the browser then ignores them.
    res.header('Access-Control-Allow-Origin', '*'); //gives access to any client
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    //browser always sends an OPTIONS request before a POST/PUT request
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE');
        return res.status(200).json({});
    }
    next(); // passing the request to other routes
});

//routes to handle requests
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)

//any other url considered as error and directs to here
app.use((req, res, next) =>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;