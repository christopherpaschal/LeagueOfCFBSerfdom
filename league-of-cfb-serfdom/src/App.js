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
            <Tab>Manager Tools</Tab>
            <Tab>View Rosters</Tab>
            <Tab>View Standings</Tab>
          </TabList>
          <TabPanel>
            <p>Manager Tools component renders here</p>
          </TabPanel>
          <TabPanel>
            <p>Rosters component goes here</p>
          </TabPanel>
          <TabPanel>
            <p>Standings component goes here</p>
          </TabPanel>
        </Tabs>
      </div>

    );
  }
}

export default App;
