const { Router } = require("express");
const express=require("express")
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {Admin}=require("../db");
const {Course}=require("../db");

router.post('/signup',(req, res) => {
    // Implement admin signup logic
    try{
        const data={
            username:req.headers.username,
            password:req.headers.password
        }
        if (!data.username || !data.password) {
            return res.status(400).send("Username and password are required");
        }
        else{
            const admin= new Admin(data)
            admin.save()
            res.status(200).json({
                msg:"saved successfully"
            })
        }
    }
    catch(error){
        console.error(err)
        return res.status(500).send("internal server error")
    }

});

router.post('/courses', adminMiddleware, express.json(),async (req, res) => {
    // Implement course creation logic
    try{
        const admin=await Admin.findOne({
            username:req.headers.username,
            password:req.headers.password
        })
        const course=new Course({
            parentId:admin._id,
            title:req.body.title,
            description:req.body.description,
            price:req.body.price,
            image:req.body.image,
            published:true
        })
        course.save()
        res.status(200).json({
            msg:"course created successfully"
        })
    }catch(err){
        console.error(err)
        return res.status(500).send("internal server error")
    }
});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
    try{
        const admin=await Admin.findOne({
            username:req.headers.username,
            password:req.headers.password
        })
        const courses=await Course.find({parentId:admin._id})

        res.status(200).json(courses)

    }catch(err){
        console.error(err)
        return res.status(500).send("internal server error")
    }
});

module.exports = router;