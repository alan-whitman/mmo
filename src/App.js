import React, { Component } from 'react';
import './reset.css';
import './App.css';
import Map from './components/Map';
import SignUp from './components/SignUp';


class App extends Component {
  constructor() {
    super();
    this.state = {
      signedUp: false,
      playerName: ''
    }
    this.signUp = this.signUp.bind(this);
    this.submitSignUp = this.submitSignUp.bind(this);
  }
  signUp(name) {
    this.setState({playerName: name});
  }
  submitSignUp() {
    if (this.state.playerName.trim() !== '')
      this.setState({signedUp: true})
  }
  render() {
    return (
      <div className="App">
        {!this.state.signedUp ? 
          <SignUp signUp={this.signUp} submitSignUp={this.submitSignUp} />
        : 
          <Map playerName={this.state.playerName} />
        }
      </div>
    );
  }
}

export default App;
