import React, {Component} from 'react';
import { Row, Col, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Panel from '../components/panel';
import Spacer from '../components/spacer';
import Truncate from 'react-truncate-html';
import Gallery from 'react-grid-gallery';
import apiConfig from '../constants/api';
import defaultValues from '../constants/defaultValues';
import './myProfile.css'

const styles = {
  flatPrimary: {
    color: "#258df2",
  },
};
class MyProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      skills: [],
      notification: false
    }
  }

  getInfoFromProps(props) {
    const {
      user,
      talent_position_sub_type,
      talent_additional_position_sub_types,
      sex,
      phone_number,
      birthday,
      emergency_first_name,
      emergency_last_name,
      emergency_email,
      emergency_phone,
      emergency_relationship,
      nationality,
      citizenship,
      passport_expiration_date,
      passport_number,
      country_of_current_residence,
      have_green_card,
      green_card_expiration_date,
      visa_type,
      expiration_date,
      height,
      weight,
      bmi,
      age_range,
      head_line,
      bio,
      talent_languages,
      talent_pictures,
      talent_videos,
      talent_resume,
      worked_cruise_ship,
      created
    } = props.talentInfo

    let skills = []
    let title = talent_position_sub_type.talent_position_type
    skills.push(title)

    Object.keys(talent_additional_position_sub_types).map((key) => {
      let skill = talent_additional_position_sub_types[key]
      let position_type_name = skill.talent_position_sub_type.talent_position_type
      // Check duplication
      if (!this.existSkill(skills, position_type_name)) {
        skills.push(position_type_name)
      }
    })
    
    // Make title with all position types
    title = title + ((skills.length > 1) ? " Who " : '')
    for (let i = 1; i < skills.length; i++) {
      title = title + ((i == (skills.length - 1)) ? ', ' : '')
    }

    return {
      skills,
      title
    }
  }

  existSkill(skills, name) {
    var skill = skills.find(function(element) {
      return element === name;
    });
    return skill ? true : false
  }

  componentWillMount() {
    const { talentInfo } = this.props
    if (talentInfo) {
      this.setState({
        ...this.getInfoFromProps(this.props)  
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    const { talentInfo } = nextProps
    if (talentInfo) {
      this.setState({
        ...this.getInfoFromProps(nextProps)
      })
    }
  }

  makeLanguages = (talent_languages) => {
    let res = ''
    Object.keys(talent_languages).map((key) => {
      let talent_language = talent_languages[key]
      res = res + talent_language.language + ' '
    })
    return res
  }

  makeImages = (talent_pictures) => {
    let images = []
    Object.keys(talent_pictures).map((key, index) => {
      let talent_picture = talent_pictures[key]
      if (parseInt(key) < 5) {
        images.push({
          src: talent_picture.url,
          thumbnail: talent_picture.url,
          thumbnailWidth: 240,
          thumbnailHeight: 320,
        })
      }
    })
    return images
  }

  makeResumes = (talent_resume) => {
    let resumes = [{
      src: `${apiConfig.server}/${talent_resume[0].preview_path}`,
      thumbnail: `${apiConfig.server}/${talent_resume[0].preview_path}`,
      thumbnailWidth: 300,
      thumbnailHeight: 150,
    }]
    
    return resumes
  }

  getPracticVideoNumbers = (talent_videos) => {
    let res = 0
    Object.keys(talent_videos).map((key, index) => {
      let talent_video = talent_videos[key]
      if (talent_video.position_type === defaultValues.DEFAULT_PRACTICE_POSITION_TYPE || 
        talent_video.position_type === null) {
        res ++
      }
    })
    return res
  }

  getLiveVideoNumbers = (talent_videos) => {
    let res = 0
    Object.keys(talent_videos).map((key, index) => {
      let talent_video = talent_videos[key]
      if (talent_video.position_type !== defaultValues.DEFAULT_PRACTICE_POSITION_TYPE && 
        talent_video.position_type !== null) {
        res ++
      }
    })
    return res
  }

  renderVideoButtonsGroup() {
    const { classes } = this.props
    const { talent_videos } = this.props.talentInfo

    return (
      <div>
        <Row className="profile-gender-row">
          <Col className="profile-other-info-button-group">
            <div className="profile-other-info-button-container">
              <Link to='/#'>
                <Button variant="contained"  color="primary" className={"profile-other-info-button"} >
                  <div className="profile-other-info-button-title">
                    {"Video Greetings"}
                  </div>
                  <div className="profile-other-info-button-status">
                    {0}
                  </div>
                </Button>
              </Link>
            </div>
          </Col>
        </Row>

        <Row className="profile-gender-row">
          <Col md="6" className="profile-other-info-button-group">
            <div className="profile-other-info-button-container">
              <Link to='/#'>
                <Button variant="contained"  color="primary" className={"profile-other-info-button"} >
                  <div className="profile-other-info-button-title">
                    {"Vocal Audition Videos"}
                  </div>
                  <div className="profile-other-info-button-status">
                    {0}
                  </div>
                </Button>
              </Link>
            </div>
          </Col>
          <Col md="6" className="profile-other-info-button-group">
            <div className="profile-other-info-button-container">
              <Link to='/#'>
                <Button variant="contained"  color="primary" className={"profile-other-info-button"} >
                  <div className="profile-other-info-button-title">
                    {"Dancing Audition Videos"}
                  </div>
                  <div className="profile-other-info-button-status">
                    {0}
                  </div>
                </Button>
              </Link>
             </div>
          </Col>
        </Row>
        
        <Row className="profile-gender-row">
          <Col className="profile-other-info-button-group">
            <div className="profile-other-info-button-container">
              <Link to='#'>
                <Button variant="contained"  color="primary" className={"profile-other-info-button"} >
                  <div className="profile-other-info-button-title">
                    {"Acting Audition Videos"}
                  </div>
                  <div className="profile-other-info-button-status">
                    {0}
                  </div>
                </Button>
              </Link>
            </div>
          </Col>
          <Col md="6" className="profile-other-info-button-group">
            <div className="profile-other-info-button-container">
              <Link to='#'>
                <Button variant="contained"  color="primary" className={"profile-other-info-button"} >
                  <div className="profile-other-info-button-title">
                    {"Aerialist Audition Videos"}
                  </div>
                  <div className="profile-other-info-button-status">
                    {0}
                  </div>
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
        
        <Row className="profile-gender-row">
          <Col className="profile-other-info-button-group">
            <div className="profile-other-info-button-container">
              <Link to='#'>
                <Button variant="contained"  color="primary" className={"profile-other-info-button"} >
                  <div className="profile-other-info-button-title">
                    {"Musician Audition Videos"}
                  </div>
                  <div className="profile-other-info-button-status">
                    {0}
                  </div>
                </Button>
              </Link>
            </div>
          </Col>
          <Col md="6" className="profile-other-info-button-group">
            <div className="profile-other-info-button-container">
              <Link to='#'>
                <Button variant="contained"  color="primary" className={"profile-other-info-button"} >
                  <div className="profile-other-info-button-title">
                    {"Technician Audition Videos"}
                  </div>
                  <div className="profile-other-info-button-status">
                    {0}
                  </div>
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
        
        <Row className="profile-gender-row">
          <Col className="profile-other-info-button-group">
            <div className="profile-other-info-button-container">
              <Link to='#'>
                <Button variant="contained"  color="primary" className={"profile-other-info-button"} >
                  <div className="profile-other-info-button-title">
                    {"Cruise Staff Audition Videos"}
                  </div>
                  <div className="profile-other-info-button-status">
                    {0}
                  </div>
                </Button>
              </Link>
            </div>
          </Col>
          <Col md="6" className="profile-other-info-button-group">
            <div className="profile-other-info-button-container">
              <Link to='#'>
                <Button variant="contained"  color="primary" className={"profile-other-info-button"} >
                  <div className="profile-other-info-button-title">
                    {"Youth Staff Audition Videos"}
                  </div>
                  <div className="profile-other-info-button-status">
                    {0}
                  </div>
                </Button>
              </Link>
            </div>
          </Col>
        </Row>

        <Row className="profile-gender-row">
          <Col className="profile-other-info-button-group">
            <div className="profile-other-info-button-container">
              <Link to='/practice-interview-videos'>
                <Button variant="contained"  color="primary" className={"profile-other-info-button"} >
                  <div className="profile-other-info-button-title">
                    {"Practice Interview Videos"}
                  </div>
                  <div className="profile-other-info-button-status">
                    {this.getPracticVideoNumbers(talent_videos)}
                  </div>
                </Button>
              </Link>
            </div>
          </Col>
          <Col md="6" className="profile-other-info-button-group">
            <div className="profile-other-info-button-container">
              <Link to='/live-interview-videos'>
                <Button variant="contained"  color="primary" className={"profile-other-info-button"} >
                  <div className="profile-other-info-button-title">
                    {"Live Interview Videos"}
                  </div>
                  <div className="profile-other-info-button-status">
                    {this.getLiveVideoNumbers(talent_videos)}
                  </div>
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    )
  }

  renderOtherButtonsGroup() {
    return (
      <div>
        <Row className="profile-gender-row">
          <Col md="12" className="profile-other-info-button-group">
            <div className="profile-other-info-button-container">
              <Link to='/#'>
                <Button variant="contained"  color="primary" className={"profile-other-info-button"} >
                  <div className="profile-other-info-button-title">
                    {"Immigration"}
                  </div>
                  <div className="profile-other-info-button-status">
                    {'completed'}
                  </div>
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
        <Row className="profile-gender-row">
          <Col md="12" className="profile-other-info-button-group">
            <div className="profile-other-info-button-container">
              <Link to='/#'>
                <Button variant="contained"  color="primary" className={"profile-other-info-button"} >
                  <div className="profile-other-info-button-title">
                    {"Medical"}
                  </div>
                  <div className="profile-other-info-button-status">
                    {'completed'}
                  </div>
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
        <Row className="profile-gender-row">
          <Col md="12" className="profile-other-info-button-group">
            <div className="profile-other-info-button-container">
              <Link to='/#'>
                <Button variant="contained"  color="primary" className={"profile-other-info-button"} >
                  <div className="profile-other-info-button-title">
                    {"Vailability"}
                  </div>
                  <div className="profile-other-info-button-status">
                    {'completed'}
                  </div>
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    )
  }

  render() {
    if (this.props.talentInfo === null) {
      return <div/>
    }

    const {
      user,
      talent_position_sub_type,
      talent_additional_position_sub_types,
      sex,
      phone_number,
      birthday,
      emergency_first_name,
      emergency_last_name,
      emergency_email,
      emergency_phone,
      emergency_relationship,
      nationality,
      citizenship,
      passport_expiration_date,
      passport_number,
      country_of_current_residence,
      have_green_card,
      green_card_expiration_date,
      visa_type,
      expiration_date,
      height,
      weight,
      bmi,
      age_range,
      head_line,
      bio,
      talent_languages,
      talent_pictures,
      talent_videos,
      talent_resume,
      worked_cruise_ship,
      created
    } = this.props.talentInfo
    const { skills, title } = this.state

    return(
      <div className="profile-container">
        {this.state.notification && <Alert color="info">{this.state.notification}</Alert>}
        <Row className="details-content">
          <Col md="12">
            <Row>
              <Col md="12" className="profile-name">
                <h3>
                  {user.first_name + " " + user.last_name}
                </h3>
                <p>{title}</p>
              </Col>
              <Col md="12" className="profile-bio">
                <h4>{head_line}</h4>
              </Col>
            </Row>
          </Col>
          <Col md="12">
            <Spacer size={35} />
          </Col>
          <Col md="12">
            <Row>
              <Col md="3" className="profile-bio">
                <Row>
                  <Col md="6" className="pt-1 pt-md-1">
                    <Typography className="profile-general-info-name">{"Height:"}</Typography>
                  </Col>
                  <Col md="6" className="pt-1 pt-md-1">
                    <Typography className="profile-general-info-value">{height}</Typography>
                  </Col>
                </Row>
                <Row>
                  <Col md="6" className="pt-1 pt-md-1">
                    <Typography className="profile-general-info-name">{"Weight:"}</Typography>
                  </Col>
                  <Col md="6" className="pt-1 pt-md-1">
                    <Typography className="profile-general-info-value">{weight}</Typography>
                  </Col>
                </Row>
                <Row>
                  <Col md="6" className="pt-1 pt-md-1">
                    <Typography className="profile-general-info-name">{"BMI:"}</Typography>
                  </Col>
                  <Col md="6" className="pt-1 pt-md-1">
                    <Typography className="profile-general-info-value">{bmi}</Typography>
                  </Col>
                </Row>
                <Row>
                  <Col md="6" className="pt-1 pt-md-1">
                    <Typography className="profile-general-info-name">{"Age Range:"}</Typography>
                  </Col>
                  <Col md="6" className="pt-1 pt-md-1">
                    <Typography className="profile-general-info-value">{age_range}</Typography>
                  </Col>
                </Row>
                <Row>
                  <Col md="6" className="pt-1 pt-md-1">
                    <Typography className="profile-general-info-name">{"Languages:"}</Typography>
                  </Col>
                  <Col md="6" className="pt-1 pt-md-1">
                    <Typography className="profile-general-info-value">{this.makeLanguages(talent_languages)}</Typography>
                  </Col>
                </Row>
                <Row>
                  <Col md="6" className="pt-1 pt-md-1">
                    <Typography className="profile-general-info-name">{"Nationality:"}</Typography>
                  </Col>
                  <Col md="6" className="pt-1 pt-md-1">
                    <Typography className="profile-general-info-value">{nationality}</Typography>
                  </Col>
                </Row>
                <Row>
                  <Col md="6" className="pt-1 pt-md-1">
                    <Typography className="profile-general-info-name">{"Citizenship:"}</Typography>
                  </Col>
                  <Col md="6" className="pt-1 pt-md-1">
                    <Typography className="profile-general-info-value">{citizenship}</Typography>
                  </Col>
                </Row>
                <Row>
                  <Col md="6" className="pt-1 pt-md-1">
                    <Typography className="profile-general-info-name">{`${visa_type}:`}</Typography>
                  </Col>
                  <Col md="6" className="pt-1 pt-md-1">
                    <Typography className="profile-general-info-value">{'YES'}</Typography>
                  </Col>
                </Row>
                <Row>
                  <Col md="6" className="pt-1 pt-md-1">
                    <Typography className="profile-general-info-name">{"Green Card:"}</Typography>
                  </Col>
                  <Col md="6" className="pt-1 pt-md-1">
                    <Typography className="profile-general-info-value">{have_green_card ? "YES" : "NO"}</Typography>
                  </Col>
                </Row>
                <Row>
                  <Col md="6" className="pt-1 pt-md-1">
                    <Typography className="profile-general-info-name">{"Previous Ship Experiences:"}</Typography>
                  </Col>
                  <Col md="6" className="pt-1 pt-md-1">
                    <Typography className="profile-general-info-value">{"YES"}</Typography>
                  </Col>
                </Row>
                <Row>
                  <Col md="6" className="pt-1 pt-md-1">
                    <Typography className="profile-general-info-name">{"Previous Ship Medical:"}</Typography>
                  </Col>
                  <Col md="6" className="pt-1 pt-md-1">
                    <Typography className="profile-general-info-value">{"YES"}</Typography>
                  </Col>
                </Row>
                <Row>
                  <Col md="6" className="pt-1 pt-md-1">
                    <Typography className="profile-general-info-name">{"CPR:"}</Typography>
                  </Col>
                  <Col md="6" className="pt-1 pt-md-1">
                    <Typography className="profile-general-info-value">{"NO"}</Typography>
                  </Col>
                </Row>
              </Col>
              <Col md="2" className="profile-bio">
                <Row>
                  <Col md="12" className="pt-1 pt-md-1">
                    <Typography className="profile-picture-name">{"Pictures"}</Typography>
                  </Col>
                  <Col md="12" className="pt-1 pt-md-1">
                    <Gallery images={this.makeImages(talent_pictures)} />
                  </Col>
                </Row>
              </Col>
              <Col md="7">
                <Row>
                  <Col md="2" className="profile-bio">
                    <Row>
                      <Col md="12" className="pt-1 pt-md-1">
                        <Typography className="profile-picture-name">{"Resume / CV"}</Typography>
                      </Col>
                      <Col md="12" className="pt-1 pt-md-1">
                        <Gallery images={this.makeResumes(talent_resume)} />
                      </Col>
                    </Row>
                  </Col>
                  <Col md="10" className="profile-bio">
                    <Row>
                      <Col md="12" className="pt-1 pt-md-1">
                        <Typography className="profile-picture-name">{"Biography"}</Typography>
                      </Col>
                      <Col md="12" className="profile-general-info-value pt-1 pt-md-1">
                        <Truncate
                          lines={5}
                          dangerouslySetInnerHTML={{
                           __html: bio
                          }}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col md="8">
                    {this.renderVideoButtonsGroup()}
                  </Col>
                  <Col md="4">
                    {this.renderOtherButtonsGroup()}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>


        </Row>

        <Row >
          <Col xs="12" md="8" className="pt-4 pt-md-4"> </Col>
          <Col xs="12" md="4" className="pt-3 pt-md-3 profile-save-button-group-col">
            <Link to="/edit-profile">
              <RaisedButton label="Back to Build/Edit My Profile" primary={true}/>
            </Link>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { auth, talentInfo } = state;
  return {
    auth,
    talentInfo: talentInfo.value
  }
}

function mapDispatchToProps(dispatch) {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
