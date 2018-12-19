import React, {Component} from 'react';
import { Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ImageLoader from 'react-loading-image';
import ImageLightbox from 'react-image-lightbox';
import Spacer from 'components/general/spacer';
import ClientForm from 'components/shiptalent/forms/clientForm';
import ColumnButton from 'components/shiptalent/buttons/columnButton';
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

class TalentView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      talentInfo: (props && props.location && props.location.state) ? props.location.state.talentInfo : null,
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
    const { talentInfo } = props
    return {
      skills: talentInfo.talent_skills,
      title: makeTitleWithAllPositionTypes(talentInfo)
    }
  }

  componentWillMount() {
    if (this.props.location.state) {
      const { talentInfo } = this.props.location.state
      if (talentInfo) {
        this.setState({
          ...this.getInfoFromProps(this.props.location.state)
        })
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const propsState = nextProps.location.state
    if (propsState) {
      const { talentInfo } = propsState
      if (talentInfo) {
        this.setState({
          ...this.getInfoFromProps(propsState)
        })
      }
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
    } = this.state.talentInfo
    const { title } = this.state
    
    return (
      <Grid container spacing={10} direction="column" justify="center" alignItems="center">
        <Grid item xs={12} className={classes.clientTalentViewHeaderGridItem}>
          <h3>
            {`${user.first_name} ${user.last_name} - ${average_rating}`}
          </h3>
          <p>{title}</p>
        </Grid>
        <Grid item xs={12} className={classes.clientTalentViewHeaderGridItem}>
          <h4 className={classes.clientTalentViewHeaderTitleText}>{head_line}</h4>
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
    } = this.state.talentInfo

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
    const { talent_pictures } = this.state.talentInfo

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
    const { talent_resume } = this.state.talentInfo

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
    const { bio } = this.state.talentInfo

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

  renderMoreInfoButton(link, title, subTitle) {
    const { classes } = this.props
    return (
      <ColumnButton
        link = {link}
        itemClass = {classes.clientTalentViewMoreInfoButtonGridItem}
        buttonClass = {classes.clientTalentViewMoreInfoButton}
        title = {title}
        titleClass = {classes.clientTalentViewVideoButtonText}
        subTitle = {subTitle}
        subTitleClass = {classes.clientTalentViewVideoButtonStatusText}
        xs = {12}
        color = "primary"
        fullWidth = {true}
      />
    )
  }
  renderMoreInfoButtons() {
    const { classes } = this.props
    return (
      <Grid container spacing={16} justify="center" alignItems="center">
        { this.renderMoreInfoButton('/client/casting_request/new', "Request More Info") }
        { this.renderMoreInfoButton('/client/myshared_profile', "Shared Profile") }
        { this.renderMoreInfoButton('/client/blocked_profile', "Block Profile", "Temporarily or permanently") }
      </Grid>
    )
  }

  renderVideoButton(link, title, subTitle) {
    const { classes } = this.props
    return (
      <ColumnButton
        link = {link}
        itemClass = {classes.clientTalentViewVideoButtonGridItem}
        buttonClass = {classes.clientTalentViewVideoButton}
        title = {title}
        titleClass = {classes.clientTalentViewVideoButtonText}
        subTitle = {subTitle}
        subTitleClass = {classes.clientTalentViewVideoButtonStatusText}
        xs = {6}
        color = "primary"
        fullWidth = {true}
      />

    )
  }

  renderVideoButtonsGroup() {
    const { talent_videos } = this.state.talentInfo

    return (
      <Grid container spacing={24} justify="center" alignItems="center">
        {this.renderVideoButton('#', "Video Greetings", 2)}
        {this.renderVideoButton('#', "Video Interview", getLiveVideoNumbers(talent_videos))}
        {this.renderVideoButton('#', "Vocal Audition Videos", 11)}
        {this.renderVideoButton('#', "Dance Audition Videos", 12)}
        {this.renderVideoButton('#', "Acting Audition Videos", 3)}
        {this.renderVideoButton('#', "Aerialist Audition Videos", 3)}
        {this.renderVideoButton('#', "Musician Audition Videos", 0)}
        {this.renderVideoButton('#', "Technician Audition Videos", 0)}
        {this.renderVideoButton('#', "Cruise Staff Audition Videos", 0)}
        {this.renderVideoButton('#', "Youth Staff Audition Videos", 0)}
      </Grid>
    )
  }

  renderOtherButton(link, title, statusValue) {
    const { classes } = this.props
    return (
      <ColumnButton
        link = {link}
        itemClass = {classes.clientTalentViewVideoButtonGridItem}
        buttonClass = {classes.clientTalentViewVideoButton}
        title = {title}
        titleClass = {classes.clientTalentViewVideoButtonText}
        subTitle = {statusValue}
        subTitleClass = {classes.clientTalentViewVideoButtonStatusText}
        xs = {12}
        color = ''
        fullWidth = {false}
      />
    )
  }

  renderOtherButtonsGroup() {
    return (
      <Grid container spacing={24} direction="column" justify="center" alignItems="center">
        {this.renderOtherButton('#', "Immigration", '2 Active Visas')}
        {this.renderOtherButton('#', "Medical", 'no conditions')}
        {this.renderOtherButton('#', "Availability", 'Last updated 04/11/2018')}
        {this.renderOtherButton('#', "Client Ratings", '3 Submissions')}
      </Grid>
    )
  }

  renderColumnButton(link, title, subTitle, size, color, fullWidth) {
    const { classes } = this.props
    return (
      <ColumnButton
        link = {link}
        itemClass = {fullWidth ?
          classes.clientTalentViewMoreInfoButtonGridItem :
          classes.clientTalentViewMoreInfoButtonGridItemWithoutFullWidth}
        buttonClass = {classes.clientTalentViewMoreInfoButton}
        title = {title}
        titleClass = {classes.clientTalentViewVideoButtonText}
        subTitle = {subTitle}
        subTitleClass = {classes.clientTalentViewVideoButtonStatusText}
        xs = {size}
        color = {color}
        fullWidth = {fullWidth}
      />
    )
  }

  renderAddButtonsGroup() {
    return(
      <Grid container spacing={24} direction="column" justify="center" alignItems="center">
        {this.renderColumnButton('#', 'Add to My Call Backs', '(save for later)',
          12, 'primary', true)}
        {this.renderColumnButton('#', 'Add to My Casting Request', null,
          12, 'secondary', true)}
      </Grid>
    )
  }

  renderContent() {
    if (!this.state.talentInfo) {
      return <div/>
    }

    const { currentImageUrl, openImageModal } = this.state
    return (
      <Grid container spacing={8}>
        {this.state.notification && <Alert color="info">{this.state.notification}</Alert>}
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
        <Grid item md={3} xs={12} style={{margin: 'auto'}}>
          {this.renderMoreInfoButtons()}
        </Grid>
        <Grid item md={6} xs={12}>
          {this.renderVideoButtonsGroup()}
        </Grid>
        <Grid item md={3} xs={12}>
          {this.renderOtherButtonsGroup()}
        </Grid>
        <Grid item xs={12}>
          <Spacer size={30} />
        </Grid>
        <Grid item xs={12}>
          {this.renderAddButtonsGroup()}
        </Grid>

        {openImageModal && (
          <ImageLightbox
            mainSrc={currentImageUrl}
            onCloseRequest={() => this.setState({ openImageModal: false, currentImageUrl: null })}
          />
        )}
      </Grid>
    )
  }

  render() {
    return(
      <Grid container spacing={24}>
        <Grid item xs={12} >
          <ClientForm
            formTitle=""
            formSubTitle=""
            backLink="/client/talent_search_result"
            backButtonTitle="Back to Search Result"
            nextLink="/client/home"
            nextButtonTitle="Back to My Home Page"
          >
            {this.renderContent()}
          </ClientForm>
        </Grid>
      </Grid>
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
