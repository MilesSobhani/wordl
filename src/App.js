import React, { Component } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import WordMatrix from './Components/WordMatrix.js'
import data from './data'

//Keyboard customized layout
const newLayout = {
  'default': [
    'q w e r t y u i o p',
     'a s d f g h j k l ',
      'z x c v b n m',
    'Submit Delete'
  ],
}

class App extends Component {
  
constructor(props){
  super(props);
  this.state = {
    answer:'wordl',
    currentRow: 0,
    currentLetter: 0,
    currentGuess: [[],[]],
    totalGuesses: 6,
    wordLength: 5,
    gameBoard: [],
    doneLoading: false

  }
  this.onKeyPress = this.onKeyPress.bind(this) 
}

//Handles all keyboard inputs
onKeyPress(button){
  if(button !== 'Submit' && button !== 'Delete'){
    
    console.log(this.state.currentRow);
    let guessUpdate = this.state.currentGuess;
    let nextBoard = this.state.gameBoard;

      nextBoard[this.state.currentRow] = this.state.currentGuess[0];

      //Restricts board changes to within the length of the word
      if(this.state.currentLetter < this.state.wordLength){
        guessUpdate[0][this.state.currentLetter] = button;
        
        //Changes state if the guessed letter is in the answer
        if(this.state.answer.includes(button)){
          guessUpdate[1][this.state.currentLetter] = 1

          //Changes state if the guessed letter is in the correct spot
          if(this.state.answer[this.state.currentLetter] === button){
            guessUpdate[1][this.state.currentLetter] = 2
          }
        }

        this.setState({
          gameBoard: nextBoard,
          currentGuess: guessUpdate,
          currentLetter: this.state.currentLetter + 1
        }, () => console.log(this.state.currentGuess));
      }
//Handles Delete and Enter inputs
    } else if(button === 'Submit'){
      this.handleGuess()
    } else {
      this.handleDelete()
    }
  }


componentDidMount(){
  //Builds the initial gameBoard and currentGuess state
  let newBoard = [];
  let firstGuess = [];
  firstGuess.push([],[]);
  for(var i = 0; i < this.state.totalGuesses; i++){
    newBoard.push([]);
    for(var j = 0; j < this.state.wordLength; j++){
      newBoard[i].push('');
      if(i === 0){
        firstGuess[0].push('');
        firstGuess[1].push(0);
      }
    }
  }
  //Generates initial answer and applies it to state
  const newAnswer = data.data1[Math.floor(Math.random() * 2309)]
  this.setState({
    gameBoard: newBoard,
    answer: newAnswer,
    doneLoading: true,
    currentGuess: firstGuess
  });

}

buildGuess(){
  let newGuess = [[],[]]
  for(var x = 0; x < this.state.wordLength; x ++){
      newGuess[0].push('');
      newGuess[1].push(0);
  }
  this.setState({
    currentGuess:newGuess
  })
}

//Handles the delete button
handleDelete(){
  let guessUpdate = this.state.currentGuess;
  let nextBoard = this.state.gameBoard;

  if(this.state.currentLetter > 0){
    
    nextBoard[this.state.currentRow][this.state.currentLetter -1] = ''
    // guessUpdate[this.state.currentLetter] --;
    
    this.setState({
      currentGuess: guessUpdate,
      currentLetter: this.state.currentLetter - 1,
      gameBoard: nextBoard
      }, console.log(this.state.gameBoard));
  }
}

//Handles the enter function, puts the guess on the state game board
handleGuess(){
  


  let guessString = this.state.currentGuess[0].join('');
  console.log(guessString)
  if(data.data2.includes(guessString) || data.data1.includes(guessString)){
    console.log("that's actually a word")
    this.setState({
      currentRow:this.state.currentRow + 1,
      currentLetter: 0
    },this.buildGuess())

  } else {
    console.log('Not a word Sorry');
  }
  console.log(this.state.currentRow)
  console.log(this.state.gameBoard)
}


  render(){
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            Hello Wordl!
          </h1>
          <p>
            a word guessing game
          </p>
        </header>
        <div>
          <p>
          the correct answer is... {this.state.answer}
          </p>
          {this.state.doneLoading
            ?
            <WordMatrix 
            wordLength={this.state.wordLength} 
            currentGuess={this.state.currentGuess}
            currentRow={this.state.currentRow} 
            answer={this.state.answer} 
            totalGuesses={this.state.totalGuesses}
            gameBoard={this.state.gameBoard}
            doneLoading = {this.state.isLoading}
            />
            : 'Loading'
          }
          <div>
          <Keyboard
              layout = {newLayout} 
              onChange={this.onChange}
              onKeyPress={this.onKeyPress}
          />           
          </div>
        </div>
      </div>
    );
  }
}
export default App;
