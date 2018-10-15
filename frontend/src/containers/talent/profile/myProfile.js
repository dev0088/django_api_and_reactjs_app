import React, {Component} from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Panel from '../../../components/panel';

import './myProfile.css'

const theme = createMuiTheme ({
  palette: {
    primary: {
      main: '#007bff',
    },
    secondary: {
      main: '#C00'
    }
  }
})

class MyProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

	renderButtonsGroup() {
    return (
      <Panel title={""}>
				<Row>
					<Col xs="12" md="4" className="pt-4 pt-md-4" />
					<Col xs="12" md="4" className="pt-4 pt-md-4">
						<Link to="/profile-wizard/welcome">
							<Button variant="contained"  color="primary" className={"home-button"} >
								<div className="home-button-title-only">
									{"Build My Profile"}
								</div>
								<div className="home-button-status">
									{'(Wizard)'}
								</div>
							</Button>
						</Link>
					</Col>
					<Col xs="12" md="4" className="pt-4 pt-md-4" />
				</Row>
				<Row>
					<Col xs="12" md="4" className="pt-4 pt-md-4" />
					<Col xs="12" md="4" className="pt-4 pt-md-4">
						<Link to="/edit-profile">
							<Button variant="contained"  color="primary" className={"home-button"} >
								<div className="home-button-title-only">
									{"Build/Edit My Profile"}
								</div>
							</Button>
						</Link>
					</Col>
					<Col xs="12" md="4" className="pt-4 pt-md-4" />
				</Row>
				<Row>
					<Col xs="12" md="4" className="pt-4 pt-md-4" />
					<Col xs="12" md="4" className="pt-4 pt-md-4">
						<Link to="/profile">
							<Button variant="contained"  color="primary" className={"home-button"} >
								<div className="home-button-title-only">
									{"View My Profile"}
								</div>
							</Button>
						</Link>
					</Col>
					<Col xs="12" md="4" className="pt-4 pt-md-4" />
				</Row>
      </Panel>
    )
  }

  render() {

    return(
      <div className="profile-container">
				<MuiThemeProvider theme={theme}>
					{this.renderButtonsGroup()}
				</MuiThemeProvider>

        <Row >
          <Col xs="12" md="8" className="pt-4 pt-md-4"> </Col>
          <Col xs="12" md="4" className="pt-3 pt-md-3 profile-save-button-group-col">
            <Link to="/home">
              <RaisedButton label="Back to My Home" primary={true}/>
            </Link>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { auth, talentInfo } = state;
  return {
    auth,
    talentInfo: talentInfo.value
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
