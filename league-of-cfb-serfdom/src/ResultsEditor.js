import React, { Component } from 'react';
import firebase from './firebase';

export default class ManagerTools extends Component {

  state = {
    attemptedPassword: '',
    showTool: true,
    teams: []
  }

  componentWillMount() {
    this.fillTeams();
  }

  fillTeams = () => {
    var db = firebase.database();

    var teams = [];
    var ref = db.ref('teams');
    ref.orderByChild('TeamName').on('child_added', function(snapshot) {
      if (snapshot.val().TeamID) {
        teams.push({
          name: snapshot.val().TeamName,
          id: snapshot.val().TeamID,
          isWinner: false
        });
      }
    });

    this.setState({
      teams: teams
    });
  }

  handleChange = (e) => {
    const password = e.target.value;
    this.setState({
      attemptedPassword: password
    });
  }

  attemptLogin = () => {
    const password = this.state.attemptedPassword;
    if (password === 'manager1974') {
      this.setState({
        showTool: true,
        attemptedPassword: ''
      });
    } else {
      this.setState({
        attemptedPassword: ''
      });
    }
  }

  handleWinChange = (e) => {
    const didTeamWin = e.target.checked;
    const teamToUpdate = e.target.value;

    this.setState((prevState) => ({
      teams: prevState.teams.map((team) => {
        if (team.id === teamToUpdate) {
          return {...team, isWinner: didTeamWin };
        } else {
          return team;
        }
      })
    }));
  }

  handleWeekChange = (e) => {
    const week = e.target.value;
    this.setState({
      week: week
    });
  }

  submitResults = () => {
    var ref = firebase.database().ref('points');

    var winners = [];
    this.state.teams.map((team) => {
      if (team.isWinner) {
        winners.push(team.id);
      }
    });
    if (winners.length > 0 & this.state.week != '') {
      winners.forEach((team) => {
        const pointsId = team + this.state.week;
        ref.child(pointsId).set({
          'PointsID': pointsId,
          'Week': this.state.week,
          'TeamID': team,
          'PointsEarned': 10
        });
      });
    }
  }

  render() {

    let teamsEdit = this.state.teams.map((team) => {
      return (
        <div key={team.id}>
          <label htmlFor={team.id}>{team.name}</label>
          <input id={team.id} type="checkbox"
                              onChange={this.handleWinChange}
                              value={team.id}
          />
        </div>
      );
    });

    let tool = null;
    if (this.state.showTool) {
      tool = (
        <div key="ResultsEditor">
          {teamsEdit}
          <div>
            What week is it? <input type='text'
                                    value={this.state.week}
                                    onChange={this.handleWeekChange}
                             />
           <button type='button' onClick={this.submitResults}>Enter Results</button>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div>
          Manager password: <input value={this.state.attemptedPassword}
                                   type='password'
                                   name='manager_password'
                                   onChange={this.handleChange}
                            />
          <button type='button' onClick={this.attemptLogin}>Enter</button>
        </div>
        <div>
          <h3>Please select all teams that won this week</h3>
        </div>
        <div>{tool}</div>
      </div>
    )
  }
}
