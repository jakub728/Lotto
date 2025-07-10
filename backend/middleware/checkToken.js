import jwt from "jsonwebtoken"


export const checkToken = (req,res,next) => {
    try {
        const token = req.cookies.token
        if (!token) {return next({status: 403, message: "You have to log in first"})}

        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decode.userId

        next()
    } catch (error) {
        next({status: 403, message: error.message})
    }
}