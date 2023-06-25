import React from 'react';
import { useState } from 'react';

const EndWorkout = (props) => {
  //send a get request to '/end', which retrieves the entire workout summary
  const endWorkoutFunc = async () => {
    const workoutName = props.workoutName;
    console.log('endWorkoutFunc hit');
    console.log('workoutName', props.workoutName);
    fetch('/end', {
      method: 'POST',
      body: JSON.stringify({ workoutName }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((res) => props.handleWorkoutSummary(res))
      .catch((error) => console.error('Error: ', error));
  };
  if (props.workoutStatus === true) {
    return (
      <button
        id='endWorkout'
        onClick={() => {
          endWorkoutFunc();
          props.handleWorkoutStatusClick();
        }}
      >
        End workout
      </button>
    );
  }
};

export default EndWorkout;
