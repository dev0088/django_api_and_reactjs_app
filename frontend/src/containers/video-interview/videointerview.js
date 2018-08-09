import React from 'react';
import Webcam from 'react-webcam';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import './styles.css'
import AudioMeter from "../../components/audio-meter/index";

class VideoPreview extends React.Component {
  constructor(props) {
    super();
    this.state = {
    	has_sub_position_type: props.talentInfo.value.talent_position_sub_type ? true : false
    }
  }

	componentWillReceiveProps(nextProps) {
    const { 
      talentInfo
    } = nextProps;
    
    if (talentInfo.value.talent_position_sub_type && 
    	 talentInfo.value.talent_position_sub_type.talent_position_type) {
    	this.setState({
    		has_sub_position_type: true
    	})
    } else {
    	this.setState({
    		has_sub_position_type:false
    	})
    }
	}

  render () {
  	const { has_sub_position_type } = this.state
    return(
			<Row>
	      <Col md="12" sm="12">
					<div className="video-interview">
			      <div className="video-interview-header">
			        <h1>My Video Interview (Cruise Staff)</h1>
			        <h3>Video and Audio Preview</h3>
			      </div>

			      <div className="col-md-12 camera-box">
			        <Webcam height="300" width="700"/>
			      </div>

			      <div className="audio-box">
			        <AudioMeter/>
			      </div>

			      <div className="col-md-12">
			      	<Link to="/video-practice">
              	<RaisedButton
	                label="Start Practice Questions"
	                primary={true}
	              />
							</Link>
			      </div>
			      <div className="col-md-12">
              <RaisedButton
                className="btnn-adjust-settings"
                label="Adjust Video and <br/> Audio Settings"
                primary={true}
              />
			      </div>
			      <div className="col-md-12">
			      	{
			      		has_sub_position_type ? (
				      		<Link to="/edit-profile">
			              <RaisedButton
			                className=""
			                label="I’m Not Ready. Take Me Back to My Cruise Staff Audition Videos"
			                primary={true}
			              />
									</Link>
		      			) : (
		              <RaisedButton
		                className="btnn-not-ready"
		                label="I’m Not Ready. Take Me Back to My Cruise Staff Audition Videos"
		                primary={true}
		              />
		      			)
			      	}

			      </div>
			    </div>
				</Col>
			</Row>
		)
  }
}


function mapStateToProps(state) {
  const { talentInfo } = state;
  return {
    talentInfo,
  }
}


export default connect(mapStateToProps)(VideoPreview);
