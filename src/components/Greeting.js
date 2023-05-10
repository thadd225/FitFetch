import React, { Component } from 'react';
import { useState } from 'react';

const Greeting = (props) => {
  //   let input;
  //when begin workout button is clicked, prompt user for name of workout
  //after entering name, send a post request with name entered and create a new workout document with it in mongoDB
  const inputName = async () => {
    let input = prompt('What do you want to name this workout?');
    alert(`You have named this workout '${input}'`);
    fetch('http://localhost:3000/add', {
      method: 'POST',
      body: JSON.stringify({ workoutName: input }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then(() => console.log('post request response received on front end'))
      .catch((error) => console.error('Error: ', error));
  };
  //workoutStatus set to false originally, then when begin workout button is pressed, set to true
  console.log('props workoutStatus', props.workoutStatus);
  if (props.workoutStatus === false) {
    return (
      <div className="Greeting">
        <h1 className="Greeting1">Welcome!</h1>
        <h1 className="Greeting1">Start your workout whenever you're ready</h1>
        <button
          className="beginWorkout"
          onClick={() => {
            props.handleWorkoutStatusClick();
            inputName();
          }}
        >
          Begin workout
        </button>
        {/* <h2 className="Greeting2">Which muscles would you like exercises for?</h2> */}
      </div>
    );
  }
};

export default Greeting;