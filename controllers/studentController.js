const studentService = require('../services/studentService') 

const studentController = {

    getAllStudents:async (req,res)=>{
        try {
            const result = await studentService.getAllStudents()
            res.json(result)
            
        } catch (error) {
            res.status(500).json({
                message: 'An error occurred while fetching students.',
                error: error.message 
            });
        }
    },
    addStudent:async(req,res)=>{
        const studentData = req.body
        try {
            const result = await studentService.addStudent(studentData)
            res.status(200).json(result)
        } catch (error) {
            console.log("🚀 ~ addStudent:async ~ error:", error)
            
        }
    },
    updateStudent:async(req,res)=>{
        const studentData = req.body
        console.log("🚀 ~ updateStudent:async ~ studentData:", studentData)
        try {
            const result = await studentService.updateStudent(studentData)
            res.status(200).json({ message: 'Student update successfully', data: result });

        } catch (error) {
            
        }
    },
    deleteStudent:async(req,res)=>{
        const studentData = req.body;
        console.log("🚀 ~ deleteStudent:async ~ studentData:", studentData)
        try {
            const result = await studentService.deleteStudent(studentData)
            console.log("🚀 ~ deleteStudent:async ~ result:", result)
            res.status(200).json({ message: 'Student deleted successfully', data: result });

            
        } catch (error) {
            console.log("🚀 ~ deleteStudent:async ~ error:", error)
            let statusCode = 500;
            let errorMessage = 'Internal Server Error';
    
            if (error.statusCode) {
                statusCode = error.statusCode;
                errorMessage = error.message;
            } else if (error.name === 'CastError') {
                statusCode = 400; // Bad request
                errorMessage = 'Invalid student ID';
            }
    
            res.status(statusCode).json({ error: errorMessage });
            
        }
    }
} 
module.exports = studentController