import React from "react";
import { Link } from 'react-router-dom';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ShipTalentImageLoader from 'components/shiptalent/loaders/ImageLoader';
import ApprovedStatus from '../ApprovedStatus';
import { adminStyles } from 'styles';


class ProfilePciture extends React.Component  {

  state = {
    profile: null,
    picture: null,
    showStatus: false, 
    showCaption: false, 
    caption: ''
  };

  getInfoFromProps = (props) => {
    const { profile, picture, showStatus, showCaption, caption} = this.props;
    return { profile, picture, showStatus, showCaption, caption };
  };

  componentWillMount = () => {
    this.setState({...this.getInfoFromProps(this.props)});
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({...this.getInfoFromProps(nextProps)});
  };

  render() {
    const { classes } = this.props;
    const { picture, profile, showStatus, showCaption, caption } = this.state;
    return (
      <Grid container spacing={8} direction="column" justify="center" alignItems="center">
        { showCaption && 
          <Grid item xs={12}>
            <Typography className={[classes.adminGeneralTitle, classes.bold]}>
              {caption ? caption : ''}
            </Typography>
          </Grid>
        }
        <Grid item xs={12}>
          <Link to={{pathname: picture ? '/admin/profile-pictures/edit-picture' : '', state: {profile: profile, picture: picture}}}>
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

export default withStyles(adminStyles)(ProfilePciture);
