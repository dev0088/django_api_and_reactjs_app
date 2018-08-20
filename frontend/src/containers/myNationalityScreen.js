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

const visa_types = [
  'B-1',
  'B-2',
  'B-1/B-2',
  'C1/D',
  'F',
  'H1-B',
  'J-1',
  'M-1',
  'O',
  'P-2',
  'Schengen'
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
      have_green_card: "yes",
      green_card_expiration_date: null,
      expiration_date: [],
      selected_visa_type: "",
      selected_expiration_date: null
    }
  }

  getIndexByVisaType(visaType) {
    return visa_types.findIndex(function(visa){
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

    for (let i = 0; i < visa_types.length; i ++) {
      expiration_date[visa_types[i]] = null
    }

    if (talentInfo && talentInfo.user) {
      // Get nationality info
      nationalityInfo = {
        nationality: talentInfo.nationality,
        citizenship: talentInfo.citizenship,
        passport_expiration_date: talentInfo.passport_expiration_date,
        passport_number: talentInfo.passport_number,
        country_of_current_residence: talentInfo.country_of_current_residence,
        have_green_card: talentInfo.have_green_card ? 'yes' : 'no',
        green_card_expiration_date: talentInfo.green_card_expiration_date,
        selected_visa_type: talentInfo.visa_type,
        expiration_date: expiration_date,
      }

      nationalityInfo.expiration_date[talentInfo.visa_type] = talentInfo.expiration_date
    }
    console.log('===== nationalityInfo: ', nationalityInfo)

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
    console.log('==== name: value: ', event.target.name, event.target.value)
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

  handleGreenCardeExpirationDateChange = (event, date) => {
    this.setState({ green_card_expiration_date: moment(date).format('YYYY-MM-DD') })
  }

  handleExpirationDateChange = (event, date) => {
    const { selected_visa_type, expiration_date } = this.state
    expiration_date[selected_visa_type] = moment(date).format('YYYY-MM-DD')
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

  renderVisaTypeView() {
    const {
      selected_visa_type,
      expiration_date
    } = this.state
    const { classes } = this.props;

    let visaTypeRadioComponents = []
    let visaTypeExpireDateComponents = []
    let indexOfEnableExpireDate = this.getIndexByVisaType(selected_visa_type)

    for (let i = 0; i < visa_types.length; i ++) {
      let visaTypeRadioComponent = (
          <FormControlLabel
            value={visa_types[i]}
            control={<Radio color="primary" />}
            label={visa_types[i]}
          />
        )
      let visaTypeExpireDateComponent = (
          <Row>
            <Col xs="12" md="6" className="pt-0 pt-md-0">
              <Typography className="profile-nationality-field-name">
                {"Expiration Date"}
              </Typography>
            </Col>
            <Col xs="12" md="6" className="pt-0 pt-md-0">
              <DatePicker
                hintText="Expiration Date"
                container="inline" 
                disabled = {i === indexOfEnableExpireDate ? false : true}
                className="datePicker profile-nationality-date-picker"
                value={new Date(expiration_date[visa_types[i]] ? expiration_date[visa_types[i]] : new Date())}
                onChange={this.handleExpirationDateChange}
              />
            </Col>
          </Row>
      )

      let visaTypeExpireDateTextComponet = (
      <Row>
        <Col xs="12" md="12" className="pt-0 pt-md-0">
        <TextField
          id="date"
          label="Expiration Date"
          disabled = {i === indexOfEnableExpireDate ? false : true}
          type="date"
          defaultValue={moment().format('MM-DD-YYYY')}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
        </Col>
      </Row>
      )

      visaTypeRadioComponents.push(visaTypeRadioComponent)
      // visaTypeRadioComponents.push(visaTypeExpireDateComponent)
      visaTypeRadioComponents.push(visaTypeExpireDateTextComponet)
    }

    return (
      <RadioGroup
        aria-label="visa_type"
        name="selected_visa_type"
        className="profile-have-green-card-radio-button-group"
        value={selected_visa_type}
        onChange={this.handleChange}>
          { visaTypeRadioComponents }
      </RadioGroup>
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
            <RegionDropdown
              blankOptionLabel="No nationality selected."
              defaultOptionLabel="Now select a region, pal."
              country={nationality}
              value={citizenship}
              onChange={this.handleRegionChange} />
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
          <Col xs="0" md="1" className="pt-4 pt-md-4" />
          <Col xs="12" md="3" className="pt-4 pt-md-4"> 
            <Typography className="profile-nationality-field-name">Nationality</Typography>
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
          <Col sm="12" md="5" lg="6" xl="6" className="pt-0 pt-md-0">
            <Typography className="profile-nationality-field-name">
              {"Do you have a U.S. Permanent Resident Card (Green Card)?"}
            </Typography>
          </Col>
          <Col xs="12" md="4" lg="3" xl="3" className="pt-0 pt-md-0"> 
            <FormControl component="fieldset" className={classes.formControl}>
              <RadioGroup
                aria-label="have_green_card"
                name="have_green_card"
                className="profile-have-green-card-radio-button-group"
                value={this.state.have_green_card}
                onChange={this.handleChange}>
                <FormControlLabel
                  value="yes"
                  control={<Radio color="primary" />}
                  label="Yes"
                />
                <FormControlLabel
                  value="no"
                  control={<Radio color="primary" />}
                  label="No"
                />

              </RadioGroup>
            </FormControl>
          </Col>

          <Col xs="12" md="2" lg="2" xl="2" className="pt-0 pt-md-0"> 

            <TextField
              id="date"
              label="Expiration Date"
              type="date"
              defaultValue={moment().format('MM-DD-YYYY')}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleGreenCardeExpirationDateChange}
            />
          </Col>
        </Row>

        <Row className="profile-gender-row">
          <Col xs="0" md="1" lg="2" xl="3" className="pt-0 pt-md-0" />
          <Col xs="12" md="10" lg="8" xl="6" className="pt-0 pt-md-0"> 
            { this.renderVisaTypeView() }
          </Col>

          <Col xs="0" md="1" lg="2" xl="3" className="pt-0 pt-md-0" />
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
