import React, {Component } from 'react';
import QuizOptions from './QuizOptions'

class Quiz extends React.Component{

  constructor(props){
    super(props);

    //create an empty object called riddle and make it equal to a method to generate dynamically
    let riddle = this.playGame();
    //in ES6 this.state= {riddle: riddle} = this.state= {riddle};
    //create a state for correct
    let correct = false;
    //create another state called gameOver
    let gameOver = false;

    this.state= {riddle, correct, gameOver};

    this.renderOptions = this.renderOptions.bind(this);
    this.checkResults = this.checkResults.bind(this);
  }


  //randomNumber() method is written to generate the question dynamically
  randomNumber(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  //In order to generate the options randomly we are creating a method
  generateRandomOptions(sum){
    let result = sum;
    let resultsArray = [];
    //inorder to generate random options initialize another array randomNumberArray
    let randomNumberArray = [];
    while(randomNumberArray.length <= 3){
      let randomNumber = this.randomNumber(1,19);
      //we need to check whether this number is unique in the array
      if(randomNumberArray.indexOf(randomNumber) > -1)continue;
      //if the number not equal to -1 add the number to the array
      randomNumberArray.push(randomNumber);
    }

    //console.log(randomNumberArray);

    //we are creating the for loop in order to run the logic inside for 3 times
    for(let i =0 ; i< 3; i++){
      //we generate four random number we generaaly add or subtract the numbers
      let addSubtract = this.randomNumber(0,1);
      let result = sum;
      if(addSubtract === 1){
        //add the number to the result
        result += randomNumberArray[i];
        resultsArray.push(result);
      }else{
        //subtract the number to the result
        result -= randomNumberArray[i];
        resultsArray.push(result);
      }

    }
    //console.log(resultsArray)
    return resultsArray;
  }

  playGame(){
    //to dynamically generate the content
    //console.log(this.randomNumber(2,45),this.randomNumber(45,47 ));
    let field1 = this.randomNumber(20,50);
    let field2 = this.randomNumber(20,50);
    let result = field1 + field2;
    let resultsArray = this.generateRandomOptions(result);
    resultsArray.push(result);
    resultsArray.sort(function(a,b){
      return 0.5 - Math.random();
    })
    console.log(resultsArray);
    let riddle = {
      resultsArray: resultsArray,
      field1: field1,
      field2: field2,
      answer: result
    };
    //console.log(riddle);
    return riddle;
  }


  checkResults(option){
    console.log('Check results called'+ option);
    if(this.state.riddle.answer === option){
      console.log('Correct Answer');
      this.setState({correct: true, gameOver: true});
    }else{
      console.log('Wrong Answer try again!')
      this.setState({correct: false, gameOver: true});
    }
  }

  //In order to loop the options we are using the map function to this.state.riddle.resultsArray
  //previously passing the child component each time was not feasable
  //<QuizOptions option={this.state.riddle.resultsArray[0]} />
  //in the map function (option, i) i is the index for the resultsArray
  renderOptions(){
  return(
    <div className="options">
      {this.state.riddle.resultsArray.map((option, i) =>
        <QuizOptions option={option} key={i} checkResults={(option) => this.checkResults(option)} />
      )}
    </div>
  );
  }

  render(){
    return(
      <div className="quiz">
        <div className="quiz-content">
          <p className="question">What is the sum of
          <span className="text-info"> {this.state.riddle.field1}</span>
          <span className="text-info"> and {this.state.riddle.field2} </span>?
          </p>
          {this.renderOptions()}
        </div>
        Correct: {this.state.correct? "True": "False"} <br/>
      GameOver: {this.state.gameOver? "True": "False"}
        <div className="play-again">
          <a className="button">Play Again</a>
        </div>
      </div>
    );
  }
}


export default Quiz;
