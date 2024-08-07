var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var http = require('http');
var conectDB = require('./config/dbConfig')
const errorHandler = require('./middlewares/errorHandler')
var usersRouter = require('./routes/users');
var teacherRouter = require('./routes/teacherRoutes')
const studentRouter = require('./routes/studentRoutes')
const cors = require('cors');
var app = express();
const port = 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(cors())
app.use('/users', usersRouter);
app.use('/',teacherRouter)
app.use('/students',studentRouter)
app.use(express.urlencoded({ extended: true }));

app.use(errorHandler);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'An unexpected error occurred', error: err.message });
});


// var server = http.createServer(app);

const startSession = async () => {
  try {
    await conectDB()
    app.listen(port, (err) => {
      if (err) {
          return console.log('Something bad happened', err);
      }
      
      console.log(`Server is listening on ${port}`);
    });

  } catch (error) {
    
  }
}



startSession()

module.exports = app;
