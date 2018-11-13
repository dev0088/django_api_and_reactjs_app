import React, {Component} from 'react';
import { Row, Col, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ImageLoader from 'react-loading-image';
import ImageLightbox from 'react-image-lightbox';
import Spacer from 'components/general/spacer';
import apiConfig from 'constants/api';
import defaultValues from 'constants/defaultValues';
import {
  makeTitleWithAllPositionTypes,
  existSkill,
  makeHeight,
  makeWeight,
  makeLanguages,
  getPracticVideoNumbers,
  getLiveVideoNumbers,
  checkPreviousShipMedical,
  checkCPR
} from 'utils/appUtils';
import styles from 'styles';
import 'react-image-lightbox/style.css';
// import './viewProfile.css'

class TalentView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      skills: [],
      notification: false,
      openImageModal: false,
      currentImageUrl: null,
      HEIGHTS: defaultValues.HEIGHTS,
      WEIGHTS: defaultValues.WEIGHTS
    }
  }

  getInfoFromProps(props) {
    const {
      talent_position_types,
      talent_position_sub_types,
      talent_skills
    } = props.talentInfo

    return {
      skills: talent_skills,
      title: makeTitleWithAllPositionTypes(props.talentInfo)
    }
  }


  componentWillMount() {
    const { talentInfo } = this.props.location.state
    if (talentInfo) {
      this.setState({
        ...this.getInfoFromProps(this.props.location.state)
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    const { talentInfo } = nextProps.location.state
    if (talentInfo) {
      this.setState({
        ...this.getInfoFromProps(nextProps.location.state)
      })
    }
  }

  showImage = (url) => {
    this.setState({
      openImageModal: true,
      currentImageUrl: url
    })
  };

  renderHeader() {
    const { classes } = this.props
    const {
      user,
      head_line,
      average_rating
    } = this.props.location.state.talentInfo
    const { title } = this.state
    
    return (
      <Grid container spacing={10} justify="center" alignItems="center"
            className={classes.clientTalentViewHeaderTitleText}>
        <Grid item xs={12}>
          <h3>
            {`${user.first_name} ${user.last_name} - ${average_rating}`}
          </h3>
          <p>{title}</p>
        </Grid>
        <Grid item xs={12}>
          <h4>{head_line}</h4>
        </Grid>
      </Grid>
    )
  }


  renderGeneralInfoName(name) {
    return (
      <Grid item xs={6}>
        <Typography className="profile-general-info-name">{name}</Typography>
      </Grid>
    )
  }

  renderGeneralInfoValue(value) {
    return (
      <Grid item xs={6}>
        <Typography className="profile-general-info-value">{value}</Typography>
      </Grid>
    )
  }

  renderGeneralInfo() {
    const {
      nationality,
      citizenship,
      have_green_card,
      height,
      weight,
      bmi,
      age_range,
      talent_visas,
      talent_languages,
      talent_medicals,
      worked_cruise_ship,
    } = this.props.location.state.talentInfo

    return (
      <div>
        <Grid container spacing={0}>
          {this.renderGeneralInfoName("Height: ")}
          {this.renderGeneralInfoValue(makeHeight(height))}
          {this.renderGeneralInfoName("Weight: ")}
          {this.renderGeneralInfoValue(makeWeight(weight))}
          {this.renderGeneralInfoName("BMI: ")}
          {this.renderGeneralInfoValue(bmi)}
          {this.renderGeneralInfoName("Age Range: ")}
          {this.renderGeneralInfoValue(age_range)}
          {this.renderGeneralInfoName("Languages: ")}
          {this.renderGeneralInfoValue(makeLanguages(talent_languages))}
          {this.renderGeneralInfoName("Nationality: ")}
          {this.renderGeneralInfoValue(nationality)}
          {this.renderGeneralInfoName("Citizenship: ")}
          {this.renderGeneralInfoValue(citizenship)}
        </Grid>

        { talent_visas.length > 0 ? (
          talent_visas.map((visa, index) => {
            return (
              <Grid container spacing={0} key={index}>
                {this.renderGeneralInfoName(`${visa.name} Visa: `)}
                {this.renderGeneralInfoValue('YES')}
              </Grid>
            )
          })
        ) : (
          <Grid container spacing={0}>
            {this.renderGeneralInfoName(`Visa: `)}
            {this.renderGeneralInfoValue('No')}
          </Grid>
        )}
        <Grid container spacing={0}>
          {this.renderGeneralInfoName(`Green Card: `)}
          {this.renderGeneralInfoValue(have_green_card ? "YES" : "NO")}
          {this.renderGeneralInfoName(`Previous Ship Experience: `)}
          {this.renderGeneralInfoValue(checkPreviousShipMedical(talent_medicals) ? "YES" : "NO")}
          {this.renderGeneralInfoName(`CPR: `)}
          {this.renderGeneralInfoValue(checkCPR(talent_medicals) ? "YES" : "NO")}
        </Grid>
      </div>
    )
  }

  renderPictureView(caption) {
    const { talentInfo } = this.props.location.state
    const { talent_pictures } = talentInfo

    let picture = talent_pictures.find(function(picture) {
      return (picture.caption === caption);
    });

    return (picture && picture.url && picture.uploaded && picture.active) ? (
      <div onClick={() => this.showImage(picture.url)} 	className="profile-picture-container-div">
        <ImageLoader
          src={picture.url}
          className="profile-picture-size"
          loading={() => <div className="profile-picture-size">Loading...</div>}
          error={() => <div>Error</div>} />
      </div>
    ) : (
      <div className="profile-picture-container-div">
        <ImageLoader
          src={require('images/missing.png')}
          className="profile-picture-size"
          loading={() => <div className="profile-picture-size">Loading...</div>}
          error={() => <div>Error</div>} />
      </div>
    )
  }

  renderPicturesView() {
    return (
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Typography className="profile-picture-name">{"Pictures"}</Typography>
        </Grid>
        <Grid item xs={12}>
          <div className="profile-picture-view-container">
            <Grid container spacing={0} style={{textAlign: 'center'}}>
              <Grid item xs={12}>
                { this.renderPictureView("My Current Headshot") }
                { this.renderPictureView("My Current Body Shot 1") }
                { this.renderPictureView("My Current Body Shot 2") }
              </Grid>
              <Grid item xs={12}>
                { this.renderPictureView("My Other Pic 1") }
                { this.renderPictureView("My Other Pic 2") }
                { this.renderPictureView("My Other Pic 3") }
              </Grid>
              <Grid item xs={12}>
                { this.renderPictureView("My Other Pic 4") }
                { this.renderPictureView("My Other Pic 5") }
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    )
  }

  renderResume() {
    const { talent_resume } = this.props.location.state.talentInfo

    return (
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Typography className="profile-picture-name">{"Resume / CV"}</Typography>
        </Grid>
        <Grid item xs={12}>
          {(talent_resume[0] && talent_resume[0].preview_path) ?
            (<div onClick={() => this.showImage(talent_resume[0].preview_path)}
                  className="profile-picture-container-div">
                <ImageLoader
                  className="profile-resume-image-viewer"
                  src={`${apiConfig.server}/${talent_resume[0].preview_path}`}
                  loading={() => <div className="profile-resume-image-viewer">Loading...</div>}
                  error={() => <div>Error</div>} />
              </div>
            ) : (
              <div>None</div>
            )}
        </Grid>
      </Grid>
    )
  }

  renderBioGraphy() {
    const { bio } = this.props.location.state.talentInfo

    return (
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Typography className="profile-picture-name">{"Biography"}</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="multiline-static"
            multiline
            rows="8"
            value={bio}
            fullWidth
            className="profile-bio-textfield"
          />
        </Grid>
      </Grid>
    )
  }

  renderMoreInfoButtons() {
    return (
      <Grid container spacing={8} direction="column" justify="center" alignItems="center">
        <Grid item xs={12}>
          <Button variant="contained"  color="primary" className={"profile-other-info-button"} >
            <Typography>{"Request More Info"}</Typography>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained"  color="primary" className={"profile-other-info-button"} >
            <Typography>{"Shared Profile"}</Typography>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained"  color="primary" className={"profile-other-info-button"} >
            <Typography>{"Block Profile"}</Typography>
            <Typography>{"Temporarily or permanently"}</Typography>
          </Button>
        </Grid>
      </Grid>
    )
  }

  renderVideoButtonsGroup() {
    const { talent_videos } = this.props.location.state.talentInfo

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
                    {"Dance Audition Videos"}
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
                    {getPracticVideoNumbers(talent_videos)}
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
                    {getLiveVideoNumbers(talent_videos)}
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
              <Link to='/medical-info'>
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
                    {"Availability"}
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
    if (this.props.location.state.talentInfo === null) {
      return <div/>
    }

    const { currentImageUrl, openImageModal } = this.state

    return(
      <div className="profile-container">
        {this.state.notification && <Alert color="info">{this.state.notification}</Alert>}
        <Grid container spacing={8}>
          <Grid item xs={12}>
            {this.renderHeader()}
          </Grid>
          <Grid item xs={12}>
            <Spacer size={10} />
          </Grid>
          <Grid item md={3} xs={12}>
            {this.renderGeneralInfo()}
          </Grid>
          <Grid item md={9} xs={12} className="profile-bio">
            <Grid container spacing={8}>
              <Grid item md={3} xs={12}>
                {this.renderPicturesView()}
              </Grid>
              <Grid item md={9} xs={12}>
                <Grid container spacing={8}>
                  <Grid item md={4} xs={12}>
                    {this.renderResume()}
                  </Grid>
                  <Grid item md={8} xs={12}>
                    {this.renderBioGraphy()}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={12} xs={12}>
            <Spacer size={50} />
          </Grid>
          <Grid item md={3} xs={12}>
            {this.renderMoreInfoButtons()}
          </Grid>
          <Grid item md={6} xs={12}>
            {this.renderVideoButtonsGroup()}
          </Grid>
          <Grid item md={3} xs={12}>
            {this.renderOtherButtonsGroup()}
          </Grid>
        </Grid>

        <Row >
          <Col xs="12" md="8" className="pt-4 pt-md-4"> </Col>
          <Col xs="12" md="4" className="pt-3 pt-md-3 profile-save-button-group-col">
            <Link to="/edit-profile">
              <RaisedButton label="Back to Build/Edit My Profile" primary={true}/>
            </Link>
          </Col>
        </Row>
        {openImageModal && (
          <ImageLightbox
            mainSrc={currentImageUrl}
            onCloseRequest={() => this.setState({ openImageModal: false, currentImageUrl: null })}
          />
        )}
      </div>
    );
  }

  renderPreview() {
    if (this.props.location.state.talentInfo === null) {
      return <div/>
    }

    const { currentImageUrl, openImageModal } = this.state

    return(
      <div className="profile-container">
        {this.state.notification && <Alert color="info">{this.state.notification}</Alert>}
        <Row className="details-content">
          <Col md="12">
            {this.renderHeader()}
          </Col>
          <Col md="12">
            <Spacer size={35} />
          </Col>
          <Col md="12">
            <Row>
              <Col md="3" className="profile-bio">
                {this.renderGeneralInfo()}
              </Col>
              <Col md="9" className="profile-bio">
                <Row>
                  <Col md="3" className="profile-bio">
                    {this.renderPicturesView()}
                  </Col>
                  <Col md="9">
                    <Row>
                      <Col md="4" className="profile-bio">
                        {this.renderResume()}
                      </Col>
                      <Col md="8" className="profile-bio">
                        {this.renderBioGraphy()}
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <Spacer size={50} />
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
        {openImageModal && (
          <ImageLightbox
            mainSrc={currentImageUrl}
            onCloseRequest={() => this.setState({ openImageModal: false, currentImageUrl: null })}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TalentView));
