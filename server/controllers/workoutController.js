const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');
const db = require('../db');
const workoutController = {};

//account creation/users do not exist yet so will be adding every workout to user with id of 1
workoutController.create = async (req, res, next) => {
  console.log('workoutController.create hit');
  const { workoutName } = req.body;
  const sqlQuery =
    'INSERT INTO workouts (name, user_id) VALUES ($1, 1) RETURNING workout_id';
  try {
    // console.log('hit try block');
    const result = await db.query(sqlQuery, [workoutName]);
    // console.log(result);
    res.locals.id = result.rows[0].workout_id;
    // console.log('RES.LOCALS.ID: ', res.locals.id);
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

//check if exercise submitted exists, if it does, add its id to the junction table with the current workout_id. If not, add the exercise to the exercise table then add it to the junction table along with the current workout_id
workoutController.addExercise = async (req, res, next) => {
  //   console.log('workoutController.addExercise hit');
  const { exercise, workoutName } = req.body;
  // console.log(req.body);
  const sqlQuery1 = 'SELECT exercise_id FROM exercises WHERE name=($1)';
  const sqlQuery2 =
    'INSERT INTO workout_exercise_junction (workout_id, exercise_id) VALUES ($1, $2)';
  const sqlQuery3 =
    'INSERT INTO exercises (name) VALUES ($1) RETURNING exercise_id';
  try {
    const checkExercise = await db.query(sqlQuery1, [exercise]);
    // console.log('checkExercise: ', checkExercise);
    if (checkExercise.rows[0]) {
      const exerciseId = checkExercise.rows[0].exercise_id;
      // console.log('EXERCISE ID: ', exerciseId);
      await db.query(sqlQuery2, [workoutName, exerciseId]);
    } else {
      const newExercise = await db.query(sqlQuery3, [exercise]);
      const newExerciseId = newExercise.rows[0].exercise_id;
      await db.query(sqlQuery2, [workoutName, newExerciseId]);
    }
    return next();
  } catch (err) {
    next({
      log: `error in adding exercise: ${err}`,
      status: 500,
      message: { err },
    });
  }
  // try {
  //   const result = await Workout.findOneAndUpdate(
  //     { _id: workoutName },
  //     { $push: { exercises: exercise } },
  //     { new: true }
  //   );
  //   console.log('exercises array: ', result.exercises);
  //   return next();
  // } catch (err) {
  //   next({ log: `error in adding exercise`, message: { err } });
  // }
};

workoutController.endWorkout = async (req, res, next) => {
  console.log('endWorkout hit');
  const { workoutName } = req.body;
  const sqlQuery =
    'SELECT exercises.name FROM workout_exercise_junction we INNER JOIN workouts ON workouts.workout_id=we.workout_id INNER JOIN exercises ON we.exercise_id=exercises.exercise_id WHERE we.workout_id=($1);';
  const sqlQuery2 = 'SELECT workouts.name FROM workouts WHERE workout_id=($1)';
  try {
    // console.log('hit try block in endWorkout');
    const finishedWorkout = await db.query(sqlQuery, [workoutName]);
    const name = await db.query(sqlQuery2, [workoutName]);
    // console.log('finishedWorkout!!!!!: ', finishedWorkout);
    res.locals.finishedWorkout = finishedWorkout.rows;
    res.locals.workoutName = name.rows[0].name;
    // console.log(res.locals.workoutName);
    return next();
  } catch (err) {
    next({ log: 'error in ending workout', message: { err } });
  }
  // try {
  //   const result = await Workout.findOne({ _id: workoutName });
  //   console.log(result);
  //   finishedWorkout = {
  //     name: result.name,
  //     exercises: result.exercises,
  //     date: result.date,
  //   };
  //   res.locals.finishedWorkout = finishedWorkout;
  //   return next();
  // } catch (err) {
  //   next({ log: 'error in ending workout', message: { err } });
  // }
};

module.exports = workoutController;
