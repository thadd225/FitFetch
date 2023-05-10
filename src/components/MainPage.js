import React from 'react';
import { useState } from 'react';
import Greeting from './Greeting.js';
import UpperBody from './UpperBody.js';
import LowerBody from './LowerBody.js';
import Exercises from './Exercises.js';
import EndWorkout from './EndWorkout.js';

const MainPage = () => {
  //workoutStatus set to false originally, then when begin workout button is pressed, set to true
  const [workoutStatus, setWorkoutStatus] = useState(false);
  console.log('workoutStatus', workoutStatus);
  //useState to render data from api request
  //exercise state
  const [name, setName] = useState([]);

  //handle begin workout button click
  const handleWorkoutStatusClick = () => setWorkoutStatus(!workoutStatus);
  //create function that on click will send a get request to an api with the endpoint corresponding to the name of button clicked
  const handleClick = async (muscle) => {
    try {
      const response = await fetch(
        `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`,
        {
          method: 'GET',
          headers: {
            'X-Api-Key': '2tSoIZoG4mw6maSENfzu1g==gQmUjT6aQyPq7PlD',
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setName(result);
      console.log('result: ', result);
    } catch (err) {
      console.error('Error: ', err);
    }
  };
  return (
    <div className="wrapper">
      <Greeting
        workoutStatus={workoutStatus}
        handleWorkoutStatusClick={handleWorkoutStatusClick}
      />
      <div className="innerBody">
        <UpperBody handleClick={handleClick} workoutStatus={workoutStatus} />
        <LowerBody handleClick={handleClick} workoutStatus={workoutStatus} />
        <Exercises name={name} workoutStatus={workoutStatus} />
      </div>
      <div className="footer">
        <EndWorkout
          workoutStatus={workoutStatus}
          handleWorkoutStatusClick={handleWorkoutStatusClick}
        />
      </div>
    </div>
  );
};

export default MainPage;
