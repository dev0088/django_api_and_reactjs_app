import React, {Component} from 'react';
import { Row, Col, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Spacer from '../components/spacer';
import Panel from '../components/panel'
import * as talentActions from  '../actions/talentActions';
import TalentAPI from '../apis/talentAPIs';
import defaultValues from '../constants/defaultValues';
import './myMedical.css'

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

class MyMedical extends Component {

  constructor(props) {
    super(props);
    this.state = {
      medicals: [],
    }
  }

  getInfoFromProps(props) {
    const {
      auth,
      talentInfo
    } = props

    let medicals = []
    let checkedMedicals = []

    if (talentInfo && talentInfo.talent_medicals) {
      // Get contact info
      medicals = talentInfo.talent_medicals
    }

    return {
      medicals,
    }
  }

  componentWillMount() {
    this.setState({
      ...this.getInfoFromProps(this.props)
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.getInfoFromProps(nextProps)
    })
  }

  handleFluencyChange = (event) => {
    const { checkedMedicals } = this.state;
    let key = this.getKeyOfCheckedMedicalByName(event.target.name)
    checkedMedicals[key].condition_value = event.target.value

    this.setState({
      checkedMedicals
    })
  }

  handleChange = name => event => {
    const { talentInfo } = this.props
    const { medicals } = this.state;
    let key = this.getKeyOfCheckedMedicalByName(name, medicals)
		console.log('=== key: ', key, medicals, name)
		if (key) {
			medicals[key].condition_value = event.target.checked
		} else {
			medicals.push({
				condition_title: name,
				condition_value: event.target.checked
			})
		}

    this.setState({
      medicals
    })
  }

  handleCancel = () => {
    this.setState({
      ...this.getInfoFromProps(this.props)
    })
  }

  handleSave = () => {
    const { auth, talentInfo } = this.props
    const {
      medicals,
    } = this.state

    let data = {
      talent_medicals: medicals
    }
    console.log('==== talent_medicals: ', data)
    TalentAPI.saveMedicals(auth.access.user_id, data, this.handleSaveResponse)
  }

  handleSaveResponse = (response, isFailed) => {
    const { auth } = this.props
    console.log('==== response: ', response, isFailed)
    this.props.talentActions.getTalentInfo(auth.access.user_id)
  }

  isCheckedMedical = name => {
    const { medicals } = this.state
    let key = this.getKeyOfCheckedMedicalByName(name)
    return key ? medicals[key].condition_value : false
  }

  getKeyOfCheckedMedicalByName = (name) => {
    const { medicals } = this.state
    let res = null
    Object.keys(medicals).map((key) => {
      if (medicals[key].condition_title === name) {
        res = key
      }
    })
    return res
  }

  getCheckedMedicalByName = (name) => {
    const { medicals } = this.state
    let res = null
    Object.keys(medicals).map((key) => {
      if (medicals[key].condition_title === name) {
        res = medicals[key]
      }
    })
    return res
  }

  getMedicalByName = (name, medicalList) => {
    const { medicals } = this.state
    let res = null
    let searchMedical = medicalList ? medicalList : medicals
    Object.keys(searchMedical).map((key) => {
      if (searchMedical[key].condition_title === name) {
        res = searchMedical[key]
      }
    })
    return res
  }

	renderMedicalItem(name) {
		return (
			<Row>
				<Col xs="12" className="pt-0 pt-md-0">
					<FormControlLabel
						control={
							<Checkbox
								checked={this.isCheckedMedical(name)}
								onChange={this.handleChange(name)}
								value={name}
								color="primary"
							/>
						}
						label={name}
					/>
				</Col>
			</Row>
		)
	}

  renderMedicalsView() {
    const { talentInfo, classes } = this.props
    const {
      medicals,
    } = this.state

    return (
      <Panel title={"My Medical"}>
        <Typography align='center'>
					All crew members aboard a cruise ship have dedicated safety responsibilities.
				</Typography>
				<Typography align='center'>
					Therefore, in the interest of guest safety, it is important to identify any pre-existing medical conditions to ensure
					that crew members can assist guests in an emergency without limitation.
				</Typography>
				<Typography align='center'>
					Below is a list of medical conditions that must be self-reported by every prospective crew member.
				</Typography>
				<Typography align='center'>
					It is important that you be honest and transparent with your self-reporting.  Should it be determined that you had a pre-existing medical condition and did not report it, you could be dismissed immediately.  No one wants that, right?
				</Typography>
				<Typography align='center'>
					Check all that apply…
        </Typography>

				<Spacer size={50} />

        <Row className="profile-gender-row">
          <Col xs="12" md="6" lg="6" xl="6" className="pt-0 pt-md-0" >
						{ this.renderMedicalItem('Pregnancy') }
						{ this.renderMedicalItem('Epilepsy') }
						{ this.renderMedicalItem('Insulin dependent diabetes') }
						{ this.renderMedicalItem('Anxiety, mental or mood disorders') }
						{ this.renderMedicalItem('Alcohol or drug addiction problems') }
						{ this.renderMedicalItem('Eating disorders') }
						{ this.renderMedicalItem('Body Mass Index greater than 30 or less than 18') }
						{ this.renderMedicalItem('Diseases of the heart or arteries') }
						{ this.renderMedicalItem('Hypertension') }
          </Col>

          <Col xs="12" md="6" lg="6" xl="6" className="pt-0 pt-md-0" >
						{ this.renderMedicalItem('Irregular heart rhythm') }
						{ this.renderMedicalItem('Use of a pacemaker') }
						{ this.renderMedicalItem('Diseases of the lungs') }
						{ this.renderMedicalItem('Unexplained loss of consciousness') }
						{ this.renderMedicalItem('Severe head injury or major brain surgery') }
						{ this.renderMedicalItem('Severe deafness') }
						{ this.renderMedicalItem('Joint replacements') }
						{ this.renderMedicalItem('Limb prostheses') }
						{ this.renderMedicalItem('Organ transplants') }
          </Col>
					<Col xs="12" md="12" lg="12" xl="12" className="pt-0 pt-md-0" >
						{ this.renderMedicalItem('Coronary bypass surgery or angioplasty') }
						{ this.renderMedicalItem('Other conditions which can lead to sudden incapacity') }
						{ this.renderMedicalItem('Conditions which limit mobility and stamina both under normal and emergency conditions') }
						{ this.renderMedicalItem('Medication with side effects which reduce performance or alertness') }
					</Col>
        </Row>

				<Divider />

				<Row className="profile-gender-row">
					<Col xs="12" md="12" lg="12" xl="12" className="pt-0 pt-md-0" >
						{ this.renderMedicalItem('I have no pre-existing medical conditions to report.') }
						{ this.renderMedicalItem('I am certified in CPR.') }
						{ this.renderMedicalItem('I have successfully completed a cruise line pre-employment physical in the past.') }
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
        <div className="profile-language-container">
          {this.state.notification && <Alert color="info">{this.state.notification}</Alert>}

          {this.renderMedicalsView()}

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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MyMedical));
