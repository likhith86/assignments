const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
mongoose.connect("mongodb+srv://admin:12345678910@cluster0.i1ig7ik.mongodb.net/courseSelling");

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username:String,
    password:String,
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    courseId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }],
    username:String,
    password:String,
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    parentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Admin",
    },
    title:String,
    description:String,
    price:Number,
    image:String,
    published:Boolean
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

// Middleware for parsing request bodies
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    try{
        const adminName={username:req.headers.username,password:req.headers.password}
        const db= await Admin.findOne(adminName)

        if (!adminName.username || !adminName.password) {
            return res.status(400).send("Username and password are required");
        }
        if(db){
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

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    try{
        
        const checkName={
            username:req.headers.username,
            password:req.headers.password,
        }
        const db=User.findOne(checkName)

        if(db){
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
app.post('/admin/signup',(req, res) => {
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

app.post('/admin/courses', adminMiddleware, express.json(),async (req, res) => {
    // Implement course creation logic
    try{
        const admin=await Admin.findOne({
            username:req.headers.username,
            password:req.headers.password
        })
        console.log(admin);
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

app.get('/admin/courses', adminMiddleware, async(req, res) => {
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

app.post('/user/signup', (req, res) => {
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
            console.log(admin);
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

app.get('/user/courses', async (req, res) => {
    // Implement listing all courses logic
    try{
        const courses=await Course.find()
        res.status(200).json(courses)

    }catch(err){
        console.error(err)
        return res.status(500).send("internal server error")
    }
});

app.post('/user/courses/:courseId', userMiddleware,async (req, res) => {
    // Implement course purchase logic
    try{
        const user=await User.findOne({
            username:req.headers.username,
            password:req.headers.password
        })
        user.courseId.push(req.params.courseId)

        await user.save()
        res.status(200).json({
            msg:"successfully bought the course"
        })
    }
    catch(err){
        console.error(err)
        return res.status(500).send("internal server error")
    }
});

app.get('/user/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    try{
        const user=await User.findOne({
            username:req.headers.username,
            password:req.headers.password
        })
        const coursesPurchased=await  Course.find({ _id: { $in: user.courseId } })
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

<<<<<<< HEAD
app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
=======
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
>>>>>>> 44221a6567c34bcb8321268b6c0180e2a2a48d63
});
