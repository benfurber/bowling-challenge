import React, { Component } from 'react';

import { Button } from 'semantic-ui-react'

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Bowling!</h1>
        </header>
        <p className="App-intro">
          Yo<br/>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Button>Click Here</Button>
      </div>
    );
  }
}

export default App;
