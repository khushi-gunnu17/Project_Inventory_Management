import UserModel from "../models/user.model.js";
import ProductModel from "../models/product.model.js";

export default class UserController {

    getRegister(req, res) {
        res.render('register');
    }

    getLogin(req, res) {
        res.render('login', { errorMessage: null });
    }

    postRegister(req, res) {
        // object destructuring
        const {name, email, password} = req.body
        // can add validations here
        UserModel.add(name, email, password);
        res.render('login', {errorMessage : null});
    }

    postLogin(req, res) {
        const {email, password} = req.body
        const user = UserModel.isValidUser(email, password);

        if(!user) {
            res.render('login', {
                errorMessage : 'Invalid Credentials.'
            })
        }
        var products = ProductModel.get()
        res.render("index", {products})
    }
}