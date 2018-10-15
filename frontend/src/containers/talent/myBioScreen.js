import React, {Component} from 'react';
import { Row, Col, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import Panel from '../../components/panel';
import ConfirmChangesDialog from '../../components/confirmChangesDialog';

import * as talentActions from '../../actions/talentActions';
import TalentAPI from '../../apis/talentAPIs';
import 'react-dropdown/style.css';
import './myBio.css';
import { styles } from '../../styles';


class MyBio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headline: "",
      bio: "",
			isChanged: false,
			showConfirmChanges: false
    }
  }

  getInfoFromProps(props) {
    const {
      talentInfo
    } = props

    let bioInfo = {
      headline: "",
      bio: "",
    }

    if (talentInfo && talentInfo.user) {
      bioInfo = {
        headline: talentInfo.head_line,
        bio: talentInfo.bio,
      }
    }

    return {
      ...bioInfo
    }
  }

  componentWillMount() {
    if (this.props.auth.access && this.props.auth.access.user_id) {
      this.props.talentActions.getTalentInfo(this.props.auth.access.user_id)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.getInfoFromProps(nextProps),
			isChanged: false
    })
  }

  handleChange = (event) => {
    if ((event.target.name === 'headline') && (event.target.value.length > 100)) {
      return
    }
    this.setState({
      [event.target.name]: event.target.value,
			isChanged: true
    });
  }

  handleCancel = () => {
    this.setState({
      ...this.getInfoFromProps(this.props),
			isChanged: false
    })
  }

  handleSave = () => {
    const { auth } = this.props
    const {
      headline,
      bio,
    } = this.state

    let data = {
      head_line: headline,
      bio
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

  renderBioView() {
    const { classes } = this.props
    const {
      headline,
      bio,
    } = this.state

    return (
      <Panel title={"My Headline & Biography"}>
          <br/>
          <h5 align="center" className="profile-bio-description">
            Write a brief headline the best describes what you do.<br/>
            Your headline will be the first thing casting directors see, so be creative and accurate.</h5>
          <br/>
          <h5 align="center">Examples: <br/>
            "Vocalist with strong dance abilities and previous cruise experience"<br/>
            "Experienced ballet dancer with strong vocal skills"
          </h5>
          <br/>

          <TextField
            id="headline"
            name="headline"
            label="Type headline here…"
            className="bioTextEdit"
            value={headline}
            onChange={this.handleChange}
            margin="normal"
            fullWidth={true}
            multiline = {false}/>

          <h6 align="right" className="profile-bio-title">Characters: {this.state.headline.length} of max 100</h6>
          <br/>
          <h6 className="profile-bio-title">Type brief bio/work summary here…</h6>

          <div>
            <textarea id="bio" name="bio" className="bioTextEdit" rows="8"
              value={bio}
              onChange={this.handleChange} />
          </div>

          <h6 align="right" className="profile-bio-title">8 lines maximum</h6>
            <Row className="profile-gender-row">
                <Col xs="12" md="3" lg="6" xl="7" className="pt-4 pt-md-4"> </Col>
                <Col xs="12" md="9" lg="6" xl="5" className="pt-3 pt-md-3 profile-save-button-group-col">
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
    const { showConfirmChanges } = this.state;

    return (
      <div className="contact-info-view-container">
        {this.state.notification && <Alert color="info">{this.state.notification}</Alert>}

        {this.renderBioView()}

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


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MyBio));
