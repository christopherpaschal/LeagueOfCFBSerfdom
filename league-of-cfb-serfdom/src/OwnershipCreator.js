import React, { Component } from 'react';
import firebase from "./firebase";
import Select from 'react-select';
import 'react-select/dist/react-select.css';

export default class ManagerTools extends Component {

  constructor(props) {
    super(props);
    var db = firebase.database();
    var teams = [];
    db.ref('/teams').orderByKey().on('value', function(snapshot) {
      snapshot.forEach(function(child) {
        teams.push({
          label: child.val().TeamName,
          value: child.val().TeamID
        });
      });
    });
    this.state = {
      teams: teams,
      selectedTeam: 'None'
    }
  }

  componentWillMount() {

  }

  handleChange = (value) => {
    const team = value;
    this.setState({
      selectedTeam: team
    });
  }

  render() {

    const options = [
      { value: 1, label: 'Team 1'},
      { value: 2, label: 'Team 2'},
      { value: 3, label: 'Team 3'}
    ];


    return (
      <div className="ownership-creator">
        <h3>Ownership Creator</h3>
        Select a Team: <Select options={this.state.teams}
                               value={this.state.selectedTeam}
                               onChange={this.handleChange} />
      </div>
    )
  }

}
