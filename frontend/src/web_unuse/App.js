import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/es/integration/react';

import configureStore from '../store/index';
import Routes from './routes/index';
// Components
import Loading from './components/Loading';
import logo from './logo.svg';
// Load css
// import './styles/style.scss';
import './App.css';

const store = configureStore();
// persistor.purge(); // Debug to clear persist

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
