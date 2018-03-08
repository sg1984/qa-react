import React, { Component } from 'react';
import './App.css';

function SectionCreatedQuestions(props) {
  return (
    <div className="tooltip">
      <span className="tooltiptext">
        Here you can find the created questions and their answers.
      </span>
      <h2>Questions</h2>
    </div>
  );
}

class NewQuestionForm extends Component{
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      answer: '',
      showAnswer:false,
      position:props.position,
      showWarningNotFilled:false,
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
    this.setState({question: '', answer: '', position:0, showWarningNotFilled:false});
  }

  handleSubmit(event) {
    event.preventDefault();
    if(this.state.question !== '' && this.state.answer !== ''){
      this.props.onSubmit(event, this.state);
      this.resetState();
    }
    else{
      this.setState({
        question: this.state.question,
        answer: this.state.answer,
        showAnswer:false,
        position:this.state.position,
        showWarningNotFilled:true,
      });
    }
  }  

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <div className="tooltip">
          <span className="tooltiptext">
            Here you can create new questions and their answers.
          </span>
          <h3>Create a new question</h3>
          <div className={this.state.showWarningNotFilled ? '' : 'hidden'}>
            <p className="warning">Please, fill the two fields, I know you can do it!</p>
          </div>
        </div>
        <br/>
        <label>
          Question<br/>
          <input type="text" value={this.state.question} onChange={this.handleInputChange} name="question" placeholder="Insert your question here..." /><br/>
        </label>
        <label>
          Answer<br/>
          <textarea name="answer" value={this.state.answer} onChange={this.handleInputChange} placeholder="...and your answer here, please."/><br/>
        </label>
        <br/>
        <input className="btn btn-submit" type="submit" value="Submit" />
        <hr className="separation-vertical-line"/>
      </form>
    );
  }
}

class Forum extends Component{
  constructor(props) {
    super(props);
    this.state = {
      questions: [{
        question: "Is this little app working?",
        answer: "Yes! Of course. Why shouldn't it be working?",
        showAnswer:false,
        position:0,
      }],
      showActionButtons:true,
    };
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeAllQuestions = this.removeAllQuestions.bind(this);
    this.showAnswer = this.showAnswer.bind(this);
    this.sortQuestions = this.sortQuestions.bind(this);
  }

  handleSubmit(event, newQuestion) {
    event.preventDefault();
    let questions = this.state.questions.slice(0).concat(newQuestion);
    this.setState({questions:questions, showActionButtons:true})
  }

  removeAllQuestions(){
    this.setState({questions:[], showActionButtons:false});
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
        <li className="question-block" key={position}>
          <p onClick={(positioni) => this.showAnswer(position)}>
            <span className="question">{question.question}</span>
            <br/>
            <span className={question.showAnswer ? '' : 'hidden'}>
              <span className="awnser">{question.answer}</span>
            </span>
          </p>
        </li>
      );
    });

    const numberOfQuestions = listOfQuestions.length;

    const textToNumberOfQuestions = 'Until now, we have ' + 
      (numberOfQuestions === 0 ? 'no' : numberOfQuestions ) +
      ' question' + (numberOfQuestions === 1 ? '' : 's') + '.';

    const noQuestionsContent = (
      <div>
        <div class="no-questions">
          No questions here, please do something about it... :'(
        </div>
      </div>
    );      
    
    let contentToListOfQuestions = null;

    if(numberOfQuestions > 0){
      contentToListOfQuestions = listOfQuestions;
    }
    else{
      contentToListOfQuestions = noQuestionsContent;
    }

    return (
      <div className="grid-container">
        <div className="new-question-form">
          <NewQuestionForm 
            onSubmit={(question, answer) => this.handleSubmit(question, answer)}
            position={numberOfQuestions}
          />
        </div>

        <div className="created-questions">
          <SectionCreatedQuestions />
          <br/>
          <div className="action-questions-buttons">
            <div className={this.state.showActionButtons ? '' : 'hidden'}>
              <input className="btn btn-remove" type="button" value="Remove all questions" onClick={this.removeAllQuestions} />
              <input className="btn btn-sort" type="button" value="Sort questions" onClick={this.sortQuestions} />
            <br/>
            </div>
          </div>
          <div className="number-of-questions">
            <p>
              {textToNumberOfQuestions} Click on it to read the answer. 
              <br/>
              And we know that you can do better. Go ahead and do it!
            </p>
          </div>
          <hr/>
          <ul>
            {contentToListOfQuestions}
          </ul>
        </div>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">
            The awsome Q/A tool
          </h1>
          <div className="info">
            Built by <a target="_blank" rel="noopener noreferrer" href="https://sandrogallina.com"> Sandro Gallina</a>
          </div>
        </header>
        <Forum />  
      </div>
    );
  }
}

export default App;
