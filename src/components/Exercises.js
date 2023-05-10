import React from 'react';

const Exercises = (props) => {
  //alert user to confirm selection when clicking exercise button?

  //when user clicks exercise button, send post request to /add (using fetch)
  const handleExerciseClick = async (exercise) => {
    console.log('exercise: ', typeof exercise);
    fetch(`http://localhost:3000/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ exercise }),
    })
      .then((res) => res.json())
      .catch((error) => console.error('Error: ', error));
  };
  //MUST HAVE 2 RETURN STATEMENTS WHEN USING MAP TO RENDER
  //one return for entire div, one for each indivual li
  return (
    <div className="exercisesDiv">
      <ul>
        {props.name.map((data, index) => {
          return (
            <li className="exercises" key={index}>
              <button
                className="button-59"
                onClick={() => handleExerciseClick(data.name)}
              >
                {data.name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

//same as:
// return (
//     <div>
//     <li>bench press</li>
//     <li>dumbbell fly</li>
//     <li>push up</li>
//      </div>
// )
//instead just creating an array with each element being a unique li, but have to return result to map function

export default Exercises;
