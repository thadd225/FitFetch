import React from 'react';
import { useState } from 'react';

const EndWorkout = (props) => {
  if (props.workoutStatus === true) {
    return (
      <button id="endWorkout" onClick={() => props.handleWorkoutStatusClick()}>
        End workout
      </button>
    );
  }
};

export default EndWorkout;
