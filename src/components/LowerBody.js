import React from 'react';

const LowerBody = (props) => {
  if (props.workoutStatus === true) {
    return (
      <div className="lowerBody">
        <h2>Lower Body</h2>
        <div className="lowerBodyButtons">
          <button
            className="quadriceps"
            onClick={() => {
              props.handleClick('quadriceps');
            }}
          >
            Quadriceps
          </button>
          <button
            className="hamstrings"
            onClick={() => {
              props.handleClick('hamstrings');
            }}
          >
            Hamstrings
          </button>
          <button
            className="calves"
            onClick={() => {
              props.handleClick('calves');
            }}
          >
            Calves
          </button>
          <button
            className="glutes"
            onClick={() => {
              props.handleClick('glutes');
            }}
          >
            Glutes
          </button>
        </div>
      </div>
    );
  }
};

export default LowerBody;
