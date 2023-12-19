// Middleware for handling auth
const {Admin}=require("../db")

async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    try{
        const adminName={username:req.headers.username,password:req.headers.password}
        const db= await Admin.findOne(adminName)

        if (!admin.username || !admin.password) {
            return res.status(400).send("Username and password are required");
        }
        if(db){
            res.status(200).send("logged in successfully")
            next()
        }   
        else{
            return res.status(403).send("admin not found")
        }

    }
    catch(err){
        console.error(err)
        return res.status(500).send("internal server error")
    }
}

module.exports = adminMiddleware;