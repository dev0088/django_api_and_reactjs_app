import React, { Component } from 'react';
import createHistory from 'history/createBrowserHistory'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'; // v1.x
import { MuiThemeProvider as V0MuiThemeProvider} from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


import configureStore from './store'
import Routes from './routes/index';

import './static/css/App.css';
import './static/css/vendor-styles.css';

const history = createHistory()

const store = configureStore(history)

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#007bff',
		},
		secondary: {
			main: '#C00'
		}
	}
});
const themeV0 = getMuiTheme({
	palette: {
    primary1Color: '#258df2',
    accent1Color: '#40c741',
  }
});

class App extends Component {
  componentDidMount(){
    document.title = "ShipTalent";
  }

  render() {
    return (
      <Provider store={store}>
				<MuiThemeProvider theme={theme}>
	        <V0MuiThemeProvider muiTheme={themeV0}>
	              <Router>
	          <Routes />
	        </Router>
	        </V0MuiThemeProvider>
				</MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
