import React from 'react';
import Greeting from './Greeting.js';
import UpperBody from './UpperBody.js';
import LowerBody from './LowerBody.js';

const MainPage = () => {
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
      console.log(result);
    } catch (err) {
      console.error('Error: ', err);
    }
  };
  return (
    <div className="wrapper">
      <Greeting />
      <div className="innerBody">
        <UpperBody handleClick={handleClick} />
        <LowerBody handleClick={handleClick} />
      </div>
    </div>
  );
};

export default MainPage;
