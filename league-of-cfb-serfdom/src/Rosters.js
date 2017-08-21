import React, { Component } from 'react';
import ReactContainer from 'react.container';
import TeamRoster from './TeamRoster';

export default class Rosters extends Component {

  render() {
    return (
      <div className="rosters">
        <TeamRoster owner="crees"/>
        <TeamRoster owner="jmcree"/>
        <TeamRoster owner="joe"/>
        <TeamRoster owner="mizelbill"/>
        <TeamRoster owner="smurphdaddy"/>
      </div>
    )
  }
}
