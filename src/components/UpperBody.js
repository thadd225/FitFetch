import React from 'react';

const UpperBody = (props) => {
  return (
    <div className="upperBody">
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
};

export default UpperBody;
