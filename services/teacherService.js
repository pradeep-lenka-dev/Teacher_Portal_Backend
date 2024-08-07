const Teacher = require("../models/teacherModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class CustomError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

const teacherService = {
  creatTeacher: async (teacherData) => {
    const newTeacher = Teacher(teacherData);

    const savedTeacher = await newTeacher.save();
    return savedTeacher;
  },

  loginTeacher: async (teacherData) => {
    const { email, password } = teacherData;

    const teacher = await Teacher.findOne({email});
    if (!teacher) {
      throw new CustomError(401,"Invalid email");
    }

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      throw new CustomError({status:401,message:"Invalid password"});
    }
    const token = jwt.sign(
      { id: teacher._id, email: teacher.email },
      "JWT_SECRET",
      { expiresIn: "1h" }
    );
    return {status:200, token };
  },
};

module.exports = teacherService;
