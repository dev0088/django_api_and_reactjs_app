import React, { Component } from 'react';
import createHistory from 'history/createBrowserHistory'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from './store'
import Routes from './routes/index';
import './static/css/App.css';
import './static/css/vendor-styles.css';

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
        <Router>
          <Routes />
        </Router>
      </Provider>
    );
  }
}

export default App;
