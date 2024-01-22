// export default takes three things --> HoistedDeclaration => a function (but not with arrow fuction) 
// class 
// assignment expression 

import {body, validationResult} from 'express-validator'

export const validateRequest = async (req, res, next) => {

    // validating data
    // const {name, price, imageURL} = req.body;
    // let errors = [];

    // if(!name || name.trim() == '') {
    //     errors.push("Name is Required.")
    // }

    // if(!price || parseFloat(price) < 1) {
    //     errors.push("Price must be a positive value.")
    // }

    // try {
    //     const validURL = new URL("https://" + imageURL);
    // } catch (error) {
    //     errors.push("URL is invalid.")
    // }




    // 1. Setup rules for the validation
    const rules = [
        body('name').notEmpty().withMessage("Name is Required."),
        body('price').isFloat({gt:0}).withMessage("Price must be a positive value."),
        body('imageUrl').custom((value, {req}) => {
            if(!req.file) {
                throw new Error("Image is Required.")
            }
            return true
        })
    ];


    // 2. Run those rules
    // can be an asynchronous operation
    await Promise.all(rules.map(rule => rule.run(req)))


    // 3. check if there are any errors after running the rules.
    // return all the errors which it has extracted = validationResult
    var validationErrors = validationResult(req)      

    
    // 4. If there are errors then return the error message
    if(!validationErrors.isEmpty()) {
        return res.render('new-product', {
            errorMessage : validationErrors.array()[0].msg,
        })
    }
    next()  // will call the next middleware
}

// At the end 
// export default validateRequest

// goal : to make loosely coupled systems , so that easier to make changes to 