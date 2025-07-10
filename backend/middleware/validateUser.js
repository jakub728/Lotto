import validator from "validator"

export const validatUser = (req, res, next)=>{
    const { email, password } = req.body
    const errors = []

    console.log("Request coming:", req.body)


    if (!email || !validator.isEmail(email)) {
        errors.push({field:"email", 
            message: "Not a valid email"})
    }

    if (!password || !validator.isStrongPassword(password)) {
        errors.push({field:"password", 
            messsage: "Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long"})
    }

    if (errors.length>0) {
        next({status:400, message: errors})
        return
    }

    req.body.email = validator.normalizeEmail(email)

    next()
}