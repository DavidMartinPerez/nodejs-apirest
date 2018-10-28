'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000

const app = express()


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.get('/:name', (req, res)=>{
    res.status(200).send({message:`¡Hola ${req.params.name}!`})
})

app.listen(port, ()=>{
    console.log(`API REST corriendo en http://localhost:${port}`)
})