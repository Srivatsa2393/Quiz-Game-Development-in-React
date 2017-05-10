import React, { Component } from 'react';

class QuizOptions extends React.Component{
  render() {
    return(
      <div className="fields">
        <div className="field-block">{this.props.option}</div>
      </div>
    );
  }
}

export default QuizOptions;
