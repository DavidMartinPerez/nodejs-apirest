'use strict'

const express = require('express');
const ProductControllers = require('../controllers/product')
const UserController = require('../controllers/user')
const auth = require('../middlewares/auth')
const api = express.Router();

//Product
api.get('/product', auth.isAuth, ProductControllers.getProducts)
api.get('/product/:productId', ProductControllers.getProduct)
api.post('/product', auth.isAuth, ProductControllers.createProduct)
api.put('/product/:productId', auth.isAuth, ProductControllers.updateProduct)
api.delete('/product/:productId', auth.isAuth, ProductControllers.deleteProduct)

//User
api.post('/signup', UserController.signUp)
api.post('/signin', UserController.signIn)

//private
api.get('/private', auth.isAuth ,(req, res) => {
    res.status(200).send( { message: 'Tienes acceso' } )
})

module.exports = api;