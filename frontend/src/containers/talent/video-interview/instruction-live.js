import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import * as videoActions from 'actions/videoActions';
import * as talentActions from 'actions/talentActions';
import styles from 'styles';

const title = {
  "cruise": "Cruise Staff",
  "audio": "Audio Technician",
  "light-technician": "Lighting Technician",
  "vocalist": "Vocalist",
  "dancer": "Dancer",
  "actor": "Actor",
  "aerialist": "Aerialist",
  "solo-musician": "Solo Musician",
  "music-group-leader": "Musical Group Leader",
  "video-technician": "Video Technician",
  "youth-staff": "Youth Staff"
}


class InterviewInstructionLive extends React.Component {
  constructor() {
    super();
    this.state = {
      subPositionType: null,
      positionType: null
    }
  }

  getInfoFromProps(props) {
    const { location, talentInfo } = this.props;
    let positionType = (location && location.state && location.state.positionType) ? location.state.positionType : null;
    let subPositionType = null;

    if (talentInfo) {
      const { talent_position_types, talent_position_sub_types } = talentInfo;
      
      if (!positionType && talent_position_types && talent_position_types.length > 0)
        positionType = talent_position_types[0];
      if (talent_position_sub_types && talent_position_sub_types.length > 0)
        subPositionType = talent_position_sub_types[0].position_sub_type;  
    }

    return { positionType, subPositionType };
  }

  componentWillMount() {
    this.setState({...this.getInfoFromProps(this.props)}, () => {
      const { positionType } = this.state;
      this.props.talentActions.getCurrentTalentInfo();
      this.props.videoActions.getVideoQuestionsActions(positionType.position_type, 'live');
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({...this.getInfoFromProps(this.props)});
  }

  onClick = () => {
    this.props.history.push('/live-interview', {positionType: this.state.positionType});
  };

  render() {
    const { videoQuestions, classes } = this.props;
    const { positionType, subPositionType } = this.state;
    let positionName = positionType ? positionType.position_type : '';

    return (
      <div className="video-interview">
        <div className="video-interview-header">
          <h1>{`My Video Interview (${positionName})`}</h1>
          <h3>Live!</h3>
        </div>
        <Grid container spacing={16} justify="center" alignItems="center">
          <Grid item lg={2} md={1} xs={12} />
          <Grid item lg={8} md={10} xs={12} >
            <div className="video-interview-body">
              <p>
                OK, here we go!
              </p>
              <p>
                The “live” Video Interview will now begin and is conducted just like the practice questions 
                with 30 seconds to read the question and prepare your response, 
                and up to two minutes to answer.  
              </p>
              <p>
                Follow the onscreen prompts until all Video Interview questions have been answered. 
              </p>
              <p>
                Remember, once you begin the actual interview, 
                you will be “live” and unable to stop or go back, 
                just like with an in-person interview. 
              </p>
              <p>
                Relax, be yourself and enjoy the process.  You’re gonna be great!
              </p>
              <br/>
            </div>
          </Grid>
          <Grid item lg={2} md={1} xs={12} />

          <Grid item lg={5} md={4} xs={12} />
          <Grid item lg={2} md={4} xs={12} className={classes.centerText}>
            <Button variant="contained" size="large" fullWidth 
              color="secondary" className={classes.generalButtonClass}
              disabled={!videoQuestions || videoQuestions.length <= 0}
              onClick={this.onClick}
            >
              <Typography className={classes.talentProfileGuideButtonTitle}>
                Begin My Video Interview
              </Typography>
            </Button>
          </Grid>
          <Grid item lg={5} md={4} xs={12} />

        </Grid>

      </div>
    );
  }
}

function mapStateToProps(state) {
  const { auth, talentInfo, videoQuestions, videoSettings, deviceSettings } = state;
  return {
    auth: auth,
    talentInfo: talentInfo.value,
    videoQuestions: videoQuestions.value,
    isLoading: !videoQuestions.isFetched,
    videoSettings: videoSettings,
    deviceSettings: deviceSettings,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    talentActions: bindActionCreators(talentActions, dispatch),
    videoActions: bindActionCreators(videoActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(InterviewInstructionLive));