import React, { Component } from 'react';
import MyEventList from './containers/MyEventList';

const stylesApp = {
  marginTop: 40
};

class App extends Component {
  render() {
    return (
      <div style={{padding: '15px'}}>
        <div style={ stylesApp }>
          <div >
            <MyEventList />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
