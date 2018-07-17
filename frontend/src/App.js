import React, { Component } from 'react';
import createHistory from 'history/createBrowserHistory'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import configureStore from './store'
import Routes from './routes/index';

import './static/css/App.css';
import './static/css/vendor-styles.css';

const history = createHistory()

const store = configureStore(history)

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#258df2',
    accent1Color: '#40c741',
  }
});


class App extends Component {
  render() {
    return (
			<Provider store={store}>
				<MuiThemeProvider muiTheme={muiTheme}>
		          <Router>
					<Routes />
				</Router>
		        </MuiThemeProvider>
			</Provider>
    );
  }
}

export default App;
