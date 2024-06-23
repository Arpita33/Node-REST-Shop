const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const Product = require('../models/product');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /products.'
    });
});

router.post('/', (req, res, next) => {
    // const product = {
    //     name: req.body.name, //using the body-parser library
    //     price: req.body.price
    // };
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save().then(result => {
        console.log(result);
    })
    .catch(err => console.log(err)); // on mongoose models, store product in database
    res.status(201).json({
        message: 'Handling POST requests to /products.',
        createdProduct: product
    });
});

router.get('/:productID', (req, res, next) => {
    const id = req.params.productID;
    res.status(200).json({
        message: 'You passed an ID.',
        id: id
    });
});

router.patch('/:productID', (req, res, next) => {
    const id = req.params.productID;
    res.status(200).json({
        message: 'Updated product.',
        id: id
    });
});


router.delete('/:productID', (req, res, next) => {
    const id = req.params.productID;
    res.status(200).json({
        message: 'Deleted product.',
        id: id
    });
});

module.exports= router; // make router exportable so that it can be imported in app.js file.