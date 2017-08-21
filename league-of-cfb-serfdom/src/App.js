import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ManagerTools from './ManagerTools';
import ResultsEditor from './ResultsEditor';
import Rosters from './Rosters';
import Standings from './Standings';

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
            <Tab>Enter Results</Tab>
            <Tab>Rosters</Tab>
            <Tab>Standings</Tab>
          </TabList>
          <TabPanel>
            <ManagerTools />
          </TabPanel>
          <TabPanel>
            <ResultsEditor />
          </TabPanel>
          <TabPanel>
            <Rosters />
          </TabPanel>
          <TabPanel>
            <Standings />
          </TabPanel>
        </Tabs>
      </div>

    );
  }
}

export default App;
