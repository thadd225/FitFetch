const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

const workoutController = {};

workoutController.create = async (req, res, next) => {
  console.log("workoutController.create hit");
  //   console.log('req.body', req.body);
  const { workoutName } = req.body;
  try {
    const result = await Workout.create({ name: workoutName });
    res.locals.id = result.id;
    console.log(result);
    return next();
  } catch (err) {
    return next({
      log: `${err}`,
      message: { err: "An error occurred" },
    });
  }
};

workoutController.addExercise = async (req, res, next) => {
  //   console.log('workoutController.addExercise hit');
  //   console.log('addExercise req.body', req.body);
  const { exercise, workoutName } = req.body;
  console.log(req.body);
  try {
    const result = await Workout.findOneAndUpdate(
      { _id: workoutName },
      { $push: { exercises: exercise } },
      { new: true }
    );
    console.log("exercises array: ", result.exercises);
    return next();
  } catch (err) {
    next({ log: `error in adding exercise`, message: { err } });
  }
};

workoutController.endWorkout = async (req, res, next) => {
  console.log("endWorkout hit");
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
    next({ log: "error in ending workout", message: { err } });
  }
};

module.exports = workoutController;
