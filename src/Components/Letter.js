import React from 'react';

export default function Letter(props){
  
  let styleChange = 'default'

  if(props.gameBoard[props.coordinates[0]][props.coordinates[1]][1] === 1
    && props.currentRow === false
    ){
      styleChange = 'correctLetter'
    }
    if(props.gameBoard[props.coordinates[0]][props.coordinates[1]][1] === 2
      && props.currentRow === false
      ){
        styleChange = 'correctSpot'
      }
      
      
  return(
    <div className={styleChange}>
     {props.gameBoard[props.coordinates[0]][props.coordinates[1]][0]}
    </div>
  )


}