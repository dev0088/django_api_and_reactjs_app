import React, {Component} from 'react';
import { Row, Col, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Panel from '../components/panel'
import Button from '@material-ui/core/Button';
import UpdatedTextField from '@material-ui/core/TextField';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as talentActions from  '../actions/talentActions';
import TalentAPI from '../apis/talentAPIs'
import moment from 'moment';
import ConfirmChangesDialog from '../components/confirmChangesDialog';
import 'react-dropdown/style.css';
import './myContactInfo.css';


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  slide: {
    padding: 10,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

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

class MyContactInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userID: props.auth.access.user_id,
      notification: false,
      contactInfo: {
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        address1: "",
        address2: "",
        address3: "",
        address4: "",
        address5: "",
        address6: "",
        birthday: null
      },
      emergencyInfo: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        relationship: 0
      },
			isChanged: false,
			showConfirmChanges: false
    }
  }

  getContactInfoFromProps(props) {
    const {
      auth,
      talentInfo
    } = props
    let userID = auth.access.user_id
    let contactInfo = {}
    let emergencyInfo = {}

    if (talentInfo && talentInfo.user) {
      // Get contact info
      contactInfo = {
        firstName: talentInfo.user.first_name,
        lastName: talentInfo.user.last_name,
        email: talentInfo.user.email,
        mobile: talentInfo.phone_number,
        address1: talentInfo.mailing_addresse1,
        address2: talentInfo.mailing_addresse2,
        address3: talentInfo.mailing_addresse3,
        address4: talentInfo.mailing_addresse4,
        address5: talentInfo.mailing_addresse5,
        address6: talentInfo.mailing_addresse6,
        birthday: talentInfo.birthday
      }
      emergencyInfo = {
        firstName: talentInfo.emergency_first_name,
        lastName: talentInfo.emergency_last_name,
        email: talentInfo.emergency_email,
        phone: talentInfo.emergency_phone,
        relationship: talentInfo.emergency_relationship
      }
    }

    return {
      userID,
      contactInfo,
      emergencyInfo
    }
  }

  componentWillMount() {
    if (this.state.userID) {
      this.props.talentActions.getTalentInfo(this.state.userID)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.getContactInfoFromProps(nextProps),
			isChanged: false
    })
  }


  handleContactInfoChange = (event) => {
    const { contactInfo } = this.state;
    contactInfo[event.target.name.substring(8)] = event.target.value;
    this.setState({
      contactInfo: contactInfo,
			isChanged: true
    });
  }

  handleBirthdayChange = (event) => {
    const { contactInfo } = this.state;
    contactInfo['birthday'] = event.target.value;
    this.setState({
			contactInfo: contactInfo,
			isChanged: true
		})
  }

  handleEmergencyInfoChange = (event) => {
    const { emergencyInfo } = this.state;
    emergencyInfo[event.target.name.substring(10)] = event.target.value;
    this.setState({
      emergencyInfo: emergencyInfo,
			isChanged: true
    });
  }

  handleRelationshipChange = (event, index, value) => {
    const { emergencyInfo } = this.state;
    emergencyInfo['relationship'] = value;
    this.setState({
			emergencyInfo: emergencyInfo,
			isChanged: true
		});
  }

  handleBusinessStaffCancel = () => {
    const {
      contactInfo,
      emergencyInfo
    } = this.getContactInfoFromProps(this.props)

    this.setState({
      contactInfo,
      emergencyInfo,
			isChanged: false
    })
  }

  handleBusinessStaffSave = () => {
    const {
      userID,
      contactInfo,
      emergencyInfo
    } = this.state

    let data = {
      user: {
        email: contactInfo.email,
        first_name: contactInfo.firstName,
        last_name: contactInfo.lastName,
      },
      phone_number: contactInfo.mobile,
      mailing_addresse1: contactInfo.address1,
      mailing_addresse2: contactInfo.address2,
      mailing_addresse3: contactInfo.address3,
      mailing_addresse4: contactInfo.address4,
      mailing_addresse5: contactInfo.address5,
      mailing_addresse6: contactInfo.address6,
      birthday: contactInfo.birthday,
      emergency_first_name: emergencyInfo.firstName,
      emergency_last_name: emergencyInfo.lastName,
      emergency_email: emergencyInfo.email,
      emergency_phone: emergencyInfo.phone,
      emergency_relationship: emergencyInfo.relationship
    }
    console.log('==== data: ', data)
    TalentAPI.saveTalentInfo(userID, data, this.handleBusinessStaffSaveResponse)
  }

  handleBusinessStaffSaveResponse = (response, isFailed) => {
    console.log('==== response: ', response, isFailed)
    this.props.talentActions.getTalentInfo(this.state.userID)
		this.setState({
			isChanged: false
		})
  }

	checkChanges = (event) => {
		const { isChanged } = this.state
		if (isChanged) {
			event.preventDefault()
			this.setState({
				showConfirmChanges: true
			})
		}
	}

	handleCloseConfirm = () => {
		this.setState({
			showConfirmChanges: false
		})
	}

  renderBussinessStaff() {
    const { classes } = this.props
    const {
      contactInfo,
      emergencyInfo,
    } = this.state
    const selectItemStyle = {
      'whiteSpace': 'preWrap'
    }

    return (
      <Panel title={"My Contact Info"}>
        <Row className="profile-gender-row">
          <Col sm="12">
            <h5>Contact Information</h5>
          </Col>
        </Row>
        <Row className="profile-gender-row">
          <Col sm="6">
            <TextField
              name="contact_firstName"
              id="contact_firstName"
              placeholder=""
              value={contactInfo.firstName}
              onChange={this.handleContactInfoChange}
              floatingLabelText="First Name"
              fullWidth={true}
            />
          </Col>
          <Col sm="6">
            <TextField
              name="contact_lastName"
              id="contact_lastName"
              placeholder=""
              value={contactInfo.lastName}
              onChange={this.handleContactInfoChange}
              floatingLabelText="Last Name"
              fullWidth={true}
            />
          </Col>
        </Row>
        <Row className="profile-gender-row">
          <Col sm="6">
            <TextField
              type="email"
              name="contact_email"
              id="contact_email"
              placeholder=""
              value={contactInfo.email}
              onChange={this.handleContactInfoChange}
              floatingLabelText="Email Address"
              fullWidth={true}
            />
          </Col>
          <Col sm="6">
            <TextField
              name="contact_mobile"
              id="contact_mobile"
              placeholder=""
              value={contactInfo.mobile}
              onChange={this.handleContactInfoChange}
              floatingLabelText="Mobile"
              fullWidth={true}
            />
          </Col>
        </Row>
        <Row className="profile-gender-row">
          <Col sm="6">
            <TextField
              name="contact_address1"
              id="contact_address1"
              placeholder=""
              value={contactInfo.address1}
              onChange={this.handleContactInfoChange}
              floatingLabelText="Mailing Address Line 1"
              fullWidth={true}
            />
          </Col>
          <Col sm="6">
            <TextField
              name="contact_address2"
              id="contact_address2"
              placeholder=""
              value={contactInfo.address2}
              onChange={this.handleContactInfoChange}
              floatingLabelText="Mailing Address Line 2"
              fullWidth={true}
            />
          </Col>
        </Row>
        <Row className="profile-gender-row">
          <Col sm="6">
            <TextField
              name="contact_address3"
              id="contact_address3"
              placeholder=""
              value={contactInfo.address3}
              onChange={this.handleContactInfoChange}
              floatingLabelText="City"
              fullWidth={true}
            />
          </Col>
          <Col sm="6">
            <TextField
              name="contact_address4"
              id="contact_address4"
              placeholder=""
              value={contactInfo.address4}
              onChange={this.handleContactInfoChange}
              floatingLabelText="State"
              fullWidth={true}
            />
          </Col>
          <Col sm="6">
            <TextField
              name="contact_address5"
              id="contact_address5"
              placeholder=""
              value={contactInfo.address5}
              onChange={this.handleContactInfoChange}
              floatingLabelText="Zip/Postal Code"
              fullWidth={true}
            />
          </Col>
          <Col sm="6">
            <TextField
              name="contact_address6"
              id="contact_address6"
              placeholder=""
              value={contactInfo.address6}
              onChange={this.handleContactInfoChange}
              floatingLabelText="Country"
              fullWidth={true}
            />
          </Col>
        </Row>
        <Row className="profile-gender-row">
          <Col sm="12">
            <UpdatedTextField
              id="birthday"
              name="birthday"
              label="Date of Birth"
              type="date"
              value={contactInfo.birthday ? contactInfo.birthday : moment().format('YYYY-MM-DD')}
              className="datePicker"
              onChange={this.handleBirthdayChange}
            />

          </Col>
        </Row>

        <Row className="profile-gender-row">
          <Col sm="12">
            <h5 className="profile-emercy-title">Emergency Contact Information</h5>
          </Col>
        </Row>
        <Row className="profile-gender-row">
          <Col sm="6">
            <TextField
              name="emergency_firstName"
              id="emergency_firstName"
              placeholder=""
              value={emergencyInfo.firstName}
              onChange={this.handleEmergencyInfoChange}
              floatingLabelText="First Name"
              fullWidth={true}
            />
          </Col>
          <Col sm="6">
            <TextField
              name="emergency_lastName"
              id="emergency_lastName"
              placeholder=""
              value={emergencyInfo.lastName}
              onChange={this.handleEmergencyInfoChange}
              floatingLabelText="Last Name"
              fullWidth={true}
            />
          </Col>
        </Row>
        <Row className="profile-gender-row">
          <Col sm="6">
            <TextField
              name="emergency_email"
              id="emergency_email"
              placeholder=""
              value={emergencyInfo.email}
              onChange={this.handleEmergencyInfoChange}
              floatingLabelText="Email Address"
              fullWidth={true}
            />
          </Col>
          <Col sm="6">
            <TextField
              name="emergency_phone"
              id="emergency_phone"
              placeholder=""
              value={emergencyInfo.phone}
              onChange={this.handleEmergencyInfoChange}
              floatingLabelText="Phone"
              fullWidth={true}
            />
          </Col>
        </Row>
        <Row className="profile-gender-row">
          <Col sm="12">
            <SelectField
              id="emergency_relationship"
              name="emergency_relationship"
              floatingLabelText="Relationship"
              value={emergencyInfo.relationship}
              onChange={this.handleRelationshipChange}
              menuItemStyle={selectItemStyle}
            >
              <MenuItem value={1} primaryText="Wife" />
              <MenuItem value={2} primaryText="Husband" />
              <MenuItem value={3} primaryText="Father" />
              <MenuItem value={4} primaryText="Mother" />
              <MenuItem value={5} primaryText="Brother" />
              <MenuItem value={6} primaryText="Sister" />
              <MenuItem value={7} primaryText="Other" />
            </SelectField>
          </Col>
        </Row>

        <Row className="profile-gender-row">
          <Col xs="12" md="8" className="pt-4 pt-md-4"> </Col>
          <Col xs="12" md="4" className="pt-3 pt-md-3 profile-save-button-group-col">
            <Button size="large"
              className={classes.button}
              onClick={this.handleBusinessStaffCancel} >
              {'Cancel'}
            </Button>
            <Button size="large" color="primary"
              className={classes.button}
              onClick={this.handleBusinessStaffSave}>
              {'Save'}
            </Button>
          </Col>
        </Row>
      </Panel>
    )
  }

  render() {
    const { showConfirmChanges } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <div className="contact-info-view-container">
          {this.state.notification && <Alert color="info">{this.state.notification}</Alert>}

          {this.renderBussinessStaff()}

          <Row >
            <Col xs="12" md="8" className="pt-4 pt-md-4"> </Col>
            <Col xs="12" md="4" className="pt-3 pt-md-3 profile-save-button-group-col">
              <Link to="/edit-profile" onClick={this.checkChanges} >
                <RaisedButton label="Back to Build/Edit My Profile" primary={true}/>
              </Link>
            </Col>
          </Row>

					<ConfirmChangesDialog
						open={showConfirmChanges}
						onClose={this.handleCloseConfirm}
					/>
        </div>
      </MuiThemeProvider>
    )
  }
}

function mapStateToProps(state) {
  const { auth, talentReducer,  talentInfo } = state;
  return {
    auth,
    talentReducer,
    talentInfo: talentInfo.value
  }
}

function mapDispatchToProps(dispatch) {
  return {
    talentActions: bindActionCreators(talentActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MyContactInfo));
