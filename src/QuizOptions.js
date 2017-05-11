import React, { Component } from 'react';

class QuizOptions extends React.Component{
  constructor(props){
    super(props);

    this.state = {};
    this.callParentCheckOptions = this.callParentCheckOptions.bind(this);
  }

  callParentCheckOptions(){
      this.props.checkResults(this.props.option);
  }

  render() {
    return(
      <div className="fields animated bounceInDown" onClick={this.callParentCheckOptions}>
        <div className="field-block">{this.props.option}</div>
      </div>
    );
  }
}

export default QuizOptions;
