import registerService from "./../services/registerService";
import { validationResult } from "express-validator";

let getPageRegister = (req, res) => {
    return res.send({test: "test"})
    
    // return res.render("register.ejs", {
    //     errors: req.flash("errors")
    // });
};

let createNewUser = async (req, res) => {
    //validate required fields
    let errorsArr = [];
    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach((item) => {
            errorsArr.push(item.msg);
        });
        return res.send({error: errorsArr[0]})
        // req.flash("errors", errorsArr);
        // return res.redirect("/register");
    }

    //create a new user
    let newUser = {
        fullname: req.body.fullName,
        email: req.body.email,
        password: req.body.password
    };
    try {
        await registerService.createNewUser(newUser);
        return res.send({success: "account registered successfully"})
        // return res.redirect("/login");
    } catch (err) {
        return res.send({error: err})
        // req.flash("errors", err);
        // return res.redirect("/register");
    }
};
module.exports = {
    getPageRegister: getPageRegister,
    createNewUser: createNewUser
};
