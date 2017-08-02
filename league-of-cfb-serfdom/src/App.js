import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ManagerTools from './ManagerTools'

class App extends Component {

  state = {
    name: '',
    id: ''
  }

  render() {
    return (
      <div className='App'>
        <Tabs>
          <TabList>
            <Tab>Manager Tools</Tab>
            <Tab>Rosters</Tab>
            <Tab>Standings</Tab>
          </TabList>
          <TabPanel>
            <ManagerTools />
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
