const Student = require("../models/studentModel");
const mongoose = require ('mongoose')


class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

const studentService = {
    getAllStudents: async () => {
        try {
            const result = await Student.find({ $or: [{ isDelete: { $exists: false } }, { isDelete: { $ne: true } }] }).select('Name Subject Mark');

            if (!result || result.length === 0) {
                throw new CustomError('No students found.', 404);
            }
            return result;
        } catch (error) {
            if (error instanceof CustomError) {
                throw error; 
            } else {
                console.error("🚀 ~ Student Service file getAllStudents:async ~ error:", error);
                throw new CustomError('An unexpected error occurred.', 500); // Generic error
            }
        }
    },
    addStudent:async (studentData) => {
        try {
            const newStudent = Student(studentData);

            const savedStudent = await newStudent.save();
            return savedStudent;
            
        } catch (error) {
            console.log("🚀 ~ addStudent: ~ error:", error)
            
        }
    },
    updateStudent : async (studentData) => {
        const { id, data } = studentData; 
    
        if (!id) {
            throw new CustomError('Student ID is required.');
        }
    
        const studentId = new mongoose.Types.ObjectId(id); 
    
        try {
            const updatedStudent = await Student.findByIdAndUpdate(studentId, data, { new: true }); // Pass data directly as the update object
            
            if (!updatedStudent) {
                throw new CustomError('Student not found.');
            }
                return updatedStudent;
        } catch (error) {
            console.error("🚀 ~ updateStudent:async ~ error:", error);
            throw error; 
        }
    },
    deleteStudent:async(studentid) => {       
        try {
            const result =  await Student.findByIdAndUpdate(new mongoose.Types.ObjectId(studentid.id), { isDelete: true });
            if (!result) {
                throw new CustomError('Student not found.', 404);
            }
            return result
        } catch (error) {
            console.log("🚀 ~ deleteStudent:async ~ error:", error)
            
        }
    }
};

module.exports = studentService;
