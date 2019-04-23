import React, { Component } from 'react';
import '../styles/base.css'
import { Provider } from 'react-redux'
import store from '../store'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import TodayView from './TodayView'
import OtherDay from './OtherDay'

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCloud, faSun, faCloudSun } from '@fortawesome/free-solid-svg-icons';

library.add(faCloud, faSun, faCloudSun);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div id="main-container">
            <div id="pages">
              <Route exact path="/" component={TodayView}/>
              <Route exact path="/date/:day" component={OtherDay}/>
            </div>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App;
