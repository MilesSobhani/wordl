import React, { Component } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import WordMatrix from './Components/WordMatrix.js'
import data from './data'

//Keyboard customized layout
const newLayout = {
  'default': [
    'Q W E R T Y U I O P',
     'A S D F G H J K L',
      ' Z X C V B N M ',
    'Submit Delete'
  ],
}

class App extends Component {
  
constructor(props){
  super(props);
  this.state = {
    answer:'wordl',
    currentLetter: 0,
    currentRow: 0,
    totalGuesses: 6,
    wordLength: 5,
    gameBoard: [],
    doneLoading: false

  }
  this.onKeyPress = this.onKeyPress.bind(this) 
}

//Handles all keyboard inputs
onKeyPress(button){
  const {currentLetter, currentRow, gameBoard, wordLength, answer} = this.state;
  if(button !== 'Submit' && button !== 'Delete'){
    
    console.log(currentRow);
    let nextBoard = gameBoard;

      // nextBoard[this.state.currentRow] = this.state.currentGuess[0];

      //Restricts board changes to within the length of the word
      if(currentLetter < wordLength){
        nextBoard[currentRow][currentLetter][0] = button;
        
        //Changes state if the guessed letter is in the answer
        if(answer.includes(button)){
          nextBoard[currentRow][currentLetter][1] = 1

          //Changes state if the guessed letter is in the correct spot
          if(answer[currentLetter] === button){
            nextBoard[currentRow][currentLetter][1] = 2
          }
        }

        this.setState({
          gameBoard: nextBoard,
          currentLetter: currentLetter + 1
        });
      }
//Handles Delete and Enter inputs
    } else if(button === 'Submit'){
      this.handleGuess()
    } else {
      this.handleDelete()
    }
  }


componentDidMount(){
  //Builds the initial gameBoard
  const {totalGuesses, wordLength} = this.state;
  let newBoard = [];
  for(var i = 0; i < totalGuesses; i++){
    newBoard.push([]);
    for(var j = 0; j < wordLength; j++){
      newBoard[i].push([])
      newBoard[i][j].push('');
      newBoard[i][j].push(0);
    }
  }
  //Generates initial answer and applies it to state
  const newAnswer = data.data1[Math.floor(Math.random() * 2309)].toUpperCase()
  this.setState({
    gameBoard: newBoard,
    answer: newAnswer,
    doneLoading: true,
  });

}

//Handles the delete button
handleDelete(){
  const {currentLetter, currentRow, gameBoard} = this.state;
  let nextBoard = gameBoard;

  if(currentLetter > 0){
    
    nextBoard[currentRow][currentLetter -1][0] = ''
    
    this.setState({
      currentLetter: currentLetter - 1,
      gameBoard: nextBoard
      }, console.log(gameBoard));
  }
}

//Handles the enter function, puts the guess on the state game board
handleGuess(){
  const {currentRow, gameBoard, answer} = this.state;
  let guessString = ''
  for(var y = 0; y < gameBoard[currentRow].length; y++){
    guessString = guessString + gameBoard[currentRow][y][0]
  }
  guessString = guessString.toLowerCase();
  //Victory clause
  if(guessString === answer){
    console.log('VICTORY!!! The Answer is ' + guessString)
    this.setState({
      currentRow: -1,
      currentLetter: -1
    })
  } else {
    console.log(guessString)

    //Checks our data to see if the guess is a word
    if(data.data2.includes(guessString) || data.data1.includes(guessString)){
      console.log("that's actually a word")
      this.setState({
        currentRow: currentRow + 1,
        currentLetter: 0
      })
  
    } else {
      console.log('Not a word Sorry');
    }
    console.log(currentRow)
    console.log(gameBoard)
  }
}


  render(){
    return (
      <div className="App">
        <header className={"header"}>
          <h1>
            Hello Wordl!
          </h1>
          <h2>
            a word guessing game
          </h2>
        </header>
        <div>
          <p>
          the correct answer is... {this.state.answer}
          </p>
          {this.state.doneLoading === true
            ?
            <WordMatrix 
            wordLength={this.state.wordLength} 
            currentRow={this.state.currentRow} 
            answer={this.state.answer} 
            totalGuesses={this.state.totalGuesses}
            gameBoard={this.state.gameBoard}
            doneLoading = {this.state.isLoading}
            />
            : 'Loading'
          }
          <div className={'keyboard'}>
          <Keyboard
              layout = {newLayout} 
              onKeyPress={this.onKeyPress}
          />           
          </div>
        </div>
        <footer className={'header'}>
          <p>
            Inspired by <a href={'https://www.nytimes.com/games/wordle/index.html'}>Wordle </a><br></br>
            Miles Sobhani 2022
          </p>
        </footer>
      </div>
    );
  }
}
export default App;
