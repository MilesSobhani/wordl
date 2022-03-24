import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';
import WordMatrix from './Components/WordMatrix.js'
import Keyboard from './Components/Keyboard.js'

class App extends React.Component {
constructor(props){
  super(props);
  this.state = {
    answer:'wordl',
    currentRow: 0,
    currentGuess: ['s','t',,,],
    totalGuesses: 6,
    wordLength: 5

  }
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
          <WordMatrix wordLength={this.state.wordLength} currentGuess={this.state.currentGuess}
          currentRow={this.state.currentRow} answer={this.state.answer} 
          totalGuesses={this.state.totalGuesses}/>
          <Keyboard />
        </div>
      </div>
    );
  }
}
export default App;
