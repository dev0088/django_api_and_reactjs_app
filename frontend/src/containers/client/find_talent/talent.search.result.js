import React, {Component} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ImageLoader from 'react-loading-image';
import ClientForm from 'components/shiptalent/forms/clientForm';
import { makeTitleWithAllPositionTypes, getSexTitle } from 'utils/appUtils';
import face from 'images/faces/a.jpg';
import styles from 'styles';
import '../client.css';

class TalentSearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      availableTalents: [],
      nearAvailableTalents: []
    }
  }

  state = {
    result_list: [
      {
        img: face,
        name: 'Philip LaVerne',
        vda_no: '222',
        role: 'Male Vocalist (tenor) who Dances and Acts',
        description: 'Pop/Rock Tenor with Strong Dancing and Acting Skills and Five Years of Cruise Ship Experience',
        rate: '9.41'
      }
    ]
  };

  btnStyle = {
    width: '18rem'
  };

  getInfoFromProps(props) {
    const { talentSearchResult } = props
    return {
      availableTalents: talentSearchResult
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.getInfoFromProps(nextProps)
    })
  }

  goWelcomeScreen = () => {
    window.location.href = "/client/home"
  };

  goTalentSearch = () => {
    window.location.href = "/client/talent_search"
  };

  getAvatarFromTalentInfo(talentInfo) {
    if (talentInfo && talentInfo.talent_pictures.length > 0) {
      for (let i = 0; i < talentInfo.talent_pictures.length; i++) {
        if (talentInfo.talent_pictures[i].url) {
          return talentInfo.talent_pictures[i].url
        }
      }
    }
    return null
  }

  renderTalent(talent) {
    const { classes } = this.props
    const talent_picture = this.getAvatarFromTalentInfo(talent)
    return (
      <Grid container spacing={24}>
        <Grid item xs={2} md={2}>
          <div onClick={() => this.showImage(talent_picture)} 	className="profile-picture-container-div">
            <ImageLoader
              src={talent_picture}
              className="profile-picture-size"
              loading={() => <div className="profile-picture-size">Loading...</div>}
              error={() => <div>Error</div>} />
          </div>
        </Grid>
        <Grid item xs={10} md={10}>
          <Grid container spacing={10}>
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
          </Grid>
        </Grid>
      </Grid>
    )
  }

  renderAvailableTalents() {
    const { availableTalents } = this.state
    console.log("===== availableTalents: ", availableTalents)

    return (
      <Grid container spacing={24}>
        {(availableTalents && availableTalents.length > 0) ? (
            availableTalents.map((talent, index) => {
              return (
                <Grid item xs={12} key={index}>{this.renderTalent(talent)}</Grid>
              )
            })
          ) : (
          <Grid item xs={12} />
        )}
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
            contents={this.renderAvailableTalents()}
          />
        </Grid>
      </Grid>
    )
  }

  renderPrevious() {
    const {fetchData} = this.props.location.state;
    console.log('===== props: ', this.props)
    return (
      <div>
        <div className="result-title text-center mt-4">Search Result</div>
        <div className="result-subtitle text-center mb-3">Click Picture to View Full Profile</div>
        {fetchData.value.crt_data.map((each, index) => (
          <div key={index} className="d-flex mb-2">
            <img src={each.image} className="search-face mr-2"/>
            <div>
              <div>{each.name}(VDA{each.vda_number}) - {each.role_description}</div>
              <div className="font-weight-bold">"{each.comment}"</div>
              <div>Average Rating: {each.avg_rating}</div>
            </div>
          </div>
        ))}

        <div className="font-weight-bold mt-4 mb-2">
          NEAR AVAILABLE (Availability within 14 Days of Specified Contract Start and/or End Date)
        </div>

        {fetchData.value.next_data.map((each, index) => (
          <div key={index} className="d-flex mb-2">
            <img src={each.image} className="search-face mr-2"/>
            <div>
              <div>{each.name}(VDA{each.vda_number}) - {each.role_description}</div>
              <div className="font-weight-bold">"{each.comment}"</div>
              <div>Average Rating: {each.avg_rating}</div>
            </div>
          </div>
        ))}

        <div className="mt-5 pb-4">
          <div className="d-flex justify-content-end mr-3">
            <button className="btn btn-dark" style={this.btnStyle} onClick={this.goWelcomeScreen}>
              Back to My Home Page
            </button>
          </div>
          <div className="mt-2 d-flex justify-content-end mr-3">
            <button className="btn btn-dark" style={this.btnStyle} onClick={this.goTalentSearch}>
              Back to Talent Search
            </button>
          </div>
        </div>
      </div>
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