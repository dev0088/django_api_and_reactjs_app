import React, {Component} from 'react';
import { Row, Col, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import DropDown from 'react-dropdown';
import moment from 'moment';

import Panel from '../components/panel';
import MultiSelectDropdown from '../components/dropdown/multiSelectDropdown';
import SingleSelectDropdown from '../components/dropdown/singleSelectDropdown';
import ConfirmChangesDialog from '../components/confirmChangesDialog';
import * as talentActions from  '../actions/talentActions';
import TalentAPI from '../apis/talentAPIs';
import defaultValues from '../constants/defaultValues';

import 'react-dropdown/style.css'
import './editProfile.css'
import { styles, theme } from '../styles';

// var ReactS3Uploader = require('react-s3-uploader');

class EditProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userID: props.auth.access.user_id,
      gender: "Male",
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
      allSkills: [],
      // currentSubPositionType: props.talentInfo && props.talentInfo.talent_position_sub_type
      //   ? { value: props.talentInfo.talent_position_sub_type.name,
      //       label: props.talentInfo.talent_position_sub_type.name }
      //   : '',
      // currentAdditionalPositionTypes: null,
      // currentAdditionalPositionSubTypes: null,

      currentPositionTypesGroup: [],
			currentSkillGroups: [],

			worked_cruise_ship: false,

			isChanged: false,
			showConfirmChanges: false
    }
  }

	exitType = (typeName, name, items) => {
    if (typeName && name && items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i][typeName].name === name) {
          return true
        }
      }
    }

		return false
	}

  exitSkill = (typeName, name, items) => {
    if (typeName && name && items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i][typeName] === name) {
          return true
        }
      }
    }

    return false
  }

	exitPositionTypes(typeName, subTypeName, allTypes) {
    for (let i = 0; i < allTypes.length; i++) {
      if (allTypes[i].name === typeName) {
        if (allTypes.position_sub_types) {
          for (let j = 0; j < allTypes[i].position_sub_types.length; j ++) {
            if (allTypes[i].position_sub_types[j] === subTypeName) {
              return true
            }
          }
        } else {
          return true
        }
      }
    }
    return false
  }

	generateGroupFromPositionSubTypes = (allPositionTypes, talent_position_types, talent_position_sub_types) => {
		let groups = []
    let index = 0

		for (let i = 0; i < allPositionTypes.length; i ++) {
			let positionType = allPositionTypes[i]

			if (positionType.name !== defaultValues.DEFAULT_PRACTICE_POSITION_TYPE) {
        let options = []
        console.log('==== positionType, talent_position_types: ', positionType.name, talent_position_types[0].position_type)
			  let group = {
          label: positionType.name,
          value: index ++,
          // index: index ++,
          isGroup: true,
          isChecked: (talent_position_types && talent_position_types.length > 0 &&
                      positionType.name === talent_position_types[0].position_type &&
                      talent_position_sub_types &&  talent_position_sub_types.length === 0),
          options: []
        }

			  for (let j = 0; j < positionType.position_sub_types.length; j ++ ) {
					let positionSubType = positionType.position_sub_types[j]
					options.push({
						label: positionSubType,
						value: index ++,
						group: positionType.name,
            // index: index ++,
						isGroup: false,
						isChecked: (talent_position_sub_types &&  talent_position_sub_types.length > 0 &&
                          positionType.name === talent_position_sub_types[0].position_sub_type.position_type &&
                          positionSubType === talent_position_sub_types[0].position_sub_type.name)
					})
				}
        group.options = options

				groups.push(group)
			}
		}

		return groups
	}

  generateGroupsFromSkills = (allSkills, currentSkills, currentSubSkills) => {
    let groups = []
    let index = 0

    for (let i = 0; i < allSkills.length; i ++) {
      let skill = allSkills[i]

      if (skill.name !== defaultValues.DEFAULT_PRACTICE_POSITION_TYPE) {
        let options = []
        let group = {
          label: skill.name,
          value: skill.name,
          index: index ++,
          isGroup: true,
          options: [],
          isChecked: this.exitSkill('skill', skill.name, currentSkills),
          multiSelection: skill.multi_selection,
          data: skill
        }

        for (let j = 0; j < skill.sub_skills.length; j ++ ) {
          let subSkill = skill.sub_skills[j]
          options.push({
            label: subSkill,
            value: subSkill,
            group: skill.name,
            index: index ++,
            isGroup: false,
            isChecked: this.exitType(
              'sub_skill',
              subSkill,
              currentSubSkills)
          })
        }
        group.options = options

        groups.push(group)
      }
    }

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

  getInfoFromProps(props) {
    const {
      auth,
      allPositionTypes,
      allSkills,
      talentInfo
    } = props
    let currentSubPositionType = {}
    let currentPositionTypesGroup = []
		let currentSkillGroups = []
    let userID = auth.access.user_id
    let gender = 'Male'
    let contactInfo = {}
    let emergencyInfo = {}
		let worked_cruise_ship = false

    if (talentInfo) {
      gender = talentInfo.sex === 'm' ? 'Male' : 'Female'
      // Get sub position types for primary and secondary of talent
      let subPostionType = {}

      currentSubPositionType = subPostionType
      currentPositionTypesGroup = this.generateGroupFromPositionSubTypes(
                                    allPositionTypes ? allPositionTypes : [],
                                    talentInfo.talent_position_types,
                                    talentInfo.talent_position_sub_types)
			currentSkillGroups = this.generateGroupsFromSkills(
                              allSkills ? allSkills : [],
                              talentInfo.talent_skills,
                              talentInfo.talent_sub_skills,
                            )

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
      currentPositionTypesGroup,
			currentSkillGroups,
      contactInfo,
      emergencyInfo,
			worked_cruise_ship
    }
  }

  componentWillMount() {
    this.props.talentActions.getAllPositionTypes()
    this.props.talentActions.getAllSkills()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.getInfoFromProps(nextProps)
    })
  }

  clickButton = (type, val) =>  {
  	this.setState({ [type]: val});
  }

  handleSubPositionSelect = (groups) => {
    console.log('==== handleSubPositionSelect: groups: ', groups)
    this.setState({
      // currentSubPositionType: item,
      currentPositionTypesGroup: groups,
			isChanged: true
    })
  }

	isPositionType = (name) => {
		const { allPositionTypes } = this.props
		let res = false

		for (let i = 0; i < allPositionTypes.length; i ++) {
			let positionType = allPositionTypes[i]
			if (positionType.name === name) {
				res = true
				break
			}
		}

		return res
	}

  handleCurrentSubSkillsSelect = (groups) => {
    this.setState({
			currentSkillGroups: groups,
			isChanged: true
	  });
  }

  handlePositionTypeCancel = () => {
    this.setState({
      ...this.getInfoFromProps(this.props),
			isChanged: false
    })
  }

  groups2SubPositionType(groups) {
    let talent_sub_position_type = ''
    let talent_position_type = ''

    for (let i = 0; i < groups.length; i ++) {
      let group = groups[i]
      if (group.isChecked) {
        talent_position_type = group.label
        break
      }

      for (let j = 0; j < group.options.length; j ++) {
        let option = group.options[j]
        if (option.isChecked) {
          talent_position_type = group.label
          talent_sub_position_type = option.label
          return {
            talent_sub_position_type,
            talent_position_type
          }
        }
      }
    }

    return {
      talent_sub_position_type,
      talent_position_type
    }
  }

	groups2SubSkills(groups) {
		let talent_skills = []
		let talent_sub_skills = []
    console.log('===== groups2SubSkills: groups: ', groups)
		for (let i = 0; i < groups.length; i ++) {
			let group = groups[i]
			if (group.isChecked) {
				talent_skills.push({
					name: group.value
				})
			}

			for (let j = 0; j < group.options.length; j ++) {
				let option = group.options[j]
				if (option.isChecked) {
					talent_sub_skills.push({
						name: option.value,
						talent_position_type: group.value
					})
				}
			}
		}

		return {
			talent_skills,
			talent_sub_skills
		}
	}

  handleSavePositionsAndSkills = () => {
    const {
      userID,
      gender,
      currentPositionTypesGroup,
      currentSkillGroups
    } = this.state

    const {
			talent_skills,
			talent_sub_skills
		} = this.groups2SubSkills(currentSkillGroups)
    const {
      talent_sub_position_type,
      talent_position_type,
    } = this.groups2SubPositionType(currentPositionTypesGroup)

    let data = {
      sex: gender === "Male" ? "m" : "f",
			talent_skills: talent_skills,
      talent_position_type: talent_position_type,
      talent_position_sub_type: talent_sub_position_type,
      talent_sub_skills: talent_sub_skills
    }

    console.log('===== data: ', data)
    TalentAPI.saveTalentInfo(userID, data, this.handleSavePositionsAndSkillsResponse)
  }

  handleSavePositionsAndSkillsResponse = (response, isFailed) => {
    console.log('==== response: ', response, isFailed)
    this.props.talentActions.getTalentInfo(this.state.userID)
		this.setState({
			isChanged: false
		})
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

  renderPositionTypesView() {
    const { currentPositionTypesGroup } = this.state

    return (
      <SingleSelectDropdown
        label={"Select an option"}
        groups={currentPositionTypesGroup}
        onChange={this.handleSubPositionSelect}
      />
    )
  }

	renderMultiSelectDropdownView() {
    const { currentSkillGroups } = this.state

    return (
      <MultiSelectDropdown
				label={"Select your positions"}
        groups={currentSkillGroups}
				onChange={this.handleCurrentSubSkillsSelect}
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
            defaultValues.GENDERS.map((gender, index) => {
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
						{ this.renderMultiSelectDropdownView() }
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
              onClick={this.handleSavePositionsAndSkills}>
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
		const { worked_cruise_ship, showConfirmChanges } = this.state
    return (
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
            <Link to="/home" onClick={this.checkChanges} className="profile-other-info-button-container">
              <RaisedButton label="Back to My Home Page" primary={true}/>
            </Link>
            <Link to="/profile" onClick={this.checkChanges}>
              <RaisedButton label="View My Profile" primary={true}/>
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
  const { auth, talentReducer,  talentInfo, allPositionTypes, allSkills} = state;
  return {
    auth,
    talentReducer,
    talentInfo: talentInfo.value,
    allPositionTypes: allPositionTypes.value,
    allSkills: allSkills.value
  }
}
function mapDispatchToProps(dispatch) {
  return {
    talentActions: bindActionCreators(talentActions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditProfile));
