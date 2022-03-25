import React from 'react';
import Row from './Row.js'

export default function WordMatrix(props){

  //Determines how many rows to make and creates them
  const guessArr = [];
  for(var i = 0; i < props.totalGuesses; i++){
    guessArr.push('');
  }
  return(
    <div>
      {guessArr.map((row, index) => 
      <div className={'row'}>

        <Row 
        currentRow={props.currentRow} 
        currentGuess={props.currentGuess} 
        row={index} 
        wordLength={props.wordLength} 
        answer={props.answer}
        gameBoard={props.gameBoard}
        />

      </div>
      )}
    </div>
  )
}