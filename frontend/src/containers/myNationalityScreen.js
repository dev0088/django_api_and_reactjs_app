import React, {Component} from 'react';
import { Row, Col, Alert } from 'reactstrap';
import { connect } from 'react-redux';
// import TextField from 'material-ui/TextField';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Panel from '../components/panel'
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as talentActions from  '../actions/talentActions';
import TalentAPI from '../apis/talentAPIs'
import apiConfig from '../constants/api';
import Dropzone from 'react-dropzone';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';
import DropDown from 'react-dropdown';
import moment from 'moment';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import 'react-dropdown/style.css'
import './myContactInfo.css'


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

class MyNatioinality extends Component {

  constructor(props) {
    super(props);
    this.state = {
      notification: false,
      nationality: "",
      nationality: "",
      citizenship: "",
      passport_expiration_date: null,
      passport_number: null,
      country_of_current_residence: "",
      have_green_card: false,
      green_card_expiration_date: null,
      visa_type: "",
      expiration_date: null,
    }
  }

  getNationalityInfoFromProps(props) {
    const { 
      talentInfo
    } = props

    let nationalityInfo = {
      nationality: "",
      citizenship: "",
      passport_expiration_date: null,
      passport_number: null,
      country_of_current_residence: "",
      have_green_card: false,
      green_card_expiration_date: null,
      visa_type: "",
      expiration_date: null,
    }

    if (talentInfo && talentInfo.user) {
      // Get nationality info
      nationalityInfo = {
        nationality: talentInfo.nationality,
        citizenship: talentInfo.citizenship,
        passport_expiration_date: talentInfo.passport_expiration_date,
        passport_number: talentInfo.passport_number,
        country_of_current_residence: talentInfo.country_of_current_residence,
        have_green_card: talentInfo.have_green_card,
        green_card_expiration_date: talentInfo.green_card_expiration_date,
        visa_type: talentInfo.visa_type,
        expiration_date: talentInfo.expiration_date,
      }
    }

    return {
      ...nationalityInfo
    }
  }

  componentWillMount() {
    if (this.props.auth.access && this.props.auth.access.user_id) {
      this.props.talentActions.getTalentInfo(this.props.auth.access.user_id)  
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.getNationalityInfoFromProps(nextProps)
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleNationalityChange = (value) => {
    this.setState({
      nationality: value
    })
  }

  handleRegionChange = (value) => {
    this.setState({
      citizenship: value
    })
  }

  handlePassportExpirationDateChange = (event, date) => {
    this.setState({ passport_expiration_date: moment(date).format('YYYY-MM-DD') })
  }
  
  handleCountryOfCurrentResidenceChange = (value) => {
    this.setState({
      country_of_current_residence: value
    })
  }

  handleCancel = () => {
    this.setState({
      ...this.getNationalityInfoFromProps(this.props)
    })
  }

  handleSave = () => {
    const { auth } = this.props
    const { 
      nationality,
      citizenship,
      passport_expiration_date,
      passport_number,
      country_of_current_residence,
      have_green_card,
      green_card_expiration_date,
      visa_type,
      expiration_date,
    } = this.state

    let data = {
      ...this.state,
    }
    // let data = {
    //   nationality: nationality,
    //   citizenship: citizenship,
    //   passport_expiration_date: passport_expiration_date,
    //   passport_number: passport_number,
    //   country_of_current_residence: country_of_current_residence,
    //   have_green_card: have_green_card,
    //   green_card_expiration_date: green_card_expiration_date,
    //   visa_type: visa_type,
    //   expiration_date: expiration_date,
    // }
    console.log('==== data: ', data)
    TalentAPI.saveTalentInfo(auth.access.user_id, data, this.handleSaveResponse)
  }

  handleSaveResponse = (response, isFailed) => {
    console.log('==== response: ', response, isFailed)
    this.props.talentActions.getTalentInfo(this.props.auth.access.user_id)
  }

  renderNationalityView() {
    const { classes } = this.props
    const {
      nationality,
      citizenship,
      passport_expiration_date,
      passport_number,
      country_of_current_residence,
      have_green_card,
      green_card_expiration_date,
      visa_type,
      expiration_date,
    } = this.state

    return (
      <Panel title={"Nationality & Immigration Infomation"}>
        <Row className="profile-gender-row">
          <Col sm="12">
            <h5>Nationality</h5>
          </Col>
        </Row>
        <Row className="profile-gender-row">
          <Col xs="12" md="3" className="pt-4 pt-md-4"> 
            <Typography className="profile-field-name">Nationality</Typography>
          </Col>
          <Col xs="12" md="9" className="pt-3 pt-md-3"> 
            <CountryDropdown
              defaultOptionLabel="Select a nationality."
              value={nationality}
              onChange={this.handleNationalityChange} />
          </Col>
        </Row>
        <Row className="profile-gender-row">
          <Col xs="12" md="3" className="pt-4 pt-md-4"> 
            <Typography className="profile-field-name">
              {"Citizenship (Passport Country)"}
            </Typography>
          </Col>
          <Col xs="12" md="9" className="pt-3 pt-md-3"> 
            <RegionDropdown
              blankOptionLabel="No nationality selected."
              defaultOptionLabel="Now select a region, pal."
              country={nationality}
              value={citizenship}
              onChange={this.handleRegionChange} />
          </Col>
        </Row>

        <Row className="profile-gender-row">
          <Col xs="12" md="3" className="pt-4 pt-md-4"> 
            <Typography className="profile-field-name">
              {"Passport Expiration Date"}
            </Typography>
          </Col>
          <Col xs="12" md="9" className="pt-3 pt-md-3"> 
            <DatePicker
              hintText="Passport Expiration Date"
              container="inline" 
              className="datePicker"
              value={new Date(passport_expiration_date)}
              onChange={this.handlePassportExpirationDateChange}
            />
          </Col>
        </Row>

        <Row className="profile-gender-row">
          <Col xs="12" md="3" className="pt-4 pt-md-4"> 
            <Typography className="profile-field-name">
              {"Passport Number"}
            </Typography>
          </Col>
          <Col xs="12" md="9" className="pt-3 pt-md-3"> 
            <TextField 
              id="passport_number"
              name="passport_number"
              disabled={true}
              label="passport_number"
              className={classes.textField}
              value={passport_number}
              onChange={this.handleChange}
              margin="normal"
              fullWidth={true}
            />
          </Col>
        </Row>

        <Row className="profile-gender-row">
          <Col xs="12" md="3" className="pt-4 pt-md-4"> 
            <Typography className="profile-field-name">Nationality</Typography>
          </Col>
          <Col xs="12" md="9" className="pt-3 pt-md-3"> 
            <CountryDropdown
              defaultOptionLabel="Select a nationality."
              value={country_of_current_residence}
              onChange={this.handleCountryOfCurrentResidenceChange} />
          </Col>
        </Row>

        <Row className="profile-gender-row">
          <Col xs="12" md="7" className="pt-4 pt-md-4"> </Col>
          <Col xs="12" md="5" className="pt-3 pt-md-3 profile-save-button-group-col">
            <Button size="large" 
              className={classes.button} 
              onClick={this.handleCancel} >
              {'Cancel'}
            </Button>
            <Button size="large" color="primary" 
              className={classes.button} 
              onClick={this.handleSave}>
              {'Save'}
            </Button>
          </Col>
        </Row>

      </Panel>
    )
  }


  render() {
    const { contactInfo, emergencyInfo } = this.state;
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <div className="contact-info-view-container">
          {this.state.notification && <Alert color="info">{this.state.notification}</Alert>}

          {this.renderNationalityView()}

          <Row >
            <Col xs="12" md="8" className="pt-4 pt-md-4"> </Col>
            <Col xs="12" md="4" className="pt-3 pt-md-3 profile-save-button-group-col">
              <Link to="/edit-profile">
                <RaisedButton label="Back to Build/Edit My Profile" primary={true}/>
              </Link>
            </Col>
          </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MyNatioinality));
