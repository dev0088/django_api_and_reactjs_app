import React, { Component } from 'react';
import createHistory from 'history/createBrowserHistory'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom';
import { MuiThemeProvider, } from '@material-ui/core/styles'; // v1.x
import { MuiThemeProvider as V0MuiThemeProvider} from 'material-ui';

import configureStore from './store'
import Routes from './routes/index';

import './static/css/App.css';
import './static/css/vendor-styles.css';
import { theme, themeV0 } from './styles';

const history = createHistory()

const store = configureStore(history)


class App extends Component {

  getInitialState() {
    return { prevPath: '' }
  }

  componentDidMount(){
    document.title = "ShipTalent";
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.setState({ prevPath: this.props.location })
    }
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
