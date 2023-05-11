import React from 'react';
import { useState } from 'react';
import Greeting from './Greeting.js';
import UpperBody from './UpperBody.js';
import LowerBody from './LowerBody.js';
import Exercises from './Exercises.js';
import EndWorkout from './EndWorkout.js';
import WorkoutSummary from './WorkoutSummary';

const MainPage = () => {
  //workoutStatus set to false originally, then when begin workout button is pressed, set to true
  const [workoutStatus, setWorkoutStatus] = useState(false);
  const [workoutName, setWorkoutName] = useState('');
  //useState to contain data from api request (exercises returned from request) so they can be rendered in Exercises component
  const [name, setName] = useState([]);
  //add workout summary to state
  const [workoutSummary, setWorkoutSummary] = useState({});
  //create state to update css styling when new muscle button has been clicked
  const [exerciseListCSS, setExerciseListCSS] = useState(false);

  //handle begin workout button click
  const handleWorkoutStatusClick = () => setWorkoutStatus(!workoutStatus);

  //maintain name of workout to pass around to components
  //USE ID SENT FROM ORIGINAL POST REQUEST INSTEAD??
  //switched to id ^
  const handleWorkoutName = (id) => setWorkoutName(id);

  //create function that on click will send a get request to an api to retrieve exercises corresponding to the name of button clicked
  //update
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
      // console.log('result: ', result);
    } catch (err) {
      console.error('Error: ', err);
    }
  };

  //function to update state when workout summary comes in
  const handleWorkoutSummary = (workoutFinished) => {
    setWorkoutSummary(workoutFinished);
  };

  return (
    <div className="wrapper">
      <Greeting
        workoutStatus={workoutStatus}
        handleWorkoutStatusClick={handleWorkoutStatusClick}
        handleWorkoutName={handleWorkoutName}
        workoutSummary={workoutSummary}
      />
      <div className="innerBody">
        <UpperBody handleClick={handleClick} workoutStatus={workoutStatus} />
        <LowerBody handleClick={handleClick} workoutStatus={workoutStatus} />
        <Exercises
          name={name}
          workoutStatus={workoutStatus}
          workoutName={workoutName}
        />
      </div>
      <div className="footer">
        <EndWorkout
          workoutStatus={workoutStatus}
          handleWorkoutStatusClick={handleWorkoutStatusClick}
          handleWorkoutSummary={handleWorkoutSummary}
          workoutName={workoutName}
        />
      </div>
      <div className="summaryDiv">
        <WorkoutSummary
          workoutSummary={workoutSummary}
          handleWorkoutSummary={handleWorkoutSummary}
        />
      </div>
    </div>
  );
};

export default MainPage;
