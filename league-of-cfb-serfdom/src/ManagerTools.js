import React, { Component } from 'react';
import firebase from "./firebase";

export default class ManagerTools extends Component {

  state = {
    attemptedPassword: '',
    showTools: false
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
        showTools: true,
        attemptedPassword: ''
      });
    } else {
      this.setState({
        attemptedPassword: ''
      })
    }
  }

  render() {

    let tools = [];
    if (this.state.showTools) {
      tools.push(
        <div key={1}>
          <p>Welcome Manager</p>
        </div>
      );
      tools.push(
        <div key={2}>
          <p>You may now use the following tools</p>
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
        <div>{tools}</div>
      </div>
    )
  }

}
