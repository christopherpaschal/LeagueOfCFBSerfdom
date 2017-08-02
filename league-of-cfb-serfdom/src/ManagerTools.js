import React, { Component } from 'react';
import OwnershipCreator from './OwnershipCreator';

export default class ManagerTools extends Component {

  state = {
    attemptedPassword: '',
    showTools: true
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
      //TODO make components for each manager tool, starting with ownership editor/creator
      tools.push(
        <div key="OwnershipCreatorTool">
          <OwnershipCreator />
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
