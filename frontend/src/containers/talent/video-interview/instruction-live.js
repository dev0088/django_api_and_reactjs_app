import React from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as talentActions from '../../../actions/talentActions';

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
const styles={
  raisedButton: {
    whiteSpace: "normal",
    width: "240px",
  }
}
class InterviewInstructionLive extends React.Component {
  constructor() {
    super();
    this.state = {
      talent_position_sub_type: null
    }
  }

  componentDidMount() {
    let __this = this;
    setTimeout(function() {
      __this.props.talentActions.getCurrentTalentInfo();
    }, 400);
  }
  render() {
    const { pageId } = this.props.match.params;
    const { talentInfo } = this.props;
    let positionName = "";
    if (talentInfo.value){
      const { talent_position_sub_type } = talentInfo.value;
      if (talent_position_sub_type)
        positionName = talent_position_sub_type.talent_position_type.toLowerCase();
    }
    return (<div className="video-interview">
        <div className="video-interview-header">
          <h1>My Video Interview ({title[pageId] && title[pageId]})</h1>
          <h3>Live!</h3>
        </div>
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
          <br/><br/>
          {
            <Link to={"/live-interview/" + positionName}>
              <RaisedButton
                label="Begin My Video Interview"
                className="btnn-video-buttons btn-vpb"
                style={styles.raisedButton}
                secondary={true}
              />
            </Link>
          }
        </div>
      </div>)

  }
}

function mapStateToProps(state) {
  const { auth, talentInfo } = state;
  return {
    auth: auth,
    talentInfo: talentInfo
  }
}
function mapDispatchToProps(dispatch) {
  return {
    talentActions: bindActionCreators(talentActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InterviewInstructionLive);