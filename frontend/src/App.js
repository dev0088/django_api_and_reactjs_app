// import React, { Component } from 'react';
// import { connect } from 'react-redux'
//
// import {echo} from './actions/echo'
// import {serverMessage} from './reducers'
//
// // import backgroundImage from '../images/backgrounds/background_out.png'
//
// class App extends Component {
//   componentDidMount() {
//       this.props.fetchMessage('Hi!')
//   }
//
//   render() {
//     return (
//       <div>
//         <h2>Welcome to React</h2>
//         <p>
//           {this.props.message}
//         </p>
//       </div>
//     );
//   }
// }
//
// export default connect(
//   state => ({ message: serverMessage(state) }),
//   { fetchMessage: echo }
// )(App);
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'
import {Route, Switch} from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom';

import PrivateRoute from './containers/PrivateRoute';
import configureStore from './store'
import Routes from './routes/index';

import './App.css';

const history = createHistory()

const store = configureStore(history)

// ReactDOM.render((
//   <Provider store={store}>
//     <ConnectedRouter history={history}>
//       <Switch>
//         <Routes />
//       </Switch>
//     </ConnectedRouter>
//   </Provider>
// ), document.getElementById('root'));


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
