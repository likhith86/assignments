async function userMiddleware(req, res, next) {
    const {Users}=db.require("../db")
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    try{
        
        const checkName={
            username:req.headers.username,
            password:req.headers.password,
        }
        const db=Users.findOne(checkName)

        if(db){
            res.status(200).send("login successful")
            next()
        }
        else{
             return res.status(403).send("user not found")
        }
    }
    catch(err){
        console.error(err)
        return res.status(500).send("internal server error")
    }
}
module.exports = userMiddleware;