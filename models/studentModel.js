const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    Name:{type:String,required:true},
    Subject:{type:String,required:true},
    Mark:{type:Number,required:true},
    isDelete:{type:Boolean}
})

const Student = mongoose.model("Student",studentSchema);
module.exports = Student
