import './App.less';
import 'normalize.css/normalize.css';
import React, { PureComponent } from 'react';
import Router from './components/Router';

class App extends PureComponent {
  render() {
    return (
      <Router/>
    )
  }
}

export default App;