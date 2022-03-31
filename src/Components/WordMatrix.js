import React from 'react';
import Row from './Row.js'

export default function WordMatrix(props){

  return(
    <div>
      {props.gameBoard[props.currentRow].map((row, index) => 
      <div className={'row'}>

        <Row 
        currentRow={props.currentRow} 
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