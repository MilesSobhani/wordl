import React from 'react';

export default function Letter(props){
  
  return(
    <>
     {props.gameBoard[props.coordinates[0]][props.coordinates[1]]}
    </>
  )


}