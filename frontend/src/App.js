import hash from 'object-hash';
import moment from 'moment';
import React from 'react';
import ReactModal from 'react-modal';

import './App.css';

function PhotoToGuess(props) {
  const birthday = moment('12-14-2019', 'MM-DD-YYYY');
  const targetDate = moment(props.date, 'MM-DD-YYYY');
  return (
    <div>
      <img
        src={`${process.env.PUBLIC_URL}/secrets/${props.secret}/${props.date}.JPG`}
        className="photo"
      />
      <p>{targetDate.diff(birthday, 'weeks')}</p>
    </div>
  );
}

function PhotoApp(props) {
  return (
    <div className="App">
      <PhotoToGuess secret={props.secret} date="2-21-2021" />
    </div>
  );
}

class App extends React.Component {
  constructor () {
    super();

    this.state = {
      secret: '',
      showModal: true,
      value: ''
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  
  handleOpenModal () {
    this.setState({ showModal: true });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }

  handleChange (event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit (event) {
    this.setState({ secret: hash(this.state.value) });
    event.preventDefault();
    this.handleCloseModal();
  }
  
  render () {
    return (
      <div>
        <PhotoApp secret={this.state.secret} />
        <ReactModal 
           isOpen={this.state.showModal}
        >
          <p>We don't want the whole internet to play this game. She's our Berry.</p>
          
          <form onSubmit={this.handleSubmit}>
            <label>
              What's her nickname? Hint: it's delicious.
              <br /><br />
              <input type="text" value={this.state.value} onChange={this.handleChange} />
              <br /><br />
            </label>
            <input type="submit" value="Play" onSubmit={this.handleSubmit} />
          </form>
        </ReactModal>
      </div>
    );
  }
}

export default App;
