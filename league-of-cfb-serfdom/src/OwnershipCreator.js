import React, { Component } from 'react';
import firebase from "./firebase";
import Select from 'react-select';
import 'react-select/dist/react-select.css';

export default class ManagerTools extends Component {

  constructor(props) {
    super(props);
    var db = firebase.database();

    var teams = [];
    var ref = db.ref('teams');
    ref.orderByChild('IsOwned').equalTo(0).on('child_added', function(snapshot) {
      teams.push({
        label: snapshot.val().TeamName,
        value: snapshot.val().TeamID
      })
    });

    var players = [];
    ref = db.ref('players');
    ref.on('child_added', function(snapshot) {
      players.push({
        label: snapshot.val().PlayerName,
        value: snapshot.val().PlayerName
      })
    });

    this.state = {
      teams: teams,
      players: players,
      selectedTeam: 'None',
      selectedPlayer: 'None'
    }
  }

  handleTeamChange = (value) => {
    const team = value;
    this.setState({
      selectedTeam: team.value
    });
  }

  handlePlayerChange = (value) => {
    const player = value;
    this.setState({
      selectedPlayer: player.value
    });
  }

  assignTeam = () => {
    console.log(this.state.selectedPlayer + ' gets ' + this.state.selectedTeam);
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
                               onChange={this.handleTeamChange} />
        Select a Player: <Select options={this.state.players}
                                 value={this.state.selectedPlayer}
                                 onChange={this.handlePlayerChange} />
        <button type='button' onClick={this.assignTeam}>Assign Team</button>
      </div>
    )
  }

}
