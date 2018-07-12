import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom';

import PrivateRoute from './containers/PrivateRoute';
import configureStore from './store'
import Routes from './routes/index';

import './App.css';

const history = createHistory()

const store = configureStore(history)

class App extends Component {
  render() {
    return (
			<Provider store={store}>
				<Router>
					<Routes />
				</Router>
			</Provider>
    );
  }
}

export default App;
