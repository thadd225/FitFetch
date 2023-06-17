import React from 'react';
import { useState } from 'react';

const WorkoutSummary = (props) => {
  // console.log('!!!!', props.workoutSummary);
  let keys = Object.keys(props.workoutSummary);
  // console.log(keys);
  if (keys.length) {
    let finishedWorkout = props.workoutSummary.finishedWorkout;
    // console.log('finished workout: ', finishedWorkout);
    return (
      <div className='summary'>
        <h1>You crushed it!</h1>
        <div id='borderMe'>
          <h1> Here's your workout summary</h1>
        </div>
        <div className='summaryContainer'>
          <h1>{props.workoutSummary.name}</h1>
          {finishedWorkout.map((exercise, index) => {
            return <li key={index}>{exercise.name}</li>;
          })}
        </div>

        <button id='done' onClick={() => props.handleWorkoutSummary({})}>
          Done
        </button>
      </div>
    );
    // const exercises = props.workoutSummary
  }
};

export default WorkoutSummary;
