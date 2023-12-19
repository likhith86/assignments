const mongoose = require('mongoose');

// Connect to MongoDB
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

module.exports = {
    Admin,
    User,
    Course
}