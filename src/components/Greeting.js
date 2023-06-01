import React, { Component } from 'react';
import { useState } from 'react';

const Greeting = (props) => {
  // //when begin workout button is clicked, prompt user for name of workout
  // //after entering name, send a post request with name entered and create a new workout document with it in mongoDB
  // //invoke handleWorkoutName with input to allow passing of id workout throughout components (so we can identify workout to add exercises too in database)
  // const inputName = async () => {
  //   let input = prompt('What do you want to name this workout?');
  //   alert(`You have named this workout '${input}'`);
  //   fetch('http://localhost:3000/add', {
  //     method: 'POST',
  //     body: JSON.stringify({ workoutName: input }),
  //     headers: { 'Content-Type': 'application/json' },
  //   })
  //     .then((res) => res.json())
  //     .then((res) => props.handleWorkoutName(res.id))
  //     // .then((res) => console.log('begin workout response from server', res.id))
  //     .catch((error) => console.error('Error: ', error));
  // };

  //workoutStatus set to false originally, then when begin workout button is pressed, set to true
  // console.log('props workoutStatus', props.workoutStatus);
  let keys = Object.keys(props.workoutSummary);
  if (props.workoutStatus === false && !keys.length) {
    return (
      <div className="Greeting">
        <h1 className="Greeting1">Welcome!</h1>
        <h1 className="Greeting1">Start your workout whenever you're ready</h1>
        <button
          className="beginWorkout"
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
