import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import { Row, Col, Alert } from 'reactstrap';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';

import UnitConverter from 'convert-units'
import BmiCalculator from 'bmi-calc'

import Panel from '../components/panel'

import * as talentActions from  '../actions/talentActions';
import TalentAPI from '../apis/talentAPIs'
import apiConfig from '../constants/api';

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

// Unit is cm
const HEIGHTS = [
  '147',
  '150',
  '155',
  '157',
  '160',
  '163',
  '165',
  '168',
  '170',
  '173',
  '175',
  '178',
  '180',
  '183',
  '185',
  '188',
  '191',
  '193',
  '196',
  '198',
  '>198'
]

// Unit is kg
const WEIGHTS = [
  '45',
  '48',
  '50',
  '52',
  '54',
  '57',
  '59',
  '61',
  '64',
  '66',
  '68',
  '70',
  '73',
  '75',
  '77',
  '79',
  '82',
  '84',
  '86',
  '88',
  '91',
  '93',
  '95',
  '98',
  '100',
  '102',
  '104',
  '107',
  '109',
  '111',
  '113',
  '>113'
]

const AGES = [
  '18-21',
  '22-25',
  '26-30',
  '31-35',
  '36-40',
  '41-45',
  '46-50',
  '51+'
]
class MyMetrics extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      height: "",
      weight: "",
      bmi: "",
      age_range:"",
    };
  }

  getInfoFromProps(props) {
    const {
      talentInfo
    } = props

    let metricsInfo = {
      height: "",
      weight: "",
      bmi: "",
      age_range:"",
    }

    if (talentInfo && talentInfo.user) {
      metricsInfo = {
        height: talentInfo.height.toString(),
        weight: talentInfo.weight.toString(),
        bmi: talentInfo.bmi.toString(),
        age_range: talentInfo.age_range,
      }
    }

    return {
      ...metricsInfo
    }
  }

  componentWillMount() {
    if (this.props.auth.access && this.props.auth.access.user_id) {
      this.props.talentActions.getTalentInfo(this.props.auth.access.user_id)
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps: ', this.getInfoFromProps(nextProps))
    this.setState({
      ...this.getInfoFromProps(nextProps)
    })
  }

  handleChange = name => event => {
    this.setState(
      { 
        [name]: event.target.value 
      }, 
      () => {
        if (name === 'height' || name === 'weight'){
          const {height, weight} = this.state
          console.log('height, weight: ', height, weight)
          let bmiRessult = BmiCalculator(parseInt(weight), parseInt(height)/100, false)
          let bmi = Math.round(bmiRessult.value * 10) / 10
  
          this.setState({
            bmi: isNaN(bmi) ? 'None' : bmi // + ' ' + bmiRessult.name
          })
        }
      }
    );
  };

  handleCancel = () => {
    this.setState({
      ...this.getInfoFromProps(this.props)
    })
  }

  handleSave = () => {
    const { auth } = this.props
    const {
        height,
        weight,
        bmi,
        age,
    } = this.state

    let data = {
      ...this.state,
    }
    console.log('==== data: ', data)
    TalentAPI.saveTalentInfo(auth.access.user_id, data, this.handleSaveResponse)
  }

  handleSaveResponse = (response, isFailed) => {
    console.log('==== response: ', response, isFailed)
    this.props.talentActions.getTalentInfo(this.props.auth.access.user_id)
  }

  renderMetricsView (){
    const { height, weight, bmi, age_range } = this.state
    const { classes } = this.props

    return (
      <Panel title={"My Height, Weight, & Age Range"}>
        <Row className="profile-gender-row">
        <Col sm="3">
          <h5>Height</h5>
        </Col>
        <Col sm="3">
          <h5>Weight</h5>
        </Col>
        <Col sm="3">
          <h5>BMI</h5>
        </Col>
        <Col sm="3">
          <h5>Age Range</h5>
        </Col>
        </Row>
        <Row className="profile-gender-row">
          <Col xs="12" md="3" className="pt-3 pt-md-3">
            <FormControl >
              <FormLabel htmlFor="uncontrolled-native">&nbsp;USA &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; EUROPE</FormLabel>
              <Select 
                value={height} 
                onChange={this.handleChange('height')} 
                defaultValue={HEIGHTS[0]} 
                input={<Input name="height" 
                id="uncontrolled-native" />}>
                  {
                    Object.keys(HEIGHTS).map((key) => {
                      let height = HEIGHTS[key]
                      let heightInFeet = 0
                      let heightIntegerInFeet = 0
                      let heightDecimalInInch = 0
                      if (height === '>198') {
                        heightIntegerInFeet = ">6"
                        heightDecimalInInch = "6"
                      } else {
                        heightInFeet = UnitConverter(parseInt(height)).from('cm').to('ft-us')
                        heightIntegerInFeet = Math.floor(heightInFeet)
                        heightDecimalInInch = Math.round(UnitConverter(heightInFeet - heightIntegerInFeet).from('ft-us').to('in'))
                      }
                      return (
                        <MenuItem key={key} value={height} >
                          &nbsp;{heightIntegerInFeet}'{heightDecimalInInch}"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{height}cm
                        </MenuItem>      
                      )
                    })
                  }
              </Select>
            </FormControl>
          </Col>
          <Col xs="12" md="3" className="pt-3 pt-md-3">
            <FormControl>
              <FormLabel htmlFor="uncontrolled-native">&nbsp;USA &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; EUROPE</FormLabel>
              <Select 
                value={weight} 
                onChange={this.handleChange('weight')} 
                defaultValue={WEIGHTS[0]} 
                input={<Input name="weight" id="uncontrolled-native" />}>
                  {
                    Object.keys(WEIGHTS).map((key) => {
                      let weight = WEIGHTS[key]
                      let weightInLb = 0
                      if (weight === '>113') {
                        weightInLb = '>250'
                      } else {
                        weightInLb = Math.round(UnitConverter(parseInt(weight)).from('kg').to('lb'))
                      }
                      return (
                        <MenuItem key={key} value={weight} >
                          &nbsp;{weightInLb} lbs. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{weight} kg
                        </MenuItem>      
                      )
                    })
                  }
              </Select>
            </FormControl>
          </Col>
          <Col xs="12" md="3" className="pt-3 pt-md-3">
            <Typography align='center' variant="title" gutterBottom>
              {bmi}
            </Typography>
          </Col>
          <Col xs="12" md="3" className="pt-3 pt-md-3">
            <FormControl>
              <Select 
                value={age_range} 
                onChange={this.handleChange('age_range')} 
                defaultValue={AGES[0]} 
                input={<Input name="age_range" id="uncontrolled-native"/>}
              >
                {
                  Object.keys(AGES).map((key) => {
                    return (
                      <MenuItem key={key} value={AGES[key]}>{AGES[key]}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
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
    return (
      <MuiThemeProvider theme={theme}>
        <div className="contact-info-view-container">
          {this.state.notification && <Alert color="info">{this.state.notification}</Alert>}
          {this.renderMetricsView()}
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MyMetrics));
