import React from "react";
import { connect } from 'react-redux';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import moment from 'moment';
import Panel from 'components/general/panel';
import ProfilePicture from './ProfilePicture';
import ConfirmApprovePictureDialog from './ConfirmApprovePictureDialog';
import ConfirmRejectPictureDialog from './ConfirmRejectPictureDialog';
import AdminForm from 'components/shiptalent/forms/adminForm';
import AdminAPI from 'apis/adminAPIs';
import { adminStyles } from 'styles';


class ProfileEditPicture extends React.Component  {

  state = {
    profile: null,
    picture: null,
    selectedValue: '',
    openConfirmApproveDialog: false,
    openConfirmRejectDialog: false,
  };

  getInfoFromProps = (props) => {
    const { location } = props;
    let profile = (location && location.state && location.state.profile) ? location.state.profile : null;
    let picture = (location && location.state && location.state.picture) ? location.state.picture : null;
    let selectedValue = (picture && picture.approved) ? 'approved' : '';
    return { profile, picture, selectedValue };
  };

  componentWillMount = () => {
    this.setState({...this.getInfoFromProps(this.props)});
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({...this.getInfoFromProps(nextProps)});
  };

  handleChange = event => {
    if (event.target.value === 'approved') {
      this.handleClickApprove();
    } else if (event.target.value === 'reject') {
      this.handleClickReject();
    }
  };

  handleClickApprove = () => {
    this.setState({openConfirmApproveDialog: true});
  }

  handleClickApproveOk = () => {
    this.setState({openConfirmApproveDialog: false}, () => {
      const { profile, picture } = this.state;
      let data = {
        talent: profile.id,
        approved: true,
        approved_date: moment().format(),
        approved_by: this.props.auth.access.username
      };
      AdminAPI.saveProfilePicture(picture.id, data, this.handleApproveResponse);
    });
  }

  handleClickApproveCancel = () => {
    this.setState({openConfirmApproveDialog: false});
  }

  handleApproveResponse = (response, isFailed) => {
    if (!isFailed) this.setState({selectedValue: 'approved'});
  };

  handleClickReject = () => {
    this.setState({openConfirmRejectDialog: true});
  }

  handleClickRejectOk = () => {
    this.setState({openConfirmRejectDialog: false}, () => {
      const { profile, picture } = this.state;
      let data = {
        talent: profile.id,
      };
      AdminAPI.deleteProfilePicture(picture.id, data, this.handleRejectResponse);
    });
  }

  handleClickRejectCancel = () => {
    this.setState({openConfirmRejectDialog: false});
  }

  handleRejectResponse = (response, isFailed) => {
    // if (!isFailed) 
    this.setState({selectedValue: 'reject'});
  };

  renderContent() {
    const { classes } = this.props;
    const { profile, picture, selectedValue, openConfirmApproveDialog, openConfirmRejectDialog   } = this.state;

    return (
      <Panel>
        <Grid container spacing={24}>
          <Grid item xs />
          <Grid item md={7} xs={12}>
            <Grid container spacing={24}>
              <Grid item xs={12} spacing={0}>
                <Typography className={[classes.adminGeneralDescriptionText, classes.inlineText]}>
                    <Typography className={[classes.adminGeneralDescriptionText, classes.bold, classes.inlineText]}>
                        {'Date and Time Posted: '}
                    </Typography>
                    {picture ? picture.updated : ''}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography className={[classes.adminGeneralDescriptionText, classes.inlineText]}>
                  <Typography className={[classes.adminGeneralDescriptionText, classes.bold, classes.inlineText]}>
                      {'Date and Time Approved: '}
                  </Typography>
                  {picture ? picture.approved_date : ''}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography className={[classes.adminGeneralDescriptionText, classes.inlineText]}>
                  <Typography className={[classes.adminGeneralDescriptionText, classes.bold, classes.inlineText]}>
                      {'Approved By: '}
                  </Typography>
                  {picture ? picture.approved_by : ''}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={3} xs={12}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel component="legend"></FormLabel>
                  <RadioGroup
                    aria-label="pictureAction"
                    name="picture_action"
                    className={classes.group}
                    value={selectedValue}
                    onChange={this.handleChange}
                  >
                    <FormControlLabel 
                      value="approved" 
                      control={
                        <Radio classes={{
                            root: classes.adminpictureApproveSelection,
                            checked: classes.adminpictureApproveSelectionChecked,
                          }}
                        />
                      } 
                      label="Approve and Post" 
                    />
                    <FormControlLabel value="reject" control={<Radio color="default" />} label="Reject and Delete" />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs />

          <Grid item xs={12} >
            <Grid container spacing={8} justify="center" alignItems="center">
              <Grid item xs />
              <Grid item xs>
                <ProfilePicture profile={profile} picture={picture} />
              </Grid>
              <Grid item xs />
            </Grid>
          </Grid>
        </Grid>
        <ConfirmApprovePictureDialog
          open={openConfirmApproveDialog}
          onCancel={this.handleClickApproveCancel}
          onOK={this.handleClickApproveOk}
        />
        <ConfirmRejectPictureDialog
          open={openConfirmRejectDialog}
          onCancel={this.handleClickRejectCancel}
          onOK={this.handleClickRejectOk}
        />
      </Panel>
    );
  }

  render() {
    const { profile, picture } = this.state;
    return (
      <AdminForm
        talent={profile}
        showName
        formSubTitle={picture ? picture.caption : ''}
        nextLink={{pathname: "/admin/profile-pictures", state: {profile: profile}}}
        nextButtonTitle="Back to Pictures"
      >
        {this.renderContent()}
      </AdminForm>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {};
};

const mapStateToProps = state => {
  const { auth } = state;
  return {
    auth
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(adminStyles)(ProfileEditPicture));
