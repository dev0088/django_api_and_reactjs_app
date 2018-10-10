import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import { Row, Col, Alert } from 'reactstrap';
import RaisedButton from 'material-ui/RaisedButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';

import UnitConverter from 'convert-units'
import BmiCalculator from 'bmi-calc'

import Panel from '../components/panel'
import ConfirmChangesDialog from '../components/confirmChangesDialog';

import * as talentActions from  '../actions/talentActions';
import TalentAPI from '../apis/talentAPIs';
import defaultValue from '../constants/defaultValues';

import './myContactInfo.css';
import { styles } from '../styles';


class MyMetrics extends Component {

  constructor(props) {
    super(props);
    this.state = {
      height: "",
      weight: "",
      bmi: "",
      age_range:"",
			HEIGHTS: defaultValue.HEIGHTS,
			WEIGHTS: defaultValue.WEIGHTS,
			AGES: defaultValue.AGES,
			isChanged: false,
			showConfirmChanges: false
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
        height: talentInfo.height,
        weight: talentInfo.weight,
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
      ...this.getInfoFromProps(nextProps),
			isChanged: false
    })
  }

  handleChange = name => event => {
    this.setState(
      {
        [name]: event.target.value,
				isChanged: true
      },
      () => {
        if (name === 'height' || name === 'weight') {
          const {height, weight} = this.state
					console.log('height, weight: ', height, weight)
          let bmiRessult = BmiCalculator(UnitConverter(parseInt(weight, 10)).from('lb').to('kg'),
						parseInt(height, 10)/100, false)
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
      ...this.getInfoFromProps(this.props),
			isChanged: false
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
			height: height,
			weight: weight,
			bmi: bmi,
			age: age,
    }
    console.log('==== data: ', data)
    TalentAPI.saveTalentInfo(auth.access.user_id, data, this.handleSaveResponse)
  }

  handleSaveResponse = (response, isFailed) => {
    console.log('==== response: ', response, isFailed)
    this.props.talentActions.getTalentInfo(this.props.auth.access.user_id)
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

  renderMetricsView (){
    const { height, weight, bmi, age_range, HEIGHTS, WEIGHTS, AGES } = this.state
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
                  HEIGHTS.map((height, index) => {
                    let heightInFeet = 0
                    let heightIntegerInFeet = 0
                    let heightDecimalInInch = 0
										let prefix = ''
										let tmp_height = height
										if (index === (HEIGHTS.length - 1)) {
											tmp_height = HEIGHTS[HEIGHTS.length - 2]
											prefix = '>'
										}

                    heightInFeet = UnitConverter(parseInt(tmp_height, 10))
											.from('cm').to('ft-us')
                    heightIntegerInFeet = Math.floor(heightInFeet)
                    heightDecimalInInch = Math.round(UnitConverter(heightInFeet - heightIntegerInFeet).from('ft-us').to('in'))
                    return (
                      <MenuItem key={index} value={height} >
                        &nbsp;{prefix}{heightIntegerInFeet}'{heightDecimalInInch}"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{prefix}{tmp_height}cm
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
                    WEIGHTS.map((weight, index) => {
                      let weightInLb = 0
											let prefix = ''
											let tmp_weight = weight
											if (index === (WEIGHTS.length - 1)) {
												tmp_weight = WEIGHTS[WEIGHTS.length - 2]
												prefix = '>'
											}
                      weightInLb = Math.round(UnitConverter(tmp_weight).from('lb').to('kg') * 10) / 10
                      return (
                        <MenuItem key={index}
													value={weight} >
                          &nbsp;{prefix}{tmp_weight} lbs. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{prefix}{weightInLb} kg
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
		const {showConfirmChanges} = this.state
    return (
      <div className="contact-info-view-container">
        {this.state.notification && <Alert color="info">{this.state.notification}</Alert>}
        {this.renderMetricsView()}

        <Row >
          <Col xs="12" md="8" className="pt-4 pt-md-4"> </Col>
            <Col xs="12" md="4" className="pt-3 pt-md-3 profile-save-button-group-col">
            <Link to="/edit-profile" onClick={this.checkChanges}>
              <RaisedButton label="Back to Build/Edit My Profile" primary={true}/>
            </Link>
          </Col>
        </Row>

        <ConfirmChangesDialog
          open={showConfirmChanges}
          onClose={this.handleCloseConfirm}
        />
      </div>
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
