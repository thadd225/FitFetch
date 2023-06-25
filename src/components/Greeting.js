import React, { Component } from 'react';
import { useState } from 'react';

const Greeting = (props) => {
  //workoutStatus set to false originally, then when begin workout button is pressed, set to true
  let keys = Object.keys(props.workoutSummary);
  if (props.workoutStatus === false && !keys.length) {
    return (
      <div className='Greeting'>
        <h1 className='Greeting1'>Welcome!</h1>
        <h1 className='Greeting1'>Start your workout whenever you're ready</h1>
        <button
          className='beginWorkout'
          onClick={() => {
            props.handleWorkoutStatusClick();
            props.inputName();
          }}
        >
          Begin workout
        </button>
      </div>
    );
  }
};

export default Greeting;
