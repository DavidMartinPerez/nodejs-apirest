var Product = require('./../models/product')

var controller = {

    getProduct: function (req, res) {
        let productId = req.params.productId
        log(null,'GET api/product/:'+productId)

        Product.findById(productId, (err, product) => {
            if(err) return res.status(500).send({message: 'Error al realizar la petición:' + err})
            if(!product) return res.status(404).send({message: 'El producto no existe'})

            res.status(200).send({ product })
        })
    },

    getProducts: function (req, res) {
        log(null,'GET api/product')
        Product.find({}, (err, products) => {
            if(err) return res.status(500).send({message: 'Error al realizar la petición:' + err})
            if(!products) return res.status(404).send({message: 'No existen productos'})

            res.status(200).send({ products })
        })
    },

    createProduct: function (req, res) {
        log(req.body,'POST /api/product')

        let product = new Product()
        product.name = req.body.name
        product.picture = req.body.picture
        product.price = req.body.price
        product.category = req.body.category
        product.description = req.body.description

        product.save((err, productStored)=>{
            if(err) res.status(500).send({message: 'Error al guardar en la base de datos' + err})

            res.status(200).send({product: productStored})
        })
    },

    updateProduct: function (req, res) {
        let productId = req.params.productId
        let update = req.body
        log(update,'PUT /product/:'+ productId)

        Product.findByIdAndUpdate(productId, update, (err, productUpdate) => {
            if(err) return res.status(500).send({message: 'Error al realizar la petición:' + err})
            if(!productUpdate) return res.status(404).send({message: 'El producto no existe'})

            res.status(200).send({ oldProduct : productUpdate })
        })
    },

    deleteProduct: function (req, res){
        let productId = req.params.productId
        log(null,'DELETE /product/:'+ productId)
        Product.findById(productId, (err, product) => {
            if(err) return res.status(500).send({message: 'Error al realizar la petición:' + err})
            if(!product) return res.status(404).send({message: 'El producto no existe'})

            product.remove(err => {
                if(err) return res.status(500).send({message: 'Error al eliminar :' + err})

                res.status(200).send({ message: 'Producto eliminado' })
            })
        })
    }
}

function dateNow() {
    var dt = new Date();
    return(`${dt.getDate()}/${dt.getMonth()+1}/${dt.getFullYear()}:${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`);
}
function log(req,rest) {
    if(rest) console.log(dateNow() + " | " + rest)
    if(req) console.log(req)
}

module.exports = controller;