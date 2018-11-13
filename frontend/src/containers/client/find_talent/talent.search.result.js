import React, {Component} from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ImageLoader from 'react-loading-image';
import ClientForm from 'components/shiptalent/forms/clientForm';
import Spacer from "components/general/spacer";
import { makeTitleWithAllPositionTypes, getSexTitle, getAvatarFromTalentInfo } from 'utils/appUtils';
import styles from 'styles';
import '../client.css';

class TalentSearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      availableTalents: [],
      nearAvailableTalents: []
    }
  };

  getInfoFromProps(props) {
    const { talentSearchResult } = props
    let availableTalents = []
    let nearAvailableTalents = []

    for(let i = 0; i < talentSearchResult.length; i ++) {
      let talent = talentSearchResult[i]
      if (talent.profile_status.is_completed_profile) {
        availableTalents.push(talent)
      } else {
        nearAvailableTalents.push(talent)
      }
    }

    return {
      availableTalents,
      nearAvailableTalents
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.getInfoFromProps(nextProps)
    })
  }

  renderTalent(talent) {
    const { classes } = this.props
    const talent_picture = getAvatarFromTalentInfo(talent)
    return (
      <Grid container spacing={24}>
        <Grid item xl={1} lg={1} md={1} sm={2} xs={3}>
          <Link to={{
              pathname: '/client/talent_view',
              state: { talentInfo: talent }
            }}
            className={classes.pictureContainer}
          >
            <ImageLoader
              src={talent_picture}
              className={classes.clientTalentSearchResultPicture}
              loading={() => <div className={classes.clientTalentSearchResultPicture}>Loading...</div>}
              error={() => <img src={require('images/missing.png')} className={classes.clientTalentSearchResultPicture}/>} />
          </Link>
        </Grid>
        <Grid item xl={11} lg={11} md={11} sm={10} xs={9}>
          <Grid container spacing={14} direction="column" justify="center" alignItems="flex-start">
            <Grid item xs={12} md={12}>
              <Typography>
                {`${talent.user.first_name} ${talent.user.last_name} (VDA${talent.id}) -
                ${getSexTitle(talent.sex)}
                ${makeTitleWithAllPositionTypes(talent)}`}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography className={classes.clientSearchResultTalentHeadlineText}>
                {`"${talent.head_line}"`}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography>
                {`Average Rating: ${talent.average_rating}`}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  renderTalentsTable(talents) {
    return (
      <Grid container spacing={24}>
        {(talents && talents.length > 0) ? (
          talents.map((talent, index) => {
            return (<Grid item xs={12} key={index}>{this.renderTalent(talent)}</Grid>)
          })
        ) : (<Grid item xs={12} />)}
      </Grid>
    )
  }

  renderAvailableTalents() {
    return (this.renderTalentsTable(this.state.availableTalents))
  }

  renderNearAvailableTalents() {
    return (this.renderTalentsTable(this.state.nearAvailableTalents))
  }

  renderContent() {
    const { classes } = this.props

    return(
      <Grid container spacing={24}>
        <Grid item xs={12} >
          {this.renderAvailableTalents()}
        </Grid>
        <Grid item xs={12} />
        <Grid item xs={12} >
          <Typography className={classes.clientFormSubTitle}>
            {"NEAR AVAILABLE(Availability within 14 Days of Specified Contract Start and/or End Date)"}
          </Typography>
          <Spacer size={11}/>
          {this.renderNearAvailableTalents()}
        </Grid>
      </Grid>
    )
  }

  render() {
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} />
        <Grid item xs={12} >
          <ClientForm
            formTitle="Search Result"
            formSubTitle="Click Picture to View FullProfile"
            backLink="/client/home"
            backButtonTitle="Back to My Home Page"
            nextLink="/client/talent_search"
            nextButtonTitle="Back to Talent Search"
            handleClickNextButton={this.handleClickNextButton}
            contents={this.renderContent()}
          />
        </Grid>
      </Grid>
    )
  }
}


function mapStateToProps(state) {
  const { talentSearchResult } = state;
  return {
    talentSearchResult: talentSearchResult.value,
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TalentSearchResult));