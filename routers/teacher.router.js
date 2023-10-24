const express = require('express');
const teacherRouter = express.Router();
const Teacher = require('../model/teacher.model');

teacherRouter.get("/", async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});


teacherRouter.post('/', async (req, res) => {
  const { name, age, subject, gender, contact } = req.body;

  try {
    const teacher = new Teacher({ name, age, subject, gender, contact });
    await teacher.save();
    res.status(201).json(teacher);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


teacherRouter.put("/:id", async (req, res) => {
  const teacherId = req.params.id;
  const updatedTeacherData = req.body;

  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      teacherId,
      updatedTeacherData,
      { new: true }
    );

    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json(updatedTeacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

teacherRouter.delete('/:id', async (req, res) => {
  const teacherId = req.params.id;

  try {
    const deletedTeacher = await Teacher.findByIdAndRemove(teacherId);

    if (!deletedTeacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    res.status(200).json({ message: 'Teacher deleted successfully', teacher: deletedTeacher });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = teacherRouter