import React, {Component} from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ShipTalentImageLoader from 'components/shiptalent/loaders/ImageLoader';
import ApprovedStatus from '../ApprovedStatus';
import apiConfig from 'constants/api';
import { adminStyles } from 'styles';


class OverviewResume extends Component {

  render() {
    const {profile, link, showStatus, classes } = this.props;
    let buttonClasses = [classes.button, classes.adminTalentStatusButton];
    let resume = profile && profile.talent_resume ? profile.talent_resume[0] : null;
    return (
      (resume && resume.preview_path) ? (
        <Grid container spacing={8} direction="column" justify="center" alignItems="center">
          <Grid item xs={12}>
            <Link to={link}>
              <ShipTalentImageLoader
                src={`${apiConfig.server}/${resume.preview_path}`}
                containerClass={"profile-picture-container-div"}
                imageClassName={"profile-resume-image-viewer"}
                key={`${(resume && resume.id) ? resume.id : 'tr'}`}
              />
            </Link>
          </Grid>
          { showStatus && 
            <Grid item xs={12}>
              <ApprovedStatus isApproved={resume ? resume.approved : false} />
            </Grid>
          }
        </Grid>
      ) : (
        <div>None</div>
      )        
    );
  }
}


const mapStateToProps = state => {
  const { talentInfo } = state;
  return {
    profile: talentInfo.value
  };
};

const mapDispatchToProps = dispatch => {
  return { 
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(adminStyles)(OverviewResume));