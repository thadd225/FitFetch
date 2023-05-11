import React from 'react';
import { useState } from 'react';

const WorkoutSummary = (props) => {
  let keys = Object.keys(props.workoutSummary);
  if (keys.length) {
    let finishedWorkout = props.workoutSummary.finishedWorkout;
    return (
      <div className="summary">
        <h1>You crushed it!</h1>
        <div id="borderMe">
          <h1> Here's your workout summary</h1>
        </div>
        <div className="summaryContainer">
          <h1>{finishedWorkout.name}</h1>
          {finishedWorkout.exercises.map((exercise, index) => {
            return <li key={index}>{exercise}</li>;
          })}
        </div>

        <button id="done" onClick={() => props.handleWorkoutSummary({})}>
          Done
        </button>
      </div>
    );
    // const exercises = props.workoutSummary
  }
};

export default WorkoutSummary;
