import React from 'react';
import { useEffect } from 'react';

const Exercises = (props) => {
  //alert user to confirm selection when clicking exercise button?
  //when user clicks exercise button, send post request to /add containing the exercise name in the body as well as workout name (so router knows which workout to add exercise to)
  const handleExerciseClick = async (exercise) => {
    fetch(`http://localhost:3000/add`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        exercise: exercise,
        workoutName: props.workoutName,
      }),
    })
      .then((res) => res.json())
      .catch((error) => console.error('Error: ', error));
  };

  //when new muscle group button (props.name) is clicked, remove all line-through decorations on buttons
  //note: getElementsByTageName returns a collection of elements, .style can only be used on one individual element, so must iterate through
  useEffect(() => {
    const buttons = document.getElementsByTagName('button');
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].style.textDecoration = 'none';
    }
  }, [props.name]);
  //mark off any exercises that have been clicked
  const crossOutExercise = (id) => {
    document.getElementById(id).style.textDecoration = 'line-through';
  };
  //render exercises only if
  if (props.workoutStatus === true) {
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
                  id={data.name}
                  onClick={() => {
                    handleExerciseClick(data.name);
                    crossOutExercise(data.name);
                  }}
                >
                  {data.name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
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
