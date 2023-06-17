const path = require('path');
const express = require('express');
const app = express();
//needed cors!! (something security related to do with frontend url being different than server)
const cors = require('cors');
const mongoose = require('mongoose');
const workoutController = require('./controllers/workoutController');
const PORT = 3000;

// mongoose
//   .connect(
//     'mongodb+srv://thadd225:IZ3GtDSjJeN0uHAi@cluster0.imjci80.mongodb.net/?retryWrites=true&w=majority'
//   )
//   .catch((error) => handleError(error));

app.use(express.json());
app.use(cors());

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
  app.use(
    '/',
    (req, res, next) => {
      console.log('production is working');
      return next();
    },
    express.static(path.join(__dirname, '../dist'))
  );
} else {
  //normal endpoint handling
  app.get('/', (req, res) => {
    console.log('hello world');
    res.sendFile(path.join(__dirname, '../src/index.html'));
  });
}

//request handler for creating workout when begin workout button is clicked
app.post('/add', workoutController.create, (req, res) => {
  // console.log('post request hit serverside');
  res.status(200).json({ id: res.locals.id });
});

//request handler for adding exercises
app.patch('/add', workoutController.addExercise, (req, res) => {
  // console.log('post request hit serverside')
  res.status(200).json({ message: 'Exercise added successfully ' });
});

//request handler for ending workout
app.post('/end', workoutController.endWorkout, (req, res) => {
  res.status(200).json({
    finishedWorkout: res.locals.finishedWorkout,
    name: res.locals.workoutName,
  });
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

app.listen(PORT, '0.0.0.0', () => {
  console.log('Server listening on port: ', PORT);
});
