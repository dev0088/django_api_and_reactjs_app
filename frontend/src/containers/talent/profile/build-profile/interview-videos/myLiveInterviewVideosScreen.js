import React, {Component} from 'react';
import { Row, Col, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import Panel from 'components/general/panel'
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as talentActions from 'actions/talentActions';
import VideoListView from 'components/shiptalent/tables/videoListView';
import '../contact-info/myContactInfo.css';


class MyLiveInterviewVideos extends Component {

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
      position_type = talentInfo.talent_position_sub_type.talent_position_type
      position_sub_type = talentInfo.talent_position_sub_type.name
			for (let i = 0; i < talentInfo.talent_videos.length; i ++) {
				let video = talentInfo.talent_videos[i]
        if (video.active && video.uploaded && (video.position_type === position_type)) {
          // In the case Live video interview
          interviewVideoUrls.push(video)
        }
			}
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
    const { position_type, interviewVideoUrls } = this.state

    return (
      <Panel title={`My ${position_type} Interview Videos`} >
        <VideoListView videoUrls={interviewVideoUrls} />
      </Panel>
    )
  }

  render() {

    return (
      <div className="general-view-container">
        {this.state.notification && <Alert color="info">{this.state.notification}</Alert>}

        {this.renderVideosView()}

        <Row >
          <Col xs="12" md="8" className="pt-4 pt-md-4"> </Col>
          <Col xs="12" md="4" className="pt-3 pt-md-3 profile-save-button-group-col">
            <Link to="/videos-info">
              <RaisedButton label="Back toMy Videos" primary={true}/>
            </Link>
          </Col>
        </Row>
      </div>
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
    talentActions: bindActionCreators(talentActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyLiveInterviewVideos);
