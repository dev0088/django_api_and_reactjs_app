import React, {Component} from 'react';
import { Row, Col, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { FormGroup, Label, Input } from 'reactstrap';

import moment from 'moment';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

import Panel from '../components/panel';
import * as talentActions from  '../actions/talentActions';
import TalentAPI from '../apis/talentAPIs';

import 'react-dropdown/style.css';
import './myContactInfo.css';
import './myNationalityScreen.css';

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
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

const theme = createMuiTheme ({
  palette: {
    primary: {
      main: '#007bff',
    },
    secondary: {
      main: '#C00'
    },
    green: {
      main: '#28a745'
    },
    teal: {
      main: '#20c997'
    }
  }
})

const VISA_TYPES = [
  'B-1',
  'M-1',
  'B-2',
  'O',
  'B-1/B-2',
  'P-2',
  'C1/D',
  'Schengen',
  'F',
  'H1-B',
  'J-1',
]

const other_types = [
  'other1',
  'other2',
  'other3'
]

class MyNatioinality extends Component {

  constructor(props) {
    super(props);
    this.state = {
      notification: false,
      nationality: "",
      citizenship: "",
      passport_expiration_date: null,
      passport_number: "",
      country_of_current_residence: "",
      have_green_card: false,
      green_card_expiration_date: null,
      expiration_date: [],
      selected_visa_type: "",
      selected_expiration_date: null
    }
  }

  getIndexByVisaType(visaType) {
    return VISA_TYPES.findIndex(function(visa){
      return visaType === visa
    })
  }

  getNationalityInfoFromProps(props) {
    const { 
      talentInfo
    } = props

    let nationalityInfo = {
      nationality: "",
      citizenship: "",
      passport_expiration_date: null,
      passport_number: "",
      country_of_current_residence: "",
      have_green_card: false,
      green_card_expiration_date: null,
      expiration_date: [],
      selected_expiration_date: null
    }

    let expiration_date = []

    for (let i = 0; i < VISA_TYPES.length; i ++) {
      expiration_date[VISA_TYPES[i]] = null
    }

    if (talentInfo && talentInfo.user) {
      // Get nationality info
      nationalityInfo = {
        nationality: talentInfo.nationality,
        citizenship: talentInfo.citizenship,
        passport_expiration_date: talentInfo.passport_expiration_date,
        passport_number: talentInfo.passport_number,
        country_of_current_residence: talentInfo.country_of_current_residence,
        have_green_card: talentInfo.have_green_card ? 'YES' : 'NO',
        green_card_expiration_date: talentInfo.green_card_expiration_date,
        selected_visa_type: talentInfo.visa_type,
        expiration_date: expiration_date,
      }

      nationalityInfo.expiration_date[talentInfo.visa_type] = talentInfo.expiration_date
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
    if (event.target.name === 'selected_visa_type') {
      this.getIndexByVisaType(event.target.value)
    }
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleNationalityChange = (value) => {
    this.setState({
      nationality: value
    })
  }

  handleCitizenShipChange = (value) => {
    this.setState({
      citizenship: value
    })
  }

  handlePassportExpirationDateChange = (event) => {
    this.setState({ passport_expiration_date: event.target.value })
  }
  
  handleCountryOfCurrentResidenceChange = (value) => {
    this.setState({
      country_of_current_residence: value
    })
  }

  handleHaveGreenCardeChange = (event) => {
    this.setState({
      have_green_card: event.target.value === "YES" ? true : false
    })
  }

  handleGreenCardeExpirationDateChange = (event) => {
    this.setState({ green_card_expiration_date: moment(event.target.value).format('YYYY-MM-DD') })
  }

  handleExpirationDateChange = (event) => {
    const { expiration_date } = this.state
    expiration_date[event.target.name] = event.target.value
    this.setState({ expiration_date: expiration_date })
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

      selected_visa_type,
      expiration_date,
    } = this.state

    // let data = {
    //   ...this.state,
    // }
    let data = {
      nationality: nationality,
      citizenship: citizenship,
      passport_expiration_date: passport_expiration_date,
      passport_number: passport_number,
      country_of_current_residence: country_of_current_residence,
      have_green_card: have_green_card,
      green_card_expiration_date: green_card_expiration_date,
      visa_type: selected_visa_type,
      expiration_date: expiration_date[selected_visa_type],
    }
    TalentAPI.saveTalentInfo(auth.access.user_id, data, this.handleSaveResponse)
  }

  handleSaveResponse = (response, isFailed) => {
    this.props.talentActions.getTalentInfo(this.props.auth.access.user_id)
  }


  renderVisaTypeItem(index) {
    const {
      selected_visa_type,
      expiration_date
    } = this.state
    const {classes} = this.props

    let indexOfEnableExpireDate = this.getIndexByVisaType(selected_visa_type)
    return (
      <Row className="profile-gender-row">
        <Col xs="12" md="6" lg="6" xl="5" className="pt-0 pt-md-0" >
          <FormGroup check>
            <Label check>
              <Input type="radio" 
                name="selected_visa_type" 
                value={VISA_TYPES[index]} 
                onChange={this.handleChange}
                checked={index === indexOfEnableExpireDate ? true : false}
              />
              {VISA_TYPES[index]}
            </Label>
          </FormGroup>
        </Col>
        <Col xs="12" md="6" lg="6" xl="7" className="pt-0 pt-md-0" >
           <TextField
            id={VISA_TYPES[index]}
            name={VISA_TYPES[index]}
            label="Expiration Date"
            disabled = {index === indexOfEnableExpireDate ? false : true}
            type="date"
            value={expiration_date[VISA_TYPES[index]] ? expiration_date[VISA_TYPES[index]] : moment().format('YYYY-MM-DD')}
            className={classes.textField}
            onChange={this.handleExpirationDateChange}
          />
        </Col>
      </Row>
    )
  }

  renderVisaTypeViewWithReactStrap() {
    const {
      selected_visa_type,
    } = this.state

    let indexOfEnableExpireDate = this.getIndexByVisaType(selected_visa_type)

    return (
      <div>

        <Row className="profile-gender-row">
          <Col xs="0" md="1" lg="1" xl="2" className="pt-1 pt-md-1" />
          <Col xs="12" md="5" lg="5" xl="4" className="pt-0 pt-md-0" >
            {this.renderVisaTypeItem(0)}
          </Col>
          <Col xs="12" md="6" lg="5" xl="4" className="pt-1 pt-md-1" >
            {this.renderVisaTypeItem(1)}
          </Col>
          <Col xs="0" md="0" lg="1" xl="2" className="pt-1 pt-md-1" />
        </Row>

        <Row className="profile-gender-row">
          <Col xs="0" md="1" lg="1" xl="2" className="pt-1 pt-md-1" />
          <Col xs="12" md="5" lg="5" xl="4" className="pt-0 pt-md-0" >
            {this.renderVisaTypeItem(2)}
          </Col>
          <Col xs="12" md="6" lg="5" xl="4" className="pt-1 pt-md-1" >
            {this.renderVisaTypeItem(3)}
          </Col>
          <Col xs="0" md="0" lg="1" xl="2" className="pt-1 pt-md-1" />
        </Row>

        <Row className="profile-gender-row">
          <Col xs="0" md="1" lg="1" xl="2" className="pt-1 pt-md-1" />
          <Col xs="12" md="5" lg="5" xl="4" className="pt-0 pt-md-0" >
            {this.renderVisaTypeItem(4)}
          </Col>
          <Col xs="12" md="6" lg="5" xl="4" className="pt-1 pt-md-1" >
            {this.renderVisaTypeItem(5)}
          </Col>
          <Col xs="0" md="0" lg="1" xl="2" className="pt-1 pt-md-1" />
        </Row>        

        <Row className="profile-gender-row">
          <Col xs="0" md="1" lg="1" xl="2" className="pt-1 pt-md-1" />
          <Col xs="12" md="5" lg="5" xl="4" className="pt-0 pt-md-0" >
            {this.renderVisaTypeItem(6)}
          </Col>
          <Col xs="12" md="6" lg="5" xl="4" className="pt-1 pt-md-1" >
            {this.renderVisaTypeItem(7)}
          </Col>
          <Col xs="0" md="0" lg="1" xl="2" className="pt-1 pt-md-1" />
        </Row>        

        <Row className="profile-gender-row">
          <Col xs="0" md="1" lg="1" xl="2" className="pt-1 pt-md-1" />
          <Col xs="12" md="5" lg="5" xl="4" className="pt-0 pt-md-0" >
            {this.renderVisaTypeItem(8)}
          </Col>
          <Col xs="12" md="6" lg="5" xl="4" className="pt-1 pt-md-1" >
            {this.renderVisaTypeItem(9)}
          </Col>
          <Col xs="0" md="0" lg="1" xl="2" className="pt-1 pt-md-1" />
        </Row>

        <Row className="profile-gender-row">
          <Col xs="0" md="1" lg="1" xl="2" className="pt-1 pt-md-1" />
          <Col xs="12" md="5" lg="5" xl="4" className="pt-0 pt-md-0" >
            {this.renderVisaTypeItem(8)}
          </Col>
        </Row>

      </div>
    )
  }

  renderVisaOtherTypeView() {

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
      green_card_expiration_date
    } = this.state

    return (
      <MuiThemeProvider theme={theme}>
      <Panel title={"Nationality & Immigration Infomation"}>
        <Row className="profile-gender-row">
          <Col sm="12">
            <h5 className="profile-emercy-title">Nationality</h5>
          </Col>
        </Row>
        <Row className="profile-gender-row">
          <Col xs="0" md="1" className="pt-4 pt-md-4" /> 
          <Col xs="12" md="3" className="pt-4 pt-md-4"> 
            <Typography className="profile-nationality-field-name">Nationality</Typography>
          </Col>
          <Col xs="12" md="8" className="pt-3 pt-md-3"> 
            <CountryDropdown
              defaultOptionLabel="Select a nationality."
              value={nationality}
              onChange={this.handleNationalityChange} />
          </Col>
        </Row>
        <Row className="profile-gender-row">
          <Col xs="0" md="1" className="pt-4 pt-md-4" /> 
          <Col xs="12" md="3" className="pt-4 pt-md-4"> 
            <Typography className="profile-nationality-field-name">
              {"Citizenship (Passport Country)"}
            </Typography>
          </Col>
          <Col xs="12" md="8" className="pt-3 pt-md-3"> 
            <CountryDropdown
              defaultOptionLabel="Select a citizenship."
              value={citizenship}
              onChange={this.handleCitizenShipChange} />
          </Col>
        </Row>

        <Row className="profile-gender-row">
          <Col xs="0" md="1" className="pt-4 pt-md-4" /> 
          <Col xs="12" md="3" className="pt-4 pt-md-4"> 
            <Typography className="profile-nationality-field-name">
              {"Passport Expiration Date"}
            </Typography>
          </Col>
          <Col xs="12" md="8" className="pt-3 pt-md-3">
            <TextField
              id="passport_expiration_date"
              name="passport_expiration_date"
              label="Passport Expiration Date"
              type="date"
              value={passport_expiration_date ? passport_expiration_date : moment().format('YYYY-MM-DD')}
              className="profile-passport-expiration-date"
              onChange={this.handlePassportExpirationDateChange}
            />
          </Col>
        </Row>

        <Row className="profile-gender-row">
          <Col xs="0" md="1" className="pt-4 pt-md-4" /> 
          <Col xs="12" md="3" className="pt-4 pt-md-4"> 
            <Typography className="profile-nationality-field-name">
              {"Passport Number"}
            </Typography>
          </Col>
          <Col xs="12" md="8" className="pt-3 pt-md-3"> 
            <TextField 
              id="passport_number"
              name="passport_number"
              disabled={true}
              placeholder="to be completed by ShipTalent.com"
              className={classes.textField}
              value={passport_number}
              onChange={this.handleChange}
              margin="normal"
              fullWidth={true}
            />
          </Col>
        </Row>

        <Row className="profile-gender-row">
          <Col xs="0" md="1" className="pt-4 pt-md-4" />
          <Col xs="12" md="3" className="pt-4 pt-md-4"> 
            <Typography className="profile-nationality-field-name">Country of Current Residence</Typography>
          </Col>
          <Col xs="12" md="8" className="pt-3 pt-md-3"> 
            <CountryDropdown
              defaultOptionLabel="Select a nationality."
              value={country_of_current_residence}
              onChange={this.handleCountryOfCurrentResidenceChange} />
          </Col>
        </Row>


        <Row className="profile-gender-row">
          <Col sm="12" className="pt-4 pt-md-4">
            <h5 className="profile-emercy-title">{"Current Visa"}</h5>
          </Col>
        </Row>

        <Row className="profile-gender-row">
          <Col xs="0" md="1" lg="1" xl="1" className="pt-0 pt-md-0" />
          <Col sm="12" md="5" lg="5" xl="6" className="pt-0 pt-md-0">
            <Typography className="profile-nationality-field-name">
              {"Do you have a U.S. Permanent Resident Card (Green Card)?"}
            </Typography>
          </Col>
          <Col xs="12" md="4" lg="4" xl="3" className="pt-0 pt-md-0"> 
            <RadioGroup
              aria-label="have_green_card"
              name="have_green_card"
              className="profile-have-green-card-radio-button-group"
              value={have_green_card ? "YES" : "NO"}
              onChange={this.handleHaveGreenCardeChange}>
              <FormControlLabel
                value="YES"
                control={<Radio color="primary" />}
                label="Yes"
              />
              <FormControlLabel
                value="NO"
                control={<Radio color="primary" />}
                label="No"
              />
            </RadioGroup>
          </Col>

          <Col xs="12" md="2" lg="2" xl="2" className="pt-0 pt-md-0"> 
            <TextField
              id="date"
              label="Expiration Date"
              type="date"
              defaultValue={moment().format('YYYY-MM-DD')}
              value={green_card_expiration_date}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              disabled={!have_green_card}
              onChange={this.handleGreenCardeExpirationDateChange}
            />
          </Col>
        </Row>

        { this.renderVisaTypeViewWithReactStrap() }

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
      </MuiThemeProvider>
    )
  }


  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="profile-nationality-container">
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
