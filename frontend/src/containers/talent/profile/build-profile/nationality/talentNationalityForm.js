import React, {Component} from 'react';
import { Row, Col, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import moment from 'moment';
import { CountryDropdown } from 'react-country-region-selector';
import Panel from 'components/general/panel';
import ConfirmChangesDialog from 'components/shiptalent/dialogs/confirmChangesDialog';
import defaultValues from 'constants/defaultValues';
import 'react-dropdown/style.css';
import '../contact-info/myContactInfo.css';
import './myNationalityScreen.css';
import { styles } from 'styles';


class TalentNationalityForm extends Component {

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
      visaTypes: [],
      orgVisas: [],

      isChanged: false,
      showConfirmChanges: false
    }
  }

  getIndexByVisaType(visaType) {
    return defaultValues.VISA_TYPES.findIndex(function(visa){
      return visaType === visa
    })
  }

  getNationalityInfoFromProps(props) {
    const { talentInfo } = props

    let nationalityInfo = {
      nationality: "",
      citizenship: "",
      passport_expiration_date: null,
      passport_number: "",
      country_of_current_residence: "",
      have_green_card: false,
      green_card_expiration_date: null,
      visaTypes: [],
      orgVisas: []
    }

    if (talentInfo) {
      let visaTypes = []
      let orgVisas = talentInfo.talent_visas

      for (let i = 0; i < defaultValues.VISA_TYPES.length; i ++) {
        let visa = this.getVisaByName(defaultValues.VISA_TYPES[i], orgVisas)
        visaTypes.push({
          name: defaultValues.VISA_TYPES[i],
          expiration_date: (visa && visa.expiration_date) ? visa.expiration_date : null,
          checked: visa ? true : false,
        })
      }

      // Get nationality info
      nationalityInfo = {
        nationality: talentInfo.nationality,
        citizenship: talentInfo.citizenship,
        passport_expiration_date: talentInfo.passport_expiration_date,
        passport_number: talentInfo.passport_number,
        country_of_current_residence: talentInfo.country_of_current_residence,
        have_green_card: talentInfo.have_green_card ? 'YES' : 'NO',
        green_card_expiration_date: talentInfo.green_card_expiration_date,
        visaTypes: visaTypes,
        orgVisas: orgVisas
      }
    }

    return {
      ...nationalityInfo
    }
  }

  componentWillMount() {
    // if (this.props.auth.access && this.props.auth.access.user_id) {
    //   this.props.talentActions.getCurrentTalentInfo()
    // }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.getNationalityInfoFromProps(nextProps),
      isChanged: false
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      isChanged: true
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state.isChanged)
      }
    });
  }

  handleNationalityChange = (value) => {
    this.setState({
      nationality: value,
      isChanged: true
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state.isChanged)
      }
    })
  }

  handleCitizenShipChange = (value) => {
    this.setState({
      citizenship: value,
      isChanged: true
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state.isChanged)
      }
    })
  }

  handlePassportExpirationDateChange = (event) => {
    this.setState({
      passport_expiration_date: event.target.value,
      isChanged: true
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state.isChanged)
      }
    })
  }

  handleCountryOfCurrentResidenceChange = (value) => {
    this.setState({
      country_of_current_residence: value,
      isChanged: true
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state.isChanged)
      }
    })
  }

  handleHaveGreenCardeChange = (event) => {
    this.setState({
      have_green_card: event.target.value === "YES" ? true : false,
      isChanged: true
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state.isChanged)
      }
    })
  }

  handleGreenCardeExpirationDateChange = (event) => {
    this.setState({
      green_card_expiration_date: moment(event.target.value).format('YYYY-MM-DD'),
      isChanged: true
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state.isChanged)
      }
    })
  }

  handleVisaExpirationDateChange = name => (event) => {
    const { visaTypes } = this.state
    let key = this.getKeyOfVisaByName(name, visaTypes)

    if (key) {
      visaTypes[key].expiration_date = event.target.value
      this.setState({
        visaTypes,
        isChanged: true
      }, () => {
        if (this.props.onChange) {
          this.props.onChange(this.state.isChanged)
        }
      })
    }
  }

  handleVisaChange = name => event => {
    const { visaTypes } = this.state;
    let key = this.getKeyOfVisaByName(name, visaTypes)

    if (key) {
      visaTypes[key].checked = event.target.checked

      this.setState({
        visaTypes,
        isChanged: true
      }, () => {
        if (this.props.onChange) {
          this.props.onChange(this.state.isChanged)
        }
      })
    }
  }

  handleCancel = () => {
    this.setState({
      ...this.getNationalityInfoFromProps(this.props),
      isChanged: false
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state.isChanged)
      }
    })
  }

  handleSave = () => {
    const { talentInfo } = this.props
    const {
      nationality,
      citizenship,
      passport_expiration_date,
      passport_number,
      country_of_current_residence,
      have_green_card,
      green_card_expiration_date,
      visaTypes,
    } = this.state

    // Filter checked visaTypes
    let visas = []
    for (let i = 0; i < visaTypes.length; i ++) {
      let visa = visaTypes[i]
      if (visa.checked) {
        visas.push({
          name: visa.name,
          expiration_date: visa.expiration_date
        })
      }
    }

    let data = {
      nationality: nationality,
      citizenship: citizenship,
      passport_expiration_date: passport_expiration_date,
      passport_number: passport_number,
      country_of_current_residence: country_of_current_residence,
      have_green_card: have_green_card,
      green_card_expiration_date: green_card_expiration_date,
      talent_visas: visas
    }
    // TalentAPI.saveTalentInfo(auth.access.user_id, data, this.handleSaveResponse)
    this.props.onSave(data, this.handleSaveResponse)
  }

  handleSaveResponse = (response, isFailed) => {
    this.setState({
      isChanged: false
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state.isChanged)
      }
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

  getKeyOfVisaByName(name, visaTypes) {
    let res = null

    for (let i = 0; i < visaTypes.length; i ++) {
      if (visaTypes[i].name === name) {
        res = i
      }
    }

    return res
  }

  getVisaByName(name, visaTypes) {
    return visaTypes.find(function(visa) {
      return (visa.name === name)
    })
  }

  renderVisaTypeItem(name) {
    const {
      visaTypes
    } = this.state
    const {classes} = this.props

    // let indexOfEnableExpireDate = this.getIndexByVisaType(selected_visa_type)
    let visa = this.getVisaByName(name, visaTypes)
    if (visa) {
      return (
        <Row className="profile-gender-row">
          <Col xs="12" md="6" lg="6" xl="5" className="pt-0 pt-md-0" >
            <FormControlLabel
              control={
                <Checkbox
                  checked={visa.checked}
                  onChange={this.handleVisaChange(visa.name)}
                  value={visa.name}
                  color="primary"
                />
              }
              label={visa.name}
            />
          </Col>
          <Col xs="12" md="6" lg="6" xl="7" className="pt-0 pt-md-0" >
            <TextField
              id={visa.name}
              name={visa.name}
              label="Expiration Date"
              disabled = {visa.checked ? false : true}
              type="date"
              value={visa.expiration_date ? visa.expiration_date : 'YYYY/MM/DD'}
              className={classes.textField}
              onChange={this.handleVisaExpirationDateChange(visa.name)}
            />
          </Col>
        </Row>
      )
    } else {
      return (<Row />)
    }
  }

  renderVisaTypeView() {
    return (
      <div>

        <Row className="profile-gender-row">
          <Col xs="0" md="1" lg="1" xl="2" className="pt-1 pt-md-1" />
          <Col xs="12" md="5" lg="5" xl="4" className="pt-0 pt-md-0" >
            {this.renderVisaTypeItem('B-1')}
          </Col>
          <Col xs="12" md="6" lg="5" xl="4" className="pt-1 pt-md-1" >
            {this.renderVisaTypeItem('M-1')}
          </Col>
          <Col xs="0" md="0" lg="1" xl="2" className="pt-1 pt-md-1" />
        </Row>

        <Row className="profile-gender-row">
          <Col xs="0" md="1" lg="1" xl="2" className="pt-1 pt-md-1" />
          <Col xs="12" md="5" lg="5" xl="4" className="pt-0 pt-md-0" >
            {this.renderVisaTypeItem('B-2')}
          </Col>
          <Col xs="12" md="6" lg="5" xl="4" className="pt-1 pt-md-1" >
            {this.renderVisaTypeItem('O')}
          </Col>
          <Col xs="0" md="0" lg="1" xl="2" className="pt-1 pt-md-1" />
        </Row>

        <Row className="profile-gender-row">
          <Col xs="0" md="1" lg="1" xl="2" className="pt-1 pt-md-1" />
          <Col xs="12" md="5" lg="5" xl="4" className="pt-0 pt-md-0" >
            {this.renderVisaTypeItem('B-1/B-2')}
          </Col>
          <Col xs="12" md="6" lg="5" xl="4" className="pt-1 pt-md-1" >
            {this.renderVisaTypeItem('P-2')}
          </Col>
          <Col xs="0" md="0" lg="1" xl="2" className="pt-1 pt-md-1" />
        </Row>

        <Row className="profile-gender-row">
          <Col xs="0" md="1" lg="1" xl="2" className="pt-1 pt-md-1" />
          <Col xs="12" md="5" lg="5" xl="4" className="pt-0 pt-md-0" >
            {this.renderVisaTypeItem('C1/D')}
          </Col>
          <Col xs="12" md="6" lg="5" xl="4" className="pt-1 pt-md-1" >
            {this.renderVisaTypeItem('Schengen')}
          </Col>
          <Col xs="0" md="0" lg="1" xl="2" className="pt-1 pt-md-1" />
        </Row>

        <Row className="profile-gender-row">
          <Col xs="0" md="1" lg="1" xl="2" className="pt-1 pt-md-1" />
          <Col xs="12" md="5" lg="5" xl="4" className="pt-0 pt-md-0" >
            {this.renderVisaTypeItem('F')}
          </Col>
          <Col xs="12" md="6" lg="5" xl="4" className="pt-1 pt-md-1" >
            {this.renderVisaTypeItem('H1-B')}
          </Col>
          <Col xs="0" md="0" lg="1" xl="2" className="pt-1 pt-md-1" />
        </Row>

        <Row className="profile-gender-row">
          <Col xs="0" md="1" lg="1" xl="2" className="pt-1 pt-md-1" />
          <Col xs="12" md="5" lg="5" xl="4" className="pt-0 pt-md-0" >
            {this.renderVisaTypeItem('J-1')}
          </Col>
        </Row>

      </div>
    )
  }

  renderContents() {
    const { classes, contentTitle } = this.props
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
      <Panel title={contentTitle}>
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
              defaultOptionLabel="Select a country"
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
              defaultOptionLabel="Select a country"
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
              value={passport_expiration_date ? passport_expiration_date : 'YYYY/MM/DD'}
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
              defaultOptionLabel="Select a country"
              value={country_of_current_residence}
              onChange={this.handleCountryOfCurrentResidenceChange} />
          </Col>
        </Row>


        <Row className="profile-gender-row">
          <Col sm="12" className="pt-4 pt-md-4">
            <h5 className="profile-emercy-title">{"Current Visas"}</h5>
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
              value={green_card_expiration_date ? green_card_expiration_date : 'YYYY/MM/DD'}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              disabled={!have_green_card}
              onChange={this.handleGreenCardeExpirationDateChange}
            />
          </Col>
        </Row>

        { this.renderVisaTypeView() }

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
    return (
      <div>
        {this.state.notification && <Alert color="info">{this.state.notification}</Alert>}
        {this.renderContents()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TalentNationalityForm));
