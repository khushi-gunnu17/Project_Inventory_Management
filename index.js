// const express = require("express")
import express from 'express'
import path from "path"
import productsController from './src/controllers/product.controller.js'
import ejsLayouts from 'express-ejs-layouts'
import { validateRequest } from './src/middlewares/validation.middleware.js'
import { uploadFile } from './src/middlewares/file-upload.middleware.js'
import UserController from './src/controllers/user.controller.js'
import session from 'express-session'
import { auth } from './src/middlewares/auth.middleware.js'
import cookieParser from 'cookie-parser'
import { setLastVisit } from './src/middlewares/lastVisit.middleware.js'

const server = express()

server.use(express.static('public'));

// cookie
server.use(cookieParser());
// server.use(setLastVisit);

// session
server.use(
    session ({
    secret : 'SecretKey',
    resave : false,
    saveUninitialized : true,
    cookie: { secure: false }
    // secure : true (for https)
})
);

// parse form data
server.use(express.urlencoded({extended: true}))

// setup view engine settings
server.set("view engine", "ejs")
// pat of our views folder, have to give the relative root folder 
server.set("views", path.join(path.resolve(), "src", "views"))     




server.use(ejsLayouts)

// create an instance of productController
const productcontroller = new productsController() 

// create an instance of UserController
const usercontroller = new UserController()


server.get('/register', usercontroller.getRegister)
server.get('/login', usercontroller.getLogin)


server.get("/", setLastVisit, auth, productcontroller.getProducts.bind(productcontroller))
server.get("/new", auth, productcontroller.getAddForm)
// URL parameters => id
server.get("/update-product/:id", auth, productcontroller.getUpdateProductView)


server.post('/register', usercontroller.postRegister)
server.post('/login', usercontroller.postLogin)
server.get('/logout', usercontroller.logout)

server.post("/delete-product/:id", auth, productcontroller.deleteProduct)

server.post(
    "/", auth,
    uploadFile.single('imageUrl'), 
    validateRequest, 
    productcontroller.addNewProduct
)

// this one down below to get the updated data
server.post("/update-product", auth, productcontroller.postUpdateProduct)


server.listen(3400, () => {
    console.log('Server is running on the port 3400.');
})