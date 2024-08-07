var express = require('express')
var router = express.Router();
const teacherController = require('../controllers/teacherController');
const validateTeacher = require('../middlewares/Validation')

router.post('/signup',validateTeacher,teacherController.creatTeacher)
router.post('/login',teacherController.loginTeacher)


module.exports = router
