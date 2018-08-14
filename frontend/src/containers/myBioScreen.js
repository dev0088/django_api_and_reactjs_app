import React, {Component} from 'react';
import { Row, Col, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Panel from '../components/panel'
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as talentActions from  '../actions/talentActions';
import TalentAPI from '../apis/talentAPIs'
import 'react-dropdown/style.css'
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

class MyBio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headline: "",
      bio: "",
    }
  }

  getBioFromProps(props) {
    const {
      talentInfo
    } = props

    let bioInfo = {
      headline: "",
      bio: "",
    }

    if (talentInfo && talentInfo.user) {
      bioInfo = {
        headline: "",
        bio: "",
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
      ...this.getBioFromProps(nextProps)
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleCancel = () => {
    this.setState({
      ...this.getBioFromProps(this.props)
    })
  }

  handleSave = () => {
    const { auth } = this.props
    const {
      headline,
      bio,
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

  renderBioView() {
    const { classes } = this.props
    const {
      headline,
      bio,
    } = this.state

    return (
      <Panel title={"My Headline & Biography"}>
          <br/>
          <h5 align="center">Write a brief headline the best describes what you do.
                  Your headline will be the first thing casting directors see, so be creative and accurate.</h5>
          <br/>
          <h5 >Examples:</h5>
          <br/>
          <h5 >"Vocalist with strong dance abilities and previous cruise experience"</h5>
          <h5 >"Experienced ballet dancer with strong vocal skills"</h5>
          <br/>
          <h6>Type headline here…</h6>
          <TextField
            id="headline"
            name="headline"
            label="headline"
            className={classes.textField}
            value={headline}
            onChange={this.handleChange}
            margin="normal"
            fullWidth={true}
            multiLine = {true}
            rows = {3}
            maxLength = "100"/>
          <h6 align="right">Characters: {this.state.headline.length} of max 100</h6>
          <br/>
          <h6>Type brief bio/work summary here…</h6>
          <TextField
            id="bio"
            name="bio"
            disabled={false}
            label="bio"
            className={classes.textField}
            value={bio}
            onChange={this.handleChange}
            margin="normal"
            fullWidth={true}
            multiLine = {true}
            rows = "8"
            rowsMax = "8"/>
          <h6 align="right">8 lines maximum</h6>
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
    const { headline, bio } = this.state;
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
          <div className="contact-info-view-container">
          {this.state.notification && <Alert color="info">{this.state.notification}</Alert>}

          {this.renderBioView()}

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


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MyBio));