const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');
const db = require('../db');
const workoutController = {};

//Example Query: INSERT INTO workout (workoutName, createdAt, exercises) VALUES ('Chest and Arms', '6/15/23 @ 1:52 PM', ARRAY ['bench press', 'bicep curls'])
workoutController.create = async (req, res, next) => {
  console.log('workoutController.create hit');
  const { workoutName } = req.body;
  const sqlQuery =
    'INSERT INTO workouts (name, user_id) VALUES ($1, 1) RETURNING workout_id';
  try {
    console.log('hit try block');
    const result = await db.query(sqlQuery, [workoutName]);
    // console.log(result);
    res.locals.id = result.rows[0].workout_id;
    console.log('RES.LOCALS.ID: ', res.locals.id);
    return next();
  } catch (err) {
    return next({
      log: `${err}`,
      message: { err: 'An error occurred' },
    });
  }
  // try {
  //   const result = await Workout.create({ name: workoutName });
  //   res.locals.id = result.id;
  //   console.log(result);
  //   return next();
  // } catch (err) {
  //   return next({
  //     log: `${err}`,
  //     message: { err: "An error occurred" },
  //   });
  // }
};

workoutController.addExercise = async (req, res, next) => {
  //   console.log('workoutController.addExercise hit');
  //   console.log('addExercise req.body', req.body);
  const { exercise, workoutName } = req.body;
  console.log(req.body);
  const sqlQuery = 'UPDATE workout (exercises) VALUES';
  try {
    const result = await Workout.findOneAndUpdate(
      { _id: workoutName },
      { $push: { exercises: exercise } },
      { new: true }
    );
    console.log('exercises array: ', result.exercises);
    return next();
  } catch (err) {
    next({ log: `error in adding exercise`, message: { err } });
  }
};

workoutController.endWorkout = async (req, res, next) => {
  console.log('endWorkout hit');
  const { workoutName } = req.body;
  try {
    const result = await Workout.findOne({ _id: workoutName });
    console.log(result);
    finishedWorkout = {
      name: result.name,
      exercises: result.exercises,
      date: result.date,
    };
    res.locals.finishedWorkout = finishedWorkout;
    return next();
  } catch (err) {
    next({ log: 'error in ending workout', message: { err } });
  }
};

module.exports = workoutController;
