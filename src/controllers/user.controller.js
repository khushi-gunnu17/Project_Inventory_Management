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

        // the session will be attached to our session body.
        req.session.userEmail = email;

        var products = ProductModel.get()
        res.render("index", {products, userEmail : req.session.userEmail})
    }

    // handler for the path
    logout(req, res) {
        // on logout, destroy the session
        req.session.destroy((err) => {
            if(err) {
                console.log(err);
            } else {
                // res.clearCookie('CookieName');       // for server-side cookies
                res.redirect('/login')
            }
        })
        res.clearCookie('lastVisit')
    }


    // same as above 
    // logout = (req, res) => {
    //     req.session = null;
    //     res.redirect("/login")
    // }
}