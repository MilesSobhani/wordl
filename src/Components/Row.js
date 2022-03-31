import react from "react";
import Letter from './Letter.js'

export default function Row(props){

  const letterArr = [];
  let current = false;
  for(var i = 0; i < props.wordLength; i++){
    letterArr.push('');
  }
  if(props.currentRow === props.row){
    current = true;
  }
  return(
    <>
      {letterArr.map((letter, index) =>
      <div className={'column'}>
        <Letter 
        letter={index}
        currentRow={current}
        gameBoard={props.gameBoard}
        coordinates={[props.row,index]}
        />
      </div>
      )}
    </>
  )
}