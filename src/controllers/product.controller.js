import path from "path"
import ProductModel from "../models/product.model.js"

export default class productsController {

    // return the HTML file which we have in views folder
    getProducts(req, res, next) {

        let products = ProductModel.get()
        // console.log(products);

        res.render("index", {products:products})

        // return res.sendFile(
        //     path.join(path.resolve(), "src", "views", "product.html")
        // )
    }


    getAddForm(req, res, next) {
        return res.render("new-product", {errorMessage:null})       // data field not necessary here, it is an optional field also  
    }


    addNewProduct(req, res, next) {
        // access data from form.
        // console.log(req.body);  // undefined
        
        const {name, desc, price} = req.body;
        const imageUrl = "images/" + req.file.filename
        ProductModel.add(name, desc, price, imageUrl)
        var products = ProductModel.get()
        res.render("index", {products})
    }


    getUpdateProductView(req, res, next) {
        // 1. If product exists, then return view.
        const id = req.params.id    // req.params = object which allows you to acces the URL parameters
        const productFound = ProductModel.getById(id)

        if(productFound) {
            res.render("update-product", 
            {
                product: productFound, 
                errorMessage: null
            });
        }

        // 2. else return errors.
        else {
            res.status(401).send('Product Not Found.')
        }
    }

    postUpdateProduct(req, res) {
        ProductModel.update(req.body)
        var products = ProductModel.get()
        res.render("index", {products})
    }

    deleteProduct(req, res) {
        const id = Number(req.params.id)
        
        const productFound = ProductModel.getById(id)

        if(!productFound) {
            res.status(401).send('Product Not Found.')
        }

        ProductModel.delete(id)
        var products = ProductModel.get()
        res.render("index", {products})
    }
}