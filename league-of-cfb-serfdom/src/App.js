import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import firebase from "./firebase";
import logo from './logo.svg';
import './App.css';

class App extends Component {

  enterTeam = () => {
    // var database = firebase.database();
    // database.ref('teams/' + this.state.id).set({
    //   TeamID: this.state.id,
    //   TeamName: this.state.name
    // });
    var database = firebase.database();
    database.ref('teams').on('value', function(snapshot) {
      console.log('Count: ' + snapshot.numChildren());
    });
    this.setState({
      id: '',
      name: ''
    });
  }

  state = {
    name: '',
    id: ''
  }

  nameChange = (e) => {
    const newName = e.target.value;
    this.setState({
      name: newName,
      id: newName.replace(' ', '')
    });
  }

  render() {
    return (
      <div className="App">
        <Tabs>
          <TabList>
            <Tab>Title</Tab>
            <Tab>Enter Team</Tab>
          </TabList>
          <TabPanel>
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Welcome to React</h2>
            </div>
            <p className="App-intro">
              To get started, edit <code>src/App.js</code> and save to reload.
            </p>
          </TabPanel>
          <TabPanel>
            <div>
              Team Name: <input type='text' name='TeamName' onChange={this.nameChange} value={this.state.name} />
              <button type='button' onClick={this.enterTeam} >Enter Team</button>
            </div>
          </TabPanel>
        </Tabs>
      </div>

    );
  }
}

export default App;
