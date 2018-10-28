'use strict'

const servicesToken = require('../services/token')

function isAuth (req, res, next) {
    if(!req.headers.authorization) {
        return res.status(403).send( { message: 'No tienes autorización' } )
    }

    const token = req.headers.authorization.split(" ")[1]

    servicesToken.decodeToken( token )
        .then( response => {
            req.user = response
            next()
        })
        .catch(response => {
            return res.status(response.status).send( response.message )
        })
}

module.exports = {
    isAuth
}