const teacherService = require('../services/teacherService')
const { validationResult } = require('express-validator');
const teacherController ={

     creatTeacher : async (req,res)=>{
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const teacherData = req.body
        try {
            const savedTeacher = await teacherService.creatTeacher(teacherData);
            res.status(201).json(savedTeacher);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create teacher' });
            
        }

    },

    loginTeacher : async (req,res) =>{
        const teacherData = req.body
        try {
            const result = await teacherService.loginTeacher(teacherData)
            res.json(result)
        } catch (error) {
            console.log("🚀 ~ loginTeacher: ~ error:", error)
            res.json(error)
        }
    }
}

module.exports = teacherController