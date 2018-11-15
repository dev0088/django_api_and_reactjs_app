import React, {Component} from 'react';
import { Row, Col, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Spacer from 'components/general/spacer';
import Panel from 'components/general/panel'
import './myMedical.css'
import 'containers/talent/profile/build-profile/contact-info/myContactInfo.css';
import { styles } from 'styles';


class TalentMedicalForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      medicals: [],
      isChanged: false
    }
  }

  getInfoFromProps(props) {
    const { talentInfo } = props

    let medicals = []

    if (talentInfo && talentInfo.talent_medicals) {
      // Get contact info
      medicals = talentInfo.talent_medicals
    }

    return {
      medicals,
    }
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.getInfoFromProps(nextProps),
      isChanged: false
    })
  }

  handleFluencyChange = (event) => {
    const { checkedMedicals } = this.state;
    let key = this.getKeyOfCheckedMedicalByName(event.target.name)
    checkedMedicals[key].condition_value = event.target.value

    this.setState({
      checkedMedicals,
      isChanged: true
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(false)
      }
    })
  };

  handleChange = name => event => {
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
      medicals,
      isChanged: true
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(false)
      }
    })
  };

  handleCancel = () => {
    this.setState({
      ...this.getInfoFromProps(this.props),
      isChanged: false
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(false)
      }
    })
  };

  handleSave = () => {
    const {
      medicals,
    } = this.state

    let data = {
      talent_medicals: medicals
    }

    this.props.onSave(data, this.handleSaveResponse)
  };

  handleSaveResponse = (response, isFailed) => {
    this.setState({
      isChanged: false
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(false)
      }
    })
  };

  isCheckedMedical = name => {
    const { medicals } = this.state
    let key = this.getKeyOfCheckedMedicalByName(name)
    return key ? medicals[key].condition_value : false
  };

  getKeyOfCheckedMedicalByName = (name) => {
    const { medicals } = this.state
    let res = null

    for (let i = 0; i < medicals.length; i ++) {
      if (medicals[i].condition_title === name) {
        res = i
      }
    }

    return res
  };

  getCheckedMedicalByName = (name) => {
    const { medicals } = this.state
    let res = null

    for (let i = 0; i < medicals.length; i ++) {
      if (medicals[i].condition_title === name) {
        res = medicals[i]
      }
    }

    return res
  }

  getMedicalByName = (name, medicalList) => {
    const { medicals } = this.state
    let res = null
    let searchMedical = medicalList ? medicalList : medicals
    for (let i = 0; i < searchMedical.length; i ++) {
      if (searchMedical[i].condition_title === name) {
        res = searchMedical[i]
      }
    }

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

  renderContents() {
    const { classes, contentTitle } = this.props

    return (
      <Panel title={contentTitle}>
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
      <div>
        {this.state.notification && <Alert color="info">{this.state.notification}</Alert>}
        {this.renderContents()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TalentMedicalForm));
