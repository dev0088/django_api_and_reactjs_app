import React, {Component} from 'react';
import { Row, Col, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Panel from '../components/panel'
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as talentActions from  '../actions/talentActions';
import VideoListView from '../components/videoListView';
import TalentAPI from '../apis/talentAPIs';
import './myContactInfo.css';


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

class MyVideos extends Component {

  constructor(props) {
    super(props);
    this.state = {
      position_type: '',
      position_sub_type: '',
      interviewVideoUrls: []
    }
  }

  getFromPops = (props) => {
    const { talentInfo } = this.props
    let position_type = ''
    let position_sub_type = ''
    let interviewVideoUrls = []

    if (talentInfo && talentInfo.talent_videos) {
      position_type = 
      Object.keys(talentInfo.talent_videos).map((key) => {
        let video = talentInfo.talent_videos[key]
        if (video.active && video.uploaded) {
          if (position_type === 'Practice') {
            // In the case Practice video interview
            if (video.position_type === 'Practice' || video.position_type === null) {
              interviewVideoUrls.push(video)
            }
          } else if (video.position_type === video.position_type) {
            // In the case Live video interview
            interviewVideoUrls.push(video)
          }          
        }
      })
    }

    return {
      position_type,
      position_sub_type,
      interviewVideoUrls
    }
  }

  componentWillMount() {
    this.setState({
      ...this.getFromPops(this.props)
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.getFromPops(nextProps)
    })
  }

  renderVideosView() {
    const { position_type, position_sub_type, interviewVideoUrls } = this.props

    let videoItems = []

    Object.keys(interviewVideoUrls).map((key) => {
      let videoItem = (
        <Row className="profile-gender-row">
            <Col xs="12" md="2" className="pt-3 pt-md-3"> 
              {interviewVideoUrls.position_type}
            </Col>
            <Col xs="12" md="4" className="pt-3 pt-md-3"> 
              {interviewVideoUrls.question}
            </Col>
            <Col xs="12" md="6" className="pt-3 pt-md-3"> 
              <ReactPlayer
                url={video_url}
                className='react-player'
                width={'100%'}
                height='100%'
                controls={true}
              />
            </Col>
          <Col xs="12" md="6" className="pt-3 pt-md-3"> </Col>
        </Row>  
        )
      videoItems.push(videoItem)
    })

    return (
      <Panel title={`My ${position_type} Interview Videos`} >
        {videoItems}  
      </Panel>
    )
  }

  render() {
    const { contactInfo, emergencyInfo } = this.state;
    const { classes } = this.props;
    const selectItemStyle = {
      'whiteSpace': 'preWrap'
    }

    return (
      <MuiThemeProvider theme={theme}>
        <div className="contact-info-view-container">
          {this.state.notification && <Alert color="info">{this.state.notification}</Alert>}

          {this.renderVideosView()}

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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MyVideos));
