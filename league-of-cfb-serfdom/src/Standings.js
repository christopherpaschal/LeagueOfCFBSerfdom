import React, { Component } from 'react';
import firebase from './firebase';

export default class Standings extends Component {

  state = {
    creesPoints: 0,
    jmcreePoints: 0,
    joePoints: 0,
    mizelbillPoints: 0,
    smurphdaddyPoints: 0
  }

  componentWillMount() {
    var self = this;
    var db = firebase.database();
    const ref = db.ref('points');
    const ownershipsRef = db.ref('ownerships');

    ref.orderByChild('TeamID').on('child_added', function(snapshot) {
      const points = snapshot.val().PointsEarned;
      const team = snapshot.val().TeamID;
      
      ownershipsRef.orderByChild('TeamID').on('child_added', function(teamSnapshot) {
        if (teamSnapshot.val().TeamID === team) {
          const player = teamSnapshot.val().PlayerID;
          if (player === 'crees') {
            self.setState((prevState) => ({
              creesPoints: prevState.creesPoints + points
            }));
          } else if (player === 'jmcree') {
            self.setState((prevState) => ({
              jmcreePoints: prevState.jmcreePoints + points
            }));
          }  else if (player === 'joe') {
            self.setState((prevState) => ({
              joePoints: prevState.joePoints + points
            }));
          }  else if (player === 'mizelbill') {
            self.setState((prevState) => ({
              mizelbillPoints: prevState.mizelbillPoints + points
            }));
          }  else if (player === 'smurphdaddy') {
            self.setState((prevState) => ({
              smurphdaddyPoints: prevState.smurphdaddyPoints + points
            }));
          }
        }
      });
    });
  }

  render() {
    return (
      <div>
        <p><b>crees: </b>{this.state.creesPoints}</p>
        <p><b>jmcree: </b>{this.state.jmcreePoints}</p>
        <p><b>joe: </b>{this.state.joePoints}</p>
        <p><b>mizelbill: </b>{this.state.mizelbillPoints}</p>
        <p><b>smurphdaddy: </b>{this.state.smurphdaddyPoints}</p>
      </div>
    )
  }
}
