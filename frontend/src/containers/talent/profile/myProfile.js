import React, {Component} from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Panel from 'components/general/panel';
import Spacer from "components/general/spacer";
import ColumnButton from 'components/shiptalent/buttons/columnButton';
import styles from 'styles';
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

	renderButtonsGroup() {
  	const { classes } = this.props;

  	return (
			<Panel>
				<Grid container spacing={40} direction="column" justify="center" alignItems="center">
					<Grid item lg={12} md={12} sm={12} xs={12}>
						<Spacer size={20}/>
					</Grid>

					<ColumnButton
						link="/profile-wizard/welcome"
						itemClass={classes.fullWidthButtonGridItem}
						buttonClass={[classes.generalAssistButton, ]}
						title={`Build My Profile`}
						titleClass={classes.generalAssistButtonTitle}
						subTitle={'(Wizard)'}
						subTitleClass={classes.talentProfileOtherInfoButtonStatus}
						xl={2} lg={3} md={4} sm={7} xs={7}
						color="primary"
						fullWidth={true}
					/>

					<ColumnButton
						link="/edit-profile"
						itemClass={classes.fullWidthButtonGridItem}
						buttonClass={[classes.generalAssistButton, ]}
						title={`Build/Edit My Profile`}
						titleClass={classes.generalAssistButtonTitle}
						xl={2} lg={3} md={4} sm={7} xs={7}
						color="primary"
						fullWidth={true}
					/>

					<ColumnButton
						link="/profile"
						itemClass={classes.fullWidthButtonGridItem}
						buttonClass={[classes.generalAssistButton, ]}
						title={`View My Profile`}
						titleClass={classes.generalAssistButtonTitle}
						xl={2} lg={3} md={4} sm={7} xs={7}
						color="primary"
						fullWidth={true}
					/>

					<Grid item lg={12} md={12} sm={12} xs={12}>
						<Spacer size={50}/>
					</Grid>
				</Grid>
			</Panel>
		)

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

					{this.renderButtonsGroup()}


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


export default withStyles(styles)(MyProfile);
