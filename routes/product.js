'use strict'

var express = require('express');
var ProductControllers = require('../controllers/product')

var api = express.Router();

api.get('/product', ProductControllers.getProducts)
api.get('/product/:productId', ProductControllers.getProduct)
api.post('/product', ProductControllers.createProduct)
api.put('/product/:productId', ProductControllers.updateProduct)
api.delete('/product/:productId', ProductControllers.deleteProduct)

module.exports = api;