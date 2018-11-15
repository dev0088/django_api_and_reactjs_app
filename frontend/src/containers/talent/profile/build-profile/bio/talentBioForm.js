import React, {Component} from 'react';
import { Row, Col, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Panel from 'components/general/panel';
import 'react-dropdown/style.css';
import './myBio.css';
import { styles } from 'styles';


class MyBio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headline: "",
      bio: "",
      isChanged: false
    }
  }

  getInfoFromProps(props) {
    const { talentInfo } = props

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
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state.isChanged)
      }
    });
  }

  handleCancel = () => {
    this.setState({
      ...this.getInfoFromProps(this.props),
      isChanged: false
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state.isChanged)
      }
    })
  }

  handleSave = () => {
    const {
      headline,
      bio,
    } = this.state

    let data = {
      head_line: headline,
      bio
    }

    this.props.onSave(data, this.handleSaveResponse)
  }

  handleSaveResponse = (response, isFailed) => {
    console.log('==== response: ', response, isFailed)
    this.setState({
      isChanged: false
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state.isChanged)
      }
    })
  };

  renderContents() {
    const { classes, contentTitle } = this.props
    const {
      headline,
      bio,
    } = this.state

    return (
      <Panel title={contentTitle}>
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


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MyBio));
