const express = require('express');
const app = express();
const cors = require('cors');

const initializeDatabase = require('./db')

const studentRouter = require('./routers/student.router');
const teacherRouter = require('./routers/teacher.router');

app.use(express.json())

initializeDatabase()

app.use(cors())

app.get('/', (req, res) => {
  res.send('Assignment 20.')
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'something went wrong' });
});

app.use('/students', studentRouter)

app.use('/teachers', teacherRouter)

app.listen(3000, () => {
  console.log('server started');
});