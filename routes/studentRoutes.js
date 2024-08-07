const express = require('express')
const router = express.Router();
const studentController = require ('../controllers/studentController')

router.get('/getAllStudents',studentController.getAllStudents)
router.post('/addstudent',studentController.addStudent)
router.post('/deleteStudent',studentController.deleteStudent)
router.post('/updatestudent',studentController.updateStudent)


module.exports = router