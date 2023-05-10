import React from 'react';

const UpperBody = (props) => {
  if (props.workoutStatus === true) {
    return (
      <div className="upperBody">
        <h2 className="Greeting2">
          Which muscles would you like exercises for?
        </h2>
        <h2>Upper Body</h2>
        <div className="upperBodyButtons">
          <button
            className="shoulders"
            onClick={() => {
              props.handleClick('shoulders');
            }}
          >
            Shoulders
          </button>
          <button
            className="biceps"
            onClick={() => {
              props.handleClick('biceps');
            }}
          >
            Biceps
          </button>
          <button
            className="triceps"
            onClick={() => {
              props.handleClick('triceps');
            }}
          >
            Triceps
          </button>
          <button
            className="chest"
            onClick={() => {
              props.handleClick('chest');
            }}
          >
            Chest
          </button>
          <button
            className="back"
            onClick={() => {
              props.handleClick('lats');
            }}
          >
            Back
          </button>
          <button
            className="abdominals"
            onClick={() => {
              props.handleClick('abdominals');
            }}
          >
            Abdominals
          </button>
        </div>
      </div>
    );
  }
};

export default UpperBody;
