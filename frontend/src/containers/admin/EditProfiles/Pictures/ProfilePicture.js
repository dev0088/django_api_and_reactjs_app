import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ShipTalentImageLoader from 'components/shiptalent/loaders/ImageLoader';
import ApprovedStatus from '../ApprovedStatus';
import { adminStyles } from 'styles';


class ProfilePciture extends React.Component  {

  render() {
    const { picture, showStatus, showCaption, caption, classes } = this.props;

    return (
      <Grid container spacing={8} direction="column" justify="center" alignItems="center">
        { showCaption && 
          <Grid item xs={12}>
            <Typography className={classNames(classes.adminGeneralTitle, classes.bold)}>
              {caption ? caption : ''}
            </Typography>
          </Grid>
        }
        <Grid item xs={12}>
          <Link to={{pathname: picture ? '/admin/profile-pictures/edit-picture' : '', state: {picture: picture}}}>
            <ShipTalentImageLoader
              src={picture ? picture.url : ''}
              containerClass={"profile-picture-container-div"}
              imageClassName={classes.adminPorfilePictureContainer}
              key={`${(picture && picture.id) ? picture.id : 'tr'}`}
            />
          </Link>
        </Grid>
        { showStatus && 
          <Grid item xs={12}>
            <ApprovedStatus isApproved={picture ? picture.approved : false} />
          </Grid>
        }
      </Grid>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(adminStyles)(ProfilePciture));
