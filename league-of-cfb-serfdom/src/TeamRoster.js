import React, { Component } from 'react';
import firebase from './firebase';

export default class TeamRoster extends Component {

  state = {
    teams: []
  }

  componentWillMount() {

    let ownedTeams = [];
    const owner = this.props.owner;

    const ref = firebase.database().ref('ownerships');
    ref.orderByChild('Owner').on('child_added', function(snapshot) {
      const team = snapshot.val();
      if (team.PlayerID === owner) {
        ownedTeams.push({
          'id': team.TeamID
        });
      }
    });

    this.setState({
      teams: ownedTeams
    });
  }

  render() {

    const teamsArray = this.state.teams.map((team) => {
      return <p key={team.id}>{team.id}</p>
    });

    return (
      <div className="team-roster">
        <div>
          <h3>{this.props.owner}</h3>
        </div>
        <div>
          {teamsArray}
        </div>
      </div>
    )
  }
}
