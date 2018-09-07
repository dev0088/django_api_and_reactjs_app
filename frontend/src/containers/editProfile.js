import React, {Component} from 'react';
import { Row, Col, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SwipeableViews from 'react-swipeable-views';
import Dropzone from 'react-dropzone';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';
import DropDown from 'react-dropdown';
import moment from 'moment';
import Panel from '../components/panel';
import MultipleSelect from '../components/multipleSelect';
import * as talentActions from  '../actions/talentActions';
import TalentAPI from '../apis/talentAPIs'
import './editProfile.css'
import apiConfig from '../constants/api';
import defaultValues from '../constants/defaultValues';
import 'react-dropdown/style.css'

const const_genders = ["Male", "Female"];

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

// var ReactS3Uploader = require('react-s3-uploader');

class EditProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userID: props.auth.access.user_id,
      gender: "Male",
      skill: "Vocalist",
      subskill: ["tenor"],
      other_skill: ["dances"],
      other_sub_skill: [],
      notification: false,
      tab1Value: 0,
      tab2Value: 0,
      contactInfo: {
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        address1: "",
        address2: "",
        address3: "",
        address4: "",
        birthday: null
      },
      emergencyInfo: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        relationship: 0
      },
      allPositionTypes: [],
      currentSubPositionType: props.talentInfo && props.talentInfo.talent_position_sub_type
        ? { value: props.talentInfo.talent_position_sub_type.name,
            label: props.talentInfo.talent_position_sub_type.name }
        : '',
			currentAdditionalPositionTypes: null,
      currentAdditionalPositionSubTypes: null,

			currentAdditionalGroups: [],

			worked_cruise_ship: false
    }
  }

	exitType = (typeName, name, items) => {
		console.log('==== items: ', items)
		console.log('==== typeName: ', typeName)
		for(let i = 0; i < items.length; i ++) {
			if (items[i][typeName].name === name) {
				return true
			}
		}
		return false
	}

	// exitPositionSubType = (name, items) => {
	// 	for(let i = 0; i < items.length; i ++) {
	// 		if (items[i].talent_position_sub_type.name === name) {
	// 			return true
	// 		}
	// 	}
	// 	return false
	// }

	generateGroupsFromTypes = (allPositionTypes, currentPositionTypes, currentPositionSubTypes) => {
		let groups = []
		allPositionTypes.map((positionType, index) => {
			let options = []
			if (positionType.name != defaultValues.DEFAULT_PRACTICE_POSITION_TYPE) {
				positionType.talent_position_sub_types.map((positionSubType, index) => {
					options.push({
						label: positionSubType,
						value: positionSubType,
						group: positionType.name,
						isGroup: false,
						isChecked: this.exitType(
												'talent_position_sub_type',
												positionSubType,
												currentPositionSubTypes)
					})
				})
				groups.push({
					label: positionType.name,
					value: positionType.name,
					isGroup: true,
					isChecked: this.exitType('talent_position_type',
											positionType.name,
											currentPositionTypes),
					options: options
				})
			}
		})
		return groups
	}

	isChckedPositionType = (name, positionTypes) => {
		for(let i = 0; i < positionTypes.length; i ++ ) {
			if (positionTypes[i].name === name) {
				return true
			}
		}
		return false
	}

  getPositionTypesFromProps(props) {
    const {
      auth,
      allPositionTypes,
      talentInfo
    } = props
    let positionTypes = []
    let currentSubPositionType = []
		let currentAdditionalPositionTypes = []
    let currentAdditionalPositionSubTypes = []
		let currentAdditionalGroups = []
    let userID = auth.access.user_id
    let gender = 'Male'
    let contactInfo = {}
    let emergencyInfo = {}
		let worked_cruise_ship = false
    // if (allPositionTypes) {
    //   positionTypes = allPositionTypes
    // }
    if (talentInfo) {
      gender = talentInfo.sex === 'm' ? 'Male' : 'Female'
      // Get sub position types for primary and secondary of talent
      let subPostionType = {}
      if (talentInfo.talent_position_sub_type) {
        subPostionType = {
          value: talentInfo.talent_position_sub_type.name,
          label: talentInfo.talent_position_sub_type.name,
          positionType: talentInfo.talent_position_sub_type.talent_position_type
        }
      }

      currentSubPositionType = subPostionType

			currentAdditionalGroups = this.generateGroupsFromTypes(
					allPositionTypes ? allPositionTypes : [],
					talentInfo.talent_additional_position_types,
					talentInfo.talent_additional_position_sub_types
				)
			console.log('=== currentAdditionalGroups: ', currentAdditionalGroups)
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
        birthday: moment(talentInfo.birthday)
      }
      emergencyInfo = {
        firstName: talentInfo.emergency_first_name,
        lastName: talentInfo.emergency_last_name,
        email: talentInfo.emergency_email,
        phone: talentInfo.emergency_phone,
        relationship: talentInfo.emergency_relationship
      }
			worked_cruise_ship = talentInfo.worked_cruise_ship
    }

    return {
      userID,
      gender,
      allPositionTypes,
      currentSubPositionType,
			currentAdditionalGroups,
      contactInfo,
      emergencyInfo,
			worked_cruise_ship
    }
  }

  componentWillMount() {
    this.props.talentActions.getAllPositionTypes()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.getPositionTypesFromProps(nextProps)
    })
  }

  clickButton = (type, val) =>  {
    if (type === 'other_sub_skill')
    {
      let temp_skill = this.state[type].slice(), pos;
      if ((pos = temp_skill.indexOf(val)) > -1){
        temp_skill.splice(pos, 1);
      }
      else
        temp_skill.push(val);
      this.setState({ [type]: temp_skill });
    }
    else if (type === 'other_skill' || type === 'subskill') {
      let temp_skill = [val];
      this.setState({ [type]: temp_skill });
    }
    else{
      this.setState({ [type]: val, 'subskill': [] });
    }
  }

  handleTab1Change = (value) => {
    this.setState({
      tab1Value: value,
    });
  };

  handleTab2Change = (value) => {
    this.setState({
      tab2Value: value,
    });
  }

  handleContactInfoChange = (event) => {
    const { contactInfo } = this.state;
    contactInfo[event.target.name.substring(8)] = event.target.value;
    this.setState({
      contactInfo: contactInfo,
    });
  }

  handleBirthdayChange = (event, date) => {
    const { contactInfo } = this.state;
    contactInfo['birthday'] = date;
    this.setState({ contactInfo: contactInfo })
  }

  handleEmergencyInfoChange = (event) => {
    const { emergencyInfo } = this.state;
    emergencyInfo[event.target.name.substring(10)] = event.target.value;
    this.setState({
      emergencyInfo: emergencyInfo,
    });
  }

  handleRelationshipChange = (event, index, value) => {
    const { emergencyInfo } = this.state;
    emergencyInfo['relationship'] = value;
    this.setState({ emergencyInfo: emergencyInfo });
  }

  handleSubPositionSelect = (item) => {
    this.setState({
      currentSubPositionType: item
    })
  }

	isPositionType = (name) => {
		const { allPositionTypes } = this.props
		let res = false
		allPositionTypes.map((positionType, index) => {
			if (positionType.name === name) {
				res = true
			}
		})
		return res
	}

  handleCurrentAdditionalPositionSubTypesSelect = (groups) => {
    this.setState({
			currentAdditionalGroups: groups
	  });
  }

	// handleMultipleSelect = (selectedItems) =>
  handlePositionTypeCancel = () => {
    this.setState({
      ...this.getPositionTypesFromProps(this.props)
    })
  }

	groups2PositionSubTypes(groups) {
		let talent_additional_position_types = []
		let talent_additional_position_sub_types = []

    groups.map((group, index) => {
			if (group.isChecked) {
				talent_additional_position_types.push({
					name: group.value
				})
			}

			group.options.map((option, index) => {
				if (option.isChecked) {
					talent_additional_position_sub_types.push({
		        name: option.value,
		        talent_position_type: group.value
		      })
				}
			})

    })

		return {
			talent_additional_position_types,
			talent_additional_position_sub_types
		}
	}

  handlePositionTypeSave = () => {
    const {
      userID,
      gender,
      currentSubPositionType,
      currentAdditionalGroups
    } = this.state

    const {
			talent_additional_position_types,
			talent_additional_position_sub_types
		} = this.groups2PositionSubTypes(currentAdditionalGroups)

    let data = {
      sex: gender === "Male" ? "m" : "f",
      talent_position_sub_type: {
        name: currentSubPositionType.value,
        talent_position_type: currentSubPositionType.positionType
      },
			talent_additional_position_types: talent_additional_position_types,
      talent_additional_position_sub_types: talent_additional_position_sub_types
    }

    TalentAPI.saveTalentInfo(userID, data, this.handlePositionTypeSaveResponse)
  }

  handlePositionTypeSaveResponse = (response, isFailed) => {
    console.log('==== response: ', response, isFailed)
    this.props.talentActions.getTalentInfo(this.state.userID)
  }

  handleBusinessStaffCancel = () => {
    const {
      contactInfo,
      emergencyInfo
    } = this.getPositionTypesFromProps(this.props)

    this.setState({
      contactInfo,
      emergencyInfo
    })
  }

  handleBusinessStaffSave = () => {
    const {
      userID,
      contactInfo,
      emergencyInfo
    } = this.state
    console.log('=== this.state: ', this.state)
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
      birthday: moment(contactInfo.birthday).format('YYYY-MM-DD'),
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
    this.props.talentActions.getTalentInfo(this.state.userID)
  }

	handleChangeWorkedCruiseShip = name => event => {
		let checked = event.target.checked
		this.setState({
			worked_cruise_ship: checked
		}, () => {
			let data = {
				worked_cruise_ship: checked
			}
			TalentAPI.saveTalentInfo(this.state.userID, data, this.handleWorkedCruiseShipSaveResponse)
		})
	}

	handleWorkedCruiseShipSaveResponse = (response, isFailed) => {
		this.props.talentActions.getTalentInfo(this.state.userID)
	}

  renderPositionTypesView() {
    const { allPositionTypes } = this.props
    let groups = []

    if (allPositionTypes) {
      Object.keys(allPositionTypes).map((key) => {
        const positionType = allPositionTypes[key]
        if (positionType.name === 'Practice') {
          return positionType;
        }
        let group = {
          type: 'group',
          name: positionType.name,
          items: []
        }
        Object.keys(positionType.talent_position_sub_types).map((key) => {
          const positionSubType = positionType.talent_position_sub_types[key]
          group.items.push({
            value: positionSubType,
            label: positionSubType,
            className: 'profile-position-sub-type-item'
          })
        })
        groups.push(group)
      })
    }

    return (
      <DropDown
        options={groups}
        onChange={this.handleSubPositionSelect}
        value={this.state.currentSubPositionType}
        placeholder="Select an option" />
    )
  }

  // renderMultiSelectionPositionTypesView() {
  //   const { allPositionTypes } = this.props
  //   let groups = []
	//
  //   if (allPositionTypes) {
  //     Object.keys(allPositionTypes).map((key) => {
  //       const positionType = allPositionTypes[key]
  //       if (positionType.name === 'Practice') {
  //         return;
  //       }
  //       let group = {
  //         label: positionType.name,
  //         options: []
  //       }
  //       Object.keys(positionType.talent_position_sub_types).map((key) => {
  //         const positionSubType = positionType.talent_position_sub_types[key]
  //         group.options.push({
  //           label: positionSubType,
  //           value: positionSubType,
  //           group: positionType.name
  //         })
  //       })
  //       groups.push(group)
  //     })
  //   }
	//
  //   return (
  //     <Select
  //       closeMenuOnSelect={false}
  //       components={makeAnimated()}
  //       options={groups}
  //       isMulti
  //       label="Single select"
  //       value={this.state.currentAdditionalPositionSubTypes}
  //       onChange={this.handleCurrentAdditionalPositionSubTypesSelect}
  //     />
  //   )
  // }

	renderMultipleSelectView() {
    const { currentAdditionalGroups } = this.state

    return (
      <MultipleSelect
				label={"Select your positions"}
        groups={currentAdditionalGroups}
				onChange={this.handleCurrentAdditionalPositionSubTypesSelect}
      />
    )
  }

  renderGeneralInfoView() {
    const { classes } = this.props;

    return (
      <Panel title={"General Info"} >
        <Row className="profile-gender-row">
          <Col xs="12" md="2" className="pt-3 pt-md-3">
            <h5>I am a...</h5>
          </Col>
          <Col xs="12" md="10" className="pt-0 pt-md-2">
          {
            const_genders.map((gender, index) => {
              return (
                <FlatButton
                  key={index}
                  label={gender}
                  primary={(gender === this.state.gender)}
                  onClick={() => this.clickButton('gender', gender)}
                  className={ (gender === this.state.gender) ? "skill-button-primary" : "normal-button" }
                />)
            })
          }
          </Col>
        </Row>
        <Row className="profile-gender-row">
          <Col xs="12" md="2" className="pt-4 pt-md-4"> <h5>Who is a...</h5> </Col>
          <Col xs="12" md="10" className="pt-3 pt-md-3">
						{ this.renderPositionTypesView() }
					</Col>
        </Row>
        <Row className="profile-gender-row">
          <Col xs="12" md="2" className="pt-4 pt-md-4"> <h5>Who also...</h5> </Col>
          <Col xs="12" md="10" className="pt-3 pt-md-3">
						{/* { this.renderMultiSelectionPositionTypesView() } */}
						{ this.renderMultipleSelectView() }
					</Col>
        </Row>
        <Row className="profile-gender-row">
          <Col xs="12" md="8" className="pt-4 pt-md-4"> </Col>
          <Col xs="12" md="4" className="pt-3 pt-md-3 profile-save-button-group-col">
            <Button size="large"
              className={classes.button}
              onClick={this.handlePositionTypeCancel} >
              {'Cancel'}
            </Button>
            <Button size="large" color="primary"
              className={classes.button}
              onClick={this.handlePositionTypeSave}>
              {'Save'}
            </Button>
          </Col>
        </Row>
      </Panel>
    )
  }

  renderBussinessStaff() {
    return (
      <Panel title={"The Business Stuff"}>
        <Row className="profile-gender-row">
          <div className="profile-other-info-button-group">
            <div className="profile-other-info-button-container">
              <Link to='/contact-info'>
                <Button variant="contained"  color="primary" className={"profile-other-info-button"} >
                  <div className="profile-other-info-button-title">
                    {"My Contact Info"}
                  </div>
                  <div className="profile-other-info-button-status">
                    {'completed'}
                  </div>
                </Button>
              </Link>
            </div>

            <div className="profile-other-info-button-container">
              <Link to='/nationality-info'>
                <Button variant="contained"  color="primary" className={"profile-other-info-button"} >
                  <div className="profile-other-info-button-title">
                    {"My Nationality"}
                  </div>
                  <div className="profile-other-info-button-status">
                    {'in progress'}
                  </div>
                </Button>
              </Link>
             </div>

            <div className="profile-other-info-button-container">
              <Link to='/language-info'>
                <Button variant="contained"  color="primary" className={"profile-other-info-button"} >
                  <div className="profile-other-info-button-title">
                    {"My Languages"}
                  </div>
                  <div className="profile-other-info-button-status">
                    {'in progress'}
                  </div>
                </Button>
              </Link>
            </div>

            <div className="profile-other-info-button-container">
              <Link to='/metrics-info'>
                <Button variant="contained"  color="primary" className={"profile-other-info-button"} >
                  <div className="profile-other-info-button-title">
                    {"My Height, Weight, & Age Range"}
                  </div>
                  <div className="profile-other-info-button-status">
                    {'in progress'}
                  </div>
                </Button>
              </Link>
            </div>

            <div className="profile-other-info-button-container">
              <Link to='/medical-info'>
                <Button variant="contained"  color="primary" className={"profile-other-info-button"} >
                  <div className="profile-other-info-button-title">
                    {"My Medical"}
                  </div>
                  <div className="profile-other-info-button-status">
                    {'in progress'}
                  </div>
                </Button>
              </Link>
            </div>
          </div>
        </Row>
      </Panel>
    )

  }

  renderFunStaff() {
    return (
      <Panel title={"The Fun Stuff"}>
        <Row className="profile-gender-row">
          <div className="profile-other-info-button-group">
            <div className="profile-other-info-button-container">
              <Link to='/bio-info'>
                <Button variant="contained"  color="primary" className={"profile-other-info-button"} >
                  <div className="profile-other-info-button-title">
                    {"My Headline & Bio"}
                  </div>
                  <div className="profile-other-info-button-status">
                    {'completed'}
                  </div>
                </Button>
              </Link>
            </div>

            <div className="profile-other-info-button-container">
              <Link to='/resume-info'>
                <Button variant="contained"  color="primary" className={"profile-other-info-button"} >
                  <div className="profile-other-info-button-title">
                    {"My Resume"}
                  </div>
                  <div className="profile-other-info-button-status">
                    {'in progress'}
                  </div>
                </Button>
              </Link>
             </div>

            <div className="profile-other-info-button-container">
              <Link to='/pictures-info'>
                <Button variant="contained"  color="primary" className={"profile-other-info-button"} >
                  <div className="profile-other-info-button-title">
                    {"My Pictures"}
                  </div>
                  <div className="profile-other-info-button-status">
                    {'under review'}
                  </div>
                </Button>
              </Link>
            </div>

            <div className="profile-other-info-button-container">
              <Link to='/videos-info'>
                <Button variant="contained"  color="primary" className={"profile-other-info-button"} >
                  <div className="profile-other-info-button-title">
                    {"My Videos"}
                  </div>
                  <div className="profile-other-info-button-status">
                    {'in progress'}
                  </div>
                </Button>
              </Link>
            </div>

          </div>
        </Row>
      </Panel>
    )
  }

  render() {
		const { worked_cruise_ship } = this.state
		console.log('=== worked_cruise_ship: ', worked_cruise_ship)
    return (
      <MuiThemeProvider theme={theme}>
        <div className="profile-edit-container">
          {this.state.notification && <Alert color="info">{this.state.notification}</Alert>}
          <Row className="profile-edit-title">
            <h3>Build/Edit My Profile</h3>
          </Row>

          {this.renderGeneralInfoView()}

          <Row className="profile-edit-buttons">
            <Col sm="12">
              <h4>Let's Build or Edit Your Profile...</h4>
            </Col>
          </Row>

          {this.renderBussinessStaff()}

          {this.renderFunStaff()}

          <Row>
            <Col sm="12" className="pt-0 pt-md-0">
							<FormControlLabel
								control={
									<Checkbox
										checked={worked_cruise_ship}
										onChange={this.handleChangeWorkedCruiseShip('worked_cruise_ship')}
										value={'worked_cruise_ship'}
										color="primary"
									/>
								}
								label={"I have worked on a cruise ship before (select if you have previous ship experience)"}
							/>
            </Col>
          </Row>
          <Row >
            <Col xs="12" md="8" className="pt-4 pt-md-4"> </Col>
            <Col xs="12" md="4" className="pt-3 pt-md-3 profile-save-button-group-col">
              <Link to="/home" className="profile-other-info-button-container">
                <RaisedButton label="Back to My Home Page" primary={true}/>
              </Link>
              <Link to="/profile">
                <RaisedButton label="View My Profile" primary={true}/>
              </Link>
            </Col>
          </Row>
        </div>
      </MuiThemeProvider>
    )
  }
}

function mapStateToProps(state) {
  const { auth, talentReducer,  talentInfo, allPositionTypes} = state;
  return {
    auth,
    talentReducer,
    talentInfo: talentInfo.value,
    allPositionTypes: allPositionTypes.value
  }
}

function mapDispatchToProps(dispatch) {
  return {
    talentActions: bindActionCreators(talentActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditProfile));
