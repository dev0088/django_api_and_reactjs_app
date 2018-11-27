import React, {Component} from 'react';
import { Row, Col, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import ImageLoader from 'react-loading-image';
import ImageLightbox from 'react-image-lightbox';
import UnitConverter from 'convert-units'
import RaisedButton from 'material-ui/RaisedButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import Panel from 'components/general/panel'
import ColumnButton from 'components/shiptalent/buttons/columnButton';
import Spacer from 'components/general/spacer';
import apiConfig from 'constants/api';
import defaultValues from 'constants/defaultValues';
import { makeTitleWithAllPositionTypes, existSkill } from 'utils/appUtils';
import * as talentActions from 'actions/talentActions';
import { getSubSkillVideoNumbersByPositionType } from 'utils/appUtils'
import { styles } from 'styles';
import 'react-image-lightbox/style.css';
import './viewProfile.css'


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
			WEIGHTS: defaultValues.WEIGHTS,
      user: null,
      nationality: null,
      citizenship: null,
      have_green_card: null,
      height: null,
      weight: null,
      bmi: null,
      age_range: null,
      head_line: null,
      bio: null,
      talent_visas: null,
      talent_languages: null,
      talent_resume: null,
      talent_medicals: null,
      worked_cruise_ship: null
    }
  }

  getInfoFromProps(props) {

    const {
      talent_position_types,
      talent_position_sub_types,
      talent_skills,
      user,
      nationality,
      citizenship,
      have_green_card,
      height,
      weight,
      bmi,
      age_range,
      head_line,
      bio,
      talent_visas,
      talent_languages,
      talent_resume,
      talent_medicals,
      talent_pictures,
      worked_cruise_ship
    } = props.talentInfo

    return {
      skills: talent_skills,
      title: makeTitleWithAllPositionTypes(props.talentInfo),
      user,
      nationality,
      citizenship,
      have_green_card,
      height,
      weight,
      bmi,
      age_range,
      head_line,
      bio,
      talent_visas,
      talent_languages,
      talent_resume,
      talent_medicals,
      talent_pictures,
      worked_cruise_ship
    }
  }

  componentWillMount() {
    const { talentInfo } = this.props

    this.props.talentActions.getCurrentTalentInfo()
    this.props.talentActions.getAllPositionTypes()
    this.props.talentActions.getAllSkills()

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
		if (index === (HEIGHTS.length - 1)) {
			tmp_height = HEIGHTS[HEIGHTS.length - 2]
			prefix = '>'
		}

		heightInFeet = UnitConverter(parseInt(tmp_height, 10))
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

		if (index === (WEIGHTS.length - 1)) {
			tmp_weight = WEIGHTS[WEIGHTS.length - 2]
			prefix = '>'
		}
		weightInLb = Math.round(UnitConverter(tmp_weight).from('lb').to('kg') * 10) / 10
		return `${prefix}${tmp_weight} lbs. / ${prefix}${weightInLb} kg`
	}

  makeLanguages = (talent_languages) => {
    let res = ''

		for (let i = 0; i < talent_languages.length; i ++) {
			let talent_language = talent_languages[i]
      res = res + talent_language.language + ' '
		}

    return res
  }

  makeImages = (talent_pictures) => {
    let images = []

		for (let i = 0; i < talent_pictures.length; i ++) {
			let talent_picture = talent_pictures[i]
      if (i < 5) {
        images.push(talent_picture.url)
      }
		}

    return images
  }

  makeImmigrationSubTitle(talentVisas) {
      const numberOfVisas = talentVisas ? talentVisas.length : 0

      if (numberOfVisas === 0) {
        return `No Active Visas`;
      } else if (numberOfVisas === 1) {
        return `1 Active Visa`;
      }

      return `${numberOfVisas} Active Visa`;
  }

  makeMedicalSubTitle(talentMedicals) {
    const numberOfMedicals = talentMedicals ? talentMedicals.length : 0

    if (numberOfMedicals === 0) {
      return `no conditions`;
    } else if (numberOfMedicals === 1) {
      return `1 condition`;
    }

    return `${numberOfMedicals} conditions`;
  }

  getPracticeVideoNumbers = (talent_videos) => {
    let res = 0

		for (let i = 0; i < talent_videos.length; i ++) {
			let talent_video = talent_videos[i]

      if (talent_video.position_type === defaultValues.DEFAULT_PRACTICE_POSITION_TYPE ||
        talent_video.position_type === null) {
        res ++
      }
		}

    return res
  }

  getLiveVideoNumbers = (talent_videos) => {
    let res = 0

		for (let i = 0; i < talent_videos.length; i ++) {
			let talent_video = talent_videos[i]
      if (talent_video.position_type !== defaultValues.DEFAULT_PRACTICE_POSITION_TYPE &&
        talent_video.position_type !== null) {
        res ++
      }
		}

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

		for (let i = 0; i < medicals.length; i ++) {
			let medical = medicals[i]

			for (let j = 0; j < checkingMedicals.length; j ++) {
				let chekingMedical = checkingMedicals[j]

				if ((medical.condition_title === chekingMedical) && medical.condition_value) {
					res = true
				}
			}
		}

		return res
	}

	checkCPR = (medicals) => {
		let cprMedical = medicals.find((medical) => {
			return medical.condition_title === 'I am certified in CPR.'
		})
		console.log('==== checkCPR: ', cprMedical, medicals)
		return cprMedical ? cprMedical.condition_value : false
	}

	renderGeneralInfoItem(name, value, editLink, key) {
    const { classes } = this.props
    let opts = {};

    if (key) {
      opts['key'] = `item${key}`;
    }

    return (
      <Grid container spacing={8} direction="row" justify="center" alignItems="center">
        <Grid item lg={6} md={6} xs={6} className={classes.talentProfileGeneralInfoNameCol}>
          {editLink ? (
            <Link to={editLink}>
              <EditIcon className={classes.talentProfileEditIcon}/>
            </Link>
          ) : (
            <div className={classes.talentProfileEditIconEmpty}/>
          )}
          <Typography className="profile-general-info-name">{name}</Typography>
        </Grid>
        <Grid item lg={6} md={6} xs={6} className="profile-general-info-value-col">
          <Typography className="profile-general-info-value">{value}</Typography>
        </Grid>
      </Grid>
    )

    return (
      <Row {...opts}>
        <Col md="6" className={classes.talentProfileGeneralInfoNameCol}>
          {editLink ? (
            <Link to={editLink}>
              <EditIcon className={classes.talentProfileEditIcon}/>
            </Link>
          ) : (
            <div className={classes.talentProfileEditIconEmpty}/>
          )}
          <Typography className="profile-general-info-name">{name}</Typography>
        </Col>
        <Col md="6" className="pt-2 pt-md-2 profile-general-info-value-col">
          <Typography className="profile-general-info-value">{value}</Typography>
        </Col>
      </Row>
    )
  }

	renderGeneralInfoView() {
    if (this.props.talentInfo === null) {
      return <Col md="3" className="profile-bio"/>
    }

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
      worked_cruise_ship
    } = this.state

    return (
      <Col md="3" className="profile-bio">
        { this.renderGeneralInfoItem("Height:", this.makeHeight(height), "/metrics-info") }
        { this.renderGeneralInfoItem("Weight:", this.makeWeight(weight), "/metrics-info") }
        { this.renderGeneralInfoItem("BMI:", bmi, null) }
        { this.renderGeneralInfoItem("Age Range:", age_range, "/metrics-info") }
        { this.renderGeneralInfoItem("Languages:", this.makeLanguages(talent_languages), "/language-info") }
        { this.renderGeneralInfoItem("Nationality:", nationality, "/nationality-info") }
        { this.renderGeneralInfoItem("Citizenship:", citizenship, "/nationality-info") }

        { talent_visas.length > 0 ? (
          talent_visas.map((visa, index) => {
            return this.renderGeneralInfoItem(`${visa.name} Visa:`, 'YES', "/nationality-info", index)
          })
        ) : (
          this.renderGeneralInfoItem(`Visa: `, 'NO', "/metrics-info")
        )}
        { this.renderGeneralInfoItem("Green Card: ", have_green_card ? "YES" : "NO", "/nationality-info") }
        { this.renderGeneralInfoItem("Previous Ship Experience: ", worked_cruise_ship ? "YES" : "NO", "/edit-profile") }
        { this.renderGeneralInfoItem("Previous Ship Medical: ", this.checkPreviousShipMedical(talent_medicals) ? "YES" : "NO" ? "YES" : "NO", "/medical-info") }
        { this.renderGeneralInfoItem("CPR: ", this.checkCPR(talent_medicals) ? 'YES' : 'NO', "/medical-info") }
      </Col>
    )
  }

	renderPictureView(caption, priority) {
		const { talent_pictures } = this.state
    let picture = null

    if (talent_pictures) {
      picture = talent_pictures.find(function(picture) {
        return (picture.caption === caption);
      });
    }

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
    const { classes } = this.props;

    return (
      <Grid container spacing={8} direction="column" justify="center" alignItems="center">
        <Grid item lg={12} md={12} xs={12} className={classes.talentProfileSpecialInfoNameCol}>
          <Link to="/pictures-info">
            <EditIcon className={classes.talentProfileSpecialInfoEditIcon}/>
          </Link>
          <Typography className="profile-picture-name">{"Pictures"}</Typography>
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <div className="profile-picture-view-container">
            <Row>
              <Col md="12" className="profile-picture-view-container-col">
                { this.renderPictureView("My Current Headshot", 0) }
                { this.renderPictureView("My Current Body Shot 1", 1) }
                { this.renderPictureView("My Current Body Shot 2", 2) }
              </Col>
            </Row>
            <Row>
              <Col md="12" className="profile-picture-view-container-col">
                { this.renderPictureView("My Other Pic 1", 3) }
                { this.renderPictureView("My Other Pic 2", 4) }
                { this.renderPictureView("My Other Pic 3", 5) }
              </Col>
            </Row>
            <Row>
              <Col md="12" className="profile-picture-view-container-col">
                { this.renderPictureView("My Other Pic 4", 6) }
                { this.renderPictureView("My Other Pic 5", 7) }
              </Col>
            </Row>
          </div>
        </Grid>
      </Grid>
    );
	}

	renderResumeView() {
    const { talent_resume } = this.state;
    const { classes } = this.props;

    return (
      <Grid container spacing={8} direction="column" justify="center" alignItems="center">
        <Grid item lg={12} md={12} xs={12} className={classes.talentProfileSpecialInfoNameCol}>
          <Link to="/resume-info">
            <EditIcon className={classes.talentProfileSpecialInfoEditIcon}/>
          </Link>
          <Typography className="profile-picture-name">{"Resume / CV"}</Typography>
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          {(talent_resume && talent_resume[0] && talent_resume[0].preview_path) ?
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
    );
  }

  renderBioView() {
    const { bio } = this.state
    const { classes } = this.props;

    return (
      <Grid container spacing={8} direction="column" justify="center" alignItems="center">
        <Grid item lg={12} md={12} xs={12} className={classes.talentProfileSpecialInfoNameCol}>
          <Link to="/bio-info">
            <EditIcon className={classes.talentProfileSpecialInfoEditIcon}/>
          </Link>
          <Typography className="profile-picture-name">{"Biography"}</Typography>
        </Grid>
        <Grid item lg={12} md={12} xs={12} className={classes.talentProfileBioTextValue}>
          <TextField
            id="multiline-static"
            multiline
            rows="8"
            value={bio}
            fullWidth={true}
            className="profile-bio-textfield"
          />
        </Grid>
      </Grid>
    );

    return (
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
    )
  }

  renderPositionButtons() {
    const { classes, allPositionTypes, allSkills, talentInfo } = this.props
    let items = []

    if (talentInfo && allPositionTypes && allPositionTypes.length > 0) {
      const { talent_video_sub_skills } = talentInfo
      for(let i = 0; i < allPositionTypes.length; i +=2) {
        let position = allPositionTypes[i]
        let title = `${position.name} Audition Videos`
        let subTitle = getSubSkillVideoNumbersByPositionType(talent_video_sub_skills, allSkills, position)
        let link = {
          pathname: '/video-positions',
          state: {
            position: position
          }
        }

        items.push(<Grid item lg={1} md={1} sm={1} xs={0} key={`position${i}-1`}/>)
        items.push(
          <Grid key={`position${i}-2`}
                item lg={5} md={5} sm={5} xs={12}
                className={classes.clientTalentViewVideoButtonGridItem}
          >
            <Link to={link}>
              <Button
                variant="contained" color={'primary'}
                fullWidth={true}
                className={classes.clientTalentViewVideoButton}
              >
                <Typography className={classes.clientTalentViewVideoButtonText}>
                  {title}
                </Typography>
                {subTitle && (
                  <Typography className={classes.clientTalentViewVideoButtonStatusText}>
                    {subTitle}
                  </Typography>
                )}
              </Button>
            </Link>
          </Grid>
        )

        if (allPositionTypes[i + 1]) {
          position = allPositionTypes[i + 1]
          title = `${position.name} Audition Videos`
          subTitle = getSubSkillVideoNumbersByPositionType(talent_video_sub_skills, allSkills, position)
          link = {
            pathname: '/video-positions',
            state: {
              position: position
            }
          }

          items.push(
            <Grid key={`position${i}-3`}
                  item lg={5} md={5} sm={5} xs={12}
                  className={classes.clientTalentViewVideoButtonGridItem}
            >
              <Link to={link}>
                <Button
                  variant="contained" color={'primary'}
                  fullWidth={true}
                  className={classes.clientTalentViewVideoButton}
                >
                  <Typography className={classes.clientTalentViewVideoButtonText}>
                    {title}
                  </Typography>
                  {subTitle && (
                    <Typography className={classes.clientTalentViewVideoButtonStatusText}>
                      {subTitle}
                    </Typography>
                  )}
                </Button>
              </Link>
            </Grid>
          )
        } else {
          items.push(<Grid item lg={5} md={5} sm={5} xs={12} key={`position${i}-3`}/>)
        }
        items.push(<Grid item lg={1} md={1} sm={1} xs={0} key={`position${i}-4`}/>)
      }
      return items
    }

    return (<div/>)

  }

  renderVideoButtonsGroup() {
    const { classes, allPositionTypes } = this.props
    return (
      <div>
          <Grid container spacing={24} direction="column" justify="center" alignItems="center">
            <ColumnButton
              link = {{
                pathname: "/video-greetings"
              }}
              color="primary"
              itemClass = {classes.clientTalentViewVideoButtonGridItem}
              buttonClass = {classes.clientTalentViewVideoButton}
              title = {"My Video Greetings"}
              titleClass = {classes.clientTalentViewVideoButtonText}
              subTitle = {"completed"}
              subTitleClass = {classes.clientTalentViewVideoButtonStatusText}
              size = {12}
              fullWidth = {false}
            />
          </Grid>
      <Spacer size={30}/>
        <Grid container spacing={16} justify="center" alignItems="center">
          { this.renderPositionButtons() }
        </Grid>
      </div>
    )
  }

  renderOtherButtonsGroup() {
    const { classes } = this.props
    const { talent_visas, talent_medicals } = this.state

    return (
      <Grid container spacing={24} direction="column" justify="center" alignItems="center">
        <ColumnButton
          link = {{pathname: "/nationality-info"}}
          color="primary"
          itemClass = {classes.clientTalentViewMoreInfoButtonGridItem}
          buttonClass = {classes.clientTalentViewMoreInfoButton}
          title = {"Immigration"}
          titleClass = {classes.clientTalentViewVideoButtonText}
          subTitle = {this.makeImmigrationSubTitle(talent_visas)}
          subTitleClass = {classes.clientTalentViewVideoButtonStatusText}
          size = {12}
          fullWidth = {false}
        />
        <ColumnButton
          link = {{pathname: "/medical-info"}}
          color="primary"
          itemClass = {classes.clientTalentViewMoreInfoButtonGridItem}
          buttonClass = {classes.clientTalentViewMoreInfoButton}
          title = {"Medical"}
          titleClass = {classes.clientTalentViewVideoButtonText}
          subTitle = {this.makeMedicalSubTitle(talent_medicals)}
          subTitleClass = {classes.clientTalentViewVideoButtonStatusText}
          size = {12}
          fullWidth = {false}
        />
        <ColumnButton
          link = {{pathname: "/availability-info"}}
          color="primary"
          itemClass = {classes.clientTalentViewMoreInfoButtonGridItem}
          buttonClass = {classes.clientTalentViewMoreInfoButton}
          title = {"Availability"}
          titleClass = {classes.clientTalentViewVideoButtonText}
          subTitle = {"Last updated 04/01/2018"}
          subTitleClass = {classes.clientTalentViewVideoButtonStatusText}
          size = {12}
          fullWidth = {false}
        />
      </Grid>
    );

  }

  render() {
    const { classes } = this.props
    const { user, head_line, title, currentImageUrl, openImageModal } = this.state

    return (
      <div className="profile-container">
        {this.state.notification && <Alert color="info">{this.state.notification}</Alert>}
      <Panel>
        <Grid container direction="row" justify="center" alignItems="center" spacing={16} >
          <Grid item xs={12}>
            <Typography align="center" className={classes.talentProfileViewTitleText}>
              {user && (`${user.first_name} ${user.last_name}`)}
            </Typography>
            <Typography align="center" className={classes.talentProfileViewSubTitleText}>
              {title}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={16}>
              <Grid item md={2} xs={1} />
              <Grid item md={8} xs={10}>
                <Typography align="center" className={classes.talentProfileViewHeaderText}>
                  {`“${head_line}”`}
                </Typography>
              </Grid>
              <Grid item md={2} xs={1} />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Row>
              {this.renderGeneralInfoView()}
              <Col md="9" className="profile-bio">
                <Row>
                  <Col md="3" className="profile-bio">
                    { this.renderPicturesView() }
                  </Col>
                  <Col md="9">
                    <Row>
                      <Col md="4" className="profile-bio">
                        {this.renderResumeView()}
                      </Col>
                      <Col md="8" className="profile-bio">
                        { this.renderBioView() }
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
          </Grid>
        </Grid>

        {openImageModal && (
          <ImageLightbox
            mainSrc={currentImageUrl}
            onCloseRequest={() => this.setState({ openImageModal: false, currentImageUrl: null })}
          />
        )}
      </Panel>
        <Grid container spacing={16}>
          <Grid item md={12} xs={12} className={classes.clientFormNextButtonContainerGridItem}>
            <Link to="/edit-profile">
              <RaisedButton label="Back to Build/Edit My Profile" primary={true}/>
            </Link>
          </Grid>
        </Grid>
      </div>
    );


    return(
      <div className="profile-container">
        {this.state.notification && <Alert color="info">{this.state.notification}</Alert>}
        <Row className="details-content">
          <Col md="12">
            <Row>
              <Col md="12" className="profile-name">
                <h3>
                  {user && (`${user.first_name} ${user.last_name}`)}
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
              {this.renderGeneralInfoView()}
							<Col md="9" className="profile-bio">
								<Row>
		              <Col md="3" className="profile-bio">
                    { this.renderPicturesView() }
		              </Col>
		              <Col md="9">
		                <Row>
		                  <Col md="4" className="profile-bio">
                        {this.renderResumeView()}
		                  </Col>
											<Col md="8" className="profile-bio">
                        { this.renderBioView() }
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
  const { auth, talentInfo, allPositionTypes, allSkills } = state;

  return {
    auth,
    talentInfo: talentInfo.value,
    allPositionTypes: allPositionTypes.value,
    allSkills: allSkills.value
  }
}

function mapDispatchToProps(dispatch) {
  return {
    talentActions: bindActionCreators(talentActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ViewProfile));
