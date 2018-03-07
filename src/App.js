import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class NewQuestionForm extends Component{
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      answer: '',
      showAnswer:false,
      position:props.position,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  resetState(){
    this.setState({question: '', answer: '', position:0});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(event, this.state);
    this.resetState();
  }  

  render(){
    return(
      <form onSubmit={this.handleSubmit}>

        <div className="tooltip">
          <span className="tooltiptext">
            Here you can create new questions and their answers.
          </span>
          <h2>Create new question</h2>
        </div>
        <br/>
        <label>
          Question:<br/>
          <input type="text" value={this.state.question} onChange={this.handleInputChange} name="question" placeholder="Insert your question here..." /><br/>
        </label>
        <label>
          Anwser:<br/>
          <textarea name="answer" value={this.state.answer} onChange={this.handleInputChange} placeholder="... and your anwser here, please."/><br/>
        </label>
        <br/>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

class Forum extends Component{
  constructor(props) {
    super(props);
    this.state = {
      questions: [{
        question: 'Is this little app working?',
        answer: 'Yes!',
        showAnswer:false,
        position:0,
      }],
    };
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeAllQuestions = this.removeAllQuestions.bind(this);
    this.showAnswer = this.showAnswer.bind(this);
    this.sortQuestions = this.sortQuestions.bind(this);
  }

  handleSubmit(event, newQuestion) {
    event.preventDefault();
    let questions = this.state.questions.slice(0).concat(newQuestion);
    this.setState({questions:questions})
  }

  removeAllQuestions(){
    this.setState({questions:[]});
  }

  sortQuestions(){
    let questions = this.state.questions.slice(0);
    const byAlpha = function(a, b) {
      var questionA = a.question.toUpperCase()
      var questionB = b.question.toUpperCase()
      if (a.localCompare > b)
      if (questionA < questionB) { return -1 }
      if (questionA > questionB) { return 1 }
      return 0;
    }
    questions = questions.sort(byAlpha);
    this.setState({questions:questions});
  }

  showAnswer(position){
    const questions = this.state.questions.slice();
    questions[position] = {
      question: questions[position].question,
      answer: questions[position].answer,
      showAnswer: !questions[position].showAnswer,
      position:questions[position].position,    
    };

    this.setState({questions:questions});
  }

  render(){
    const questions = this.state.questions.slice();

    const listOfQuestions = questions.map((question, position) => {
      return (
        <li key={position}>
          <p onClick={(positioni) => this.showAnswer(position)}>{question.question}</p>
          <p className={question.showAnswer ? '' : 'hidden'}>{question.answer}</p>
        </li>
      );
    });

    const numberOfQuestions = listOfQuestions.length;

    if( numberOfQuestions > 0 ){
      return (
        <div>
          <div className="tooltip">
            <span className="tooltiptext">
              Here you can find the created questions and their answers.
            </span>
            <h2>Created questions</h2>
          </div>
          <br/>
          Questions: {numberOfQuestions}
          <br/>
          <input type="button" value="Remove all questions" onClick={this.removeAllQuestions} />
          <br/>
          <input type="button" value="Sort questions" onClick={this.sortQuestions} />
          <ul>
            {listOfQuestions}
          </ul>
          <NewQuestionForm 
            onSubmit={(question, anwser) => this.handleSubmit(question, anwser)}
            position={numberOfQuestions}
            />
        </div>
      );
    }
    else{
      return (
        <div>
          <div className="tooltip">
            <span className="tooltiptext">
              Here you can find the created questions and their answers.
            </span>
            <h2>Created questions</h2>
          </div>
          
          No questions yet :-/
          <NewQuestionForm 
            onSubmit={(question, anwser) => this.handleSubmit(question, anwser)}
            position={numberOfQuestions}
            />
        </div>
      );      
    }
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">The awsome Q/A tool</h1>
        </header>
        <Forum />  
      </div>
    );
  }
}

export default App;
