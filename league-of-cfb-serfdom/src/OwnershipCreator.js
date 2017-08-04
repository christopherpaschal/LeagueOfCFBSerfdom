import React, { Component } from 'react';
import firebase from "./firebase";
import Select from 'react-select';
import 'react-select/dist/react-select.css';

export default class ManagerTools extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedTeam: 'None',
      selectedPlayer: 'None'
    }
  }

  componentWillMount() {
    this.fillDropdowns();
  }

  fillDropdowns = () => {
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

    this.setState({
      teams: teams,
      players: players
    });
  }

  handleTeamChange = (value) => {
    const team = value;
    if (team) {
      this.setState({
        selectedTeam: team.value
      });
    }
  }

  handlePlayerChange = (value) => {
    const player = value;
    if (player) {
      this.setState({
        selectedPlayer: player.value
      });
    }
  }

  assignTeam = () => {
    if (this.state.team & this.state.player) {
      console.log(this.state.selectedPlayer + ' gets ' + this.state.selectedTeam);
      const today = new Date();
      const dateString = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      const ownershipId = this.state.selectedPlayer + 'owns' + this.state.selectedTeam + dateString;

      var db = firebase.database();

      db.ref('ownerships').child(ownershipId).set({
        'OwnershipID': ownershipId,
        'PlayerID': this.state.selectedPlayer,
        'TeamID': this.state.selectedTeam,
        'IsActive': 1,
        'DateAcquired': dateString
      });

      db.ref('teams').child(this.state.selectedTeam).update({
        'IsOwned': 1
      });

      this.setState({
        selectedTeam: '',
        selectedPlayer: ''
      });

      this.fillDropdowns();
    }

  }

  render() {

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
