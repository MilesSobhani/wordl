import React from 'react';

export default function Letter(props){
  
  return(
    <>
     {props.currentRow === true ? props.currentGuess[props.letter] : ''}
    </>
  )


}