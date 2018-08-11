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
import VideoListView from '../components/videoListView';
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

class MyPracticeInterviewVideos extends Component {

  constructor(props) {
    super(props);
    this.state = {
      interviewVideoUrls: []
    }
  }

  getFromPops = (props) => {
    const { talentInfo } = this.props
    let interviewVideoUrls = []
    if (talentInfo && talentInfo.talent_videos) {
      Object.keys(talentInfo.talent_videos).map((key) => {
        let video = talentInfo.talent_videos[key]
        if (video.active && video.uploaded) {
          if (video.position_type === 'Practice'
             || 
            video.position_type === null ||
            video.position_type === ""
            ) {
            interviewVideoUrls.push(video)
          }        
        }
      })
    }

    return {
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
    const { interviewVideoUrls } = this.state

    let videoItems = []

    return (
      <Panel title={`My Practice Interview Videos`} >
        <VideoListView videoUrls={interviewVideoUrls} />  
      </Panel>
    )
  }

  render() {
    const { contactInfo, emergencyInfo } = this.state;
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <div className="general-view-container">

          {this.state.notification && <Alert color="info">{this.state.notification}</Alert>}

          {this.renderVideosView()}

          <Row >
            <Col xs="12" md="8" className="pt-4 pt-md-4"> </Col>
            <Col xs="12" md="4" className="pt-3 pt-md-3 profile-save-button-group-col">
              <Link to="/videos-info">
                <RaisedButton label="Back to My Videos" primary={true}/>
              </Link>
            </Col>
          </Row>
        </div>
      </MuiThemeProvider>
    )
  }
}

function mapStateToProps(state) {
  const { talentInfo } = state;
  return {
    talentInfo: talentInfo.value
  }
}

function mapDispatchToProps(dispatch) {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MyPracticeInterviewVideos));
