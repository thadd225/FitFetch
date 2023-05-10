const path = require('path');
const express = require('express');
const app = express();
//needed cors!! (something security relatedß to do with frontend url being different than server)
const cors = require('cors');
// const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('../config/db');
const workoutController = require('./controllers/workoutController');
const PORT = 3000;

// mongoose
//   .connect('mongodb://127.0.0.1:27017/soloprojectdb')
//   .catch((error) => handleError(error));
connectDB();

// setTimeout(() => console.log(mongoose.connection.readyState), 5000);
// run().catch(console.dir);
app.use(express.json());
app.use(cors());
//normal endpoint handling
app.get('/', (req, res) => {
  console.log('hello world');
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

//request handler for posting exercises when exercise button is clicked
app.post('/add', workoutController.create, (req, res) => {
  // console.log('post request hit serverside');
  res.status(200).json({ message: 'Workout added successfully ' });
});

//request handler for adding exercises
app.patch('/add', workoutController.addExercise, (req, res) => {
  // console.log('post request hit serverside')
  res.status(200).json({ message: 'Exercise added successfully ' });
});

//request handler for ending workout
app.post('/end', workoutController.endWorkout, (req, res) => {
  res.status(200);
});

// catch-all route handler for any requests to an unknown route
app.use('*', (req, res) => res.sendStatus(404));

//global handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log('Server listening on port: ', PORT);
});
