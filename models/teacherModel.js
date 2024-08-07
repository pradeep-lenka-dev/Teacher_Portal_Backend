const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const teacherSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  subjects: [
    {
      type: String,
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


teacherSchema.pre('save', async function(next) {
    const teacher = this;

    if (!teacher.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(teacher.password, salt);
        teacher.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;
