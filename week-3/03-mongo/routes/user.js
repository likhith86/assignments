const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User}=require("../db")
const {Course}=require("../db")

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    try{
        const data={
            username:req.headers.username,
            password:req.headers.password
        }
        if (!data.username || !data.password) {
            return res.status(400).send("Username and password are required");
        }
        else{
            const admin= new User(data)
            admin.save()
            res.status(200).json({
                msg:"successfully created"
            })
        }
    }
    catch(error){
        console.error(err)
        return res.status(500).send("internal server error")
    }

});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    try{
        const courses=await Course.find()
        res.status(200).json(courses)

    }catch(err){
        console.error(err)
        return res.status(500).send("internal server error")
    }
});

router.post('/courses/:courseId', userMiddleware,async (req, res) => {
    // Implement course purchase logic
    try{
        const user=await User.findOne({
            username:req.headers.username,
            password:req.headers.password
        })
        user.courseId.push(req.params.courseId)

        res.status(200).json({
            msg:"successfully bought the course"
        })
    }
    catch(err){
        console.error(err)
        return res.status(500).send("internal server error")
    }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    try{
        const user=await User.findOne({
            username:req.headers.username,
            password:req.headers.password
        })
        const coursesPurchased=Course.find({ _id: { $in: user.courseId } })
        if(coursesPurchased.lenght===0){
            res.status(200).json({
                msg:"no course bought till now"
            })
        }
        else{
            res.status(200).json(coursesPurchased)
        }
    }catch(err){
        console.error(err)
        return res.status(500).send("internal server error")
    }
});
