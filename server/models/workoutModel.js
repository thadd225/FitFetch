const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  name: { type: String },
  date: { type: Date, default: Date },
  exercises: [{ type: String }],
});

// const Workout = mongoose.model('Workout', workoutSchema);

module.exports = mongoose.model('Workout', workoutSchema);
