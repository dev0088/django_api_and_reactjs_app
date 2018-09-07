import React, {Component} from 'react';
import { Row, Col, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ImageLoader from 'react-loading-image';
import ImageLightbox from 'react-image-lightbox';
import UnitConverter from 'convert-units'
import Panel from '../components/panel';
import Spacer from '../components/spacer';
import Truncate from 'react-truncate-html';
import apiConfig from '../constants/api';
import defaultValues from '../constants/defaultValues';

import 'react-image-lightbox/style.css';
import './viewProfile.css'

const styles = {
  flatPrimary: {
    color: "#258df2",
  },
};
class ViewProfile extends Component {

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

	makeHeight = (height) => {
		const { HEIGHTS } = this.state
		let heightInFeet = 0
		let heightIntegerInFeet = 0
		let heightDecimalInInch = 0
		let prefix = ''
		let tmp_height = height

		// Find index
		let index = HEIGHTS.findIndex(function(h) {
			return h === height
		})
		if (index == (HEIGHTS.length - 1)) {
			tmp_height = HEIGHTS[HEIGHTS.length - 2]
			prefix = '>'
		}

		heightInFeet = UnitConverter(parseInt(tmp_height))
			.from('cm').to('ft-us')
		heightIntegerInFeet = Math.floor(heightInFeet)
		heightDecimalInInch = Math.round(UnitConverter(heightInFeet - heightIntegerInFeet).from('ft-us').to('in'))

		return `${prefix}${heightIntegerInFeet}'${heightDecimalInInch}" / ${prefix}${height}cm`
	}

	makeWeight = (weight) => {
		const { WEIGHTS } = this.state
		let weightInLb = 0
		let prefix = ''
		let tmp_weight = weight

		let index = WEIGHTS.findIndex(function(w) {
			return w === weight
		})

		if (index == (WEIGHTS.length - 1)) {
			tmp_weight = WEIGHTS[WEIGHTS.length - 2]
			prefix = '>'
		}
		weightInLb = Math.round(UnitConverter(tmp_weight).from('lb').to('kg') * 10) / 10
		return `${prefix}${tmp_weight} lbs. / ${prefix}${weightInLb} kg`
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
        images.push(talent_picture.url)
      }
    })
    return images
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

	showImage = (url) => {
    this.setState({
      openImageModal: true,
			currentImageUrl: url
    })
  }

	checkPreviousShipMedical = (medicals) => {
		let checkingMedicals = [
			'Pregnancy',
			'Epilepsy',
			'Insulin dependent diabetes',
			'Anxiety, mental or mood disorders',
			'Alcohol or drug addiction problems',
			'Eating disorders',
			'Body Mass Index greater than 30 or less than 18',
			'Diseases of the heart or arteries',
			'Hypertension',
			'Coronary bypass surgery or angioplasty', //
			'Other conditions which can lead to sudden incapacity',
			'Conditions which limit mobility and stamina both under normal and emergency conditions',
			'Medication with side effects which reduce performance or alertness',//
			'Irregular heart rhythm',
			'Use of a pacemaker',
			'Diseases of the lungs',
			'Unexplained loss of consciousness',
			'Severe head injury or major brain surgery',
			'Severe deafness',
			'Joint replacements',
			'Limb prostheses',
			'Organ transplants'
		]
		let res = false

		medicals.map((medical, index) => {
			checkingMedicals.map((chekingMedical, index) => {
				if ((medical.condition_title === chekingMedical) && medical.condition_value) {
					res = true
				}
			})
		})

		return res
	}

	checkCPR = (medicals) => {
		let cprMedical = medicals.find((medical) => {
			return medical.condition_title === 'I am certified in CPR.'
		})
		console.log('==== checkCPR: ', cprMedical, medicals)
		return cprMedical ? cprMedical.condition_value : false
	}

	renderPictureView(caption) {
    const { classes, talentInfo } = this.props
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
      <div>
        <img
         className="profile-picture-image"
         src={require('../images/missing.png')} />
       </div>
    )
  }

	renderPicturesView() {
		return (
			<div className="profile-picture-view-container">
				<Row>
					<Col md="12" className="profile-picture-view-container-col">
						{ this.renderPictureView("My Current Headshot") }
						{ this.renderPictureView("My Current Body Shot 1") }
						{ this.renderPictureView("My Current Body Shot 2") }
					</Col>
				</Row>
				<Row>
					<Col md="12" className="profile-picture-view-container-col">
						{ this.renderPictureView("My Other Pic 1") }
						{ this.renderPictureView("My Other Pic 2") }
					</Col>
				</Row>
			</div>

		)
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
			talent_medicals,
      worked_cruise_ship,
      created
    } = this.props.talentInfo
    const { skills, title, currentImageUrl, openImageModal } = this.state

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
                  <Col md="6" className="pt-2 pt-md-2">
                    <Typography className="profile-general-info-name">{"Height:"}</Typography>
                  </Col>
                  <Col md="6" className="pt-2 pt-md-2 profile-general-info-value-col">
                    <Typography className="profile-general-info-value">{this.makeHeight(height)}</Typography>
                  </Col>
                </Row>
                <Row>
                  <Col md="6" className="pt-2 pt-md-2">
                    <Typography className="profile-general-info-name">{"Weight:"}</Typography>
                  </Col>
                  <Col md="6" className="pt-2 pt-md-2 profile-general-info-value-col">
                    <Typography className="profile-general-info-value">{this.makeWeight(weight)}</Typography>
                  </Col>
                </Row>
                <Row>
                  <Col md="6" className="pt-2 pt-md-2">
                    <Typography className="profile-general-info-name">{"BMI:"}</Typography>
                  </Col>
                  <Col md="6" className="pt-2 pt-md-2 profile-general-info-value-col">
                    <Typography className="profile-general-info-value">{bmi}</Typography>
                  </Col>
                </Row>
                <Row>
                  <Col md="6" className="pt-2 pt-md-2">
                    <Typography className="profile-general-info-name">{"Age Range:"}</Typography>
                  </Col>
                  <Col md="6" className="pt-2 pt-md-2 profile-general-info-value-col">
                    <Typography className="profile-general-info-value">{age_range}</Typography>
                  </Col>
                </Row>
                <Row>
                  <Col md="6" className="pt-2 pt-md-2">
                    <Typography className="profile-general-info-name">{"Languages:"}</Typography>
                  </Col>
                  <Col md="6" className="pt-2 pt-md-2 profile-general-info-value-col">
                    <Typography className="profile-general-info-value">{this.makeLanguages(talent_languages)}</Typography>
                  </Col>
                </Row>
                <Row>
                  <Col md="6" className="pt-2 pt-md-2">
                    <Typography className="profile-general-info-name">{"Nationality:"}</Typography>
                  </Col>
                  <Col md="6" className="pt-2 pt-md-2 profile-general-info-value-col">
                    <Typography className="profile-general-info-value">{nationality}</Typography>
                  </Col>
                </Row>
                <Row>
                  <Col md="6" className="pt-2 pt-md-2">
                    <Typography className="profile-general-info-name">{"Citizenship:"}</Typography>
                  </Col>
                  <Col md="6" className="pt-2 pt-md-2 profile-general-info-value-col">
                    <Typography className="profile-general-info-value">{citizenship}</Typography>
                  </Col>
                </Row>
                <Row>
                  <Col md="6" className="pt-2 pt-md-2">
                    <Typography className="profile-general-info-name">{visa_type ? `${visa_type} Visa:` : 'Visa'}</Typography>
                  </Col>
                  <Col md="6" className="pt-2 pt-md-2">
                    <Typography className="profile-general-info-value profile-general-info-value-col">{visa_type ? 'YES' : 'NO'}</Typography>
                  </Col>
                </Row>
                <Row>
                  <Col md="6" className="pt-2 pt-md-2">
                    <Typography className="profile-general-info-name">{"Green Card:"}</Typography>
                  </Col>
                  <Col md="6" className="pt-2 pt-md-2 profile-general-info-value-col">
                    <Typography className="profile-general-info-value">{have_green_card ? "YES" : "NO"}</Typography>
                  </Col>
                </Row>
                <Row>
                  <Col md="6" className="pt-2 pt-md-2">
                    <Typography className="profile-general-info-name">{"Previous Ship Experience:"}</Typography>
                  </Col>
                  <Col md="6" className="pt-2 pt-md-2 profile-general-info-value-col">
                    <Typography className="profile-general-info-value">{worked_cruise_ship ? "YES" : "NO"}</Typography>
                  </Col>
                </Row>
                <Row>
                  <Col md="6" className="pt-2 pt-md-2">
                    <Typography className="profile-general-info-name">{"Previous Ship Medical:"}</Typography>
                  </Col>
                  <Col md="6" className="pt-2 pt-md-2 profile-general-info-value-col">
                    <Typography className="profile-general-info-value">{this.checkPreviousShipMedical(talent_medicals) ? "YES" : "NO"}</Typography>
                  </Col>
                </Row>
                <Row>
                  <Col md="6" className="pt-2 pt-md-2">
                    <Typography className="profile-general-info-name">{"CPR:"}</Typography>
                  </Col>
                  <Col md="6" className="pt-2 pt-md-2 profile-general-info-value-col">
                    <Typography className="profile-general-info-value">{this.checkCPR(talent_medicals) ? 'YES' : 'NO'}</Typography>
                  </Col>
                </Row>
              </Col>
							<Col md="9" className="profile-bio">
								<Row>
		              <Col md="3" className="profile-bio">
		                <Row>
		                  <Col md="12" className="pt-2 pt-md-2">
		                    <Typography className="profile-picture-name">{"Pictures"}</Typography>
		                  </Col>
		                  <Col md="12" className="pt-2 pt-md-2">
												{ this.renderPicturesView() }
		                  </Col>
		                </Row>
		              </Col>
		              <Col md="9">
		                <Row>
		                  <Col md="4" className="profile-bio">
		                    <Row>
		                      <Col md="12" className="pt-2 pt-md-2">
		                        <Typography className="profile-picture-name">{"Resume / CV"}</Typography>
		                      </Col>
		                      <Col md="12" className="pt-2 pt-md-2">
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
		                      </Col>
		                    </Row>
		                  </Col>
											<Col md="8" className="profile-bio">
		                    <Row>
		                      <Col md="12" className="pt-2 pt-md-2">
		                        <Typography className="profile-picture-name">{"Biography"}</Typography>
		                      </Col>
		                      <Col md="12" className="profile-general-info-value pt-1 pt-md-1">
														<TextField
										          id="multiline-static"
										          multiline
										          rows="8"
										          value={bio}
															fullWidth
															className="profile-bio-textfield"
										        />
		                      </Col>
		                    </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewProfile);
