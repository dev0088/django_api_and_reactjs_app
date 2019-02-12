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
import OverviewResume from './OverviewResume';
import ConfirmApproveResumeDialog from './ConfirmApproveResumeDialog';
import ConfirmRejectResumeDialog from './ConfirmRejectResumeDialog';
import AdminForm from 'components/shiptalent/forms/adminForm';
import AdminAPI from 'apis/adminAPIs';
import defaultValues from 'constants/defaultValues';
import { adminStyles } from 'styles';


class EditResume extends React.Component  {

  state = {
    profile: null,
    resume: null,
    selectedValue: '',
    openConfirmApproveDialog: false,
    openConfirmRejectDialog: false,
  };

  getInfoFromProps = (props) => {
    const { location } = props;
    let profile = (location && location.state && location.state.profile) ? location.state.profile : null;
    let resume = (profile && profile.talent_resume) ? profile.talent_resume[0] : null;
    let selectedValue = (resume && resume.approved) ? 'approved' : '';
    return { profile, resume, selectedValue };
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
      const { profile, resume } = this.state;
      let data = {
        talent: profile.id,
        approved: true,
        approved_date: moment().format(),
        approved_by: this.props.auth.access.username
      };
      AdminAPI.saveProfileResume(resume.id, data, this.handleApproveResponse);
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
      const { profile, resume } = this.state;
      let data = {
        talent: profile.id,
      };
      AdminAPI.deleteProfileResume(resume.id, data, this.handleRejectResponse);
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
    const { profile, resume, selectedValue, openConfirmApproveDialog, openConfirmRejectDialog   } = this.state;

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
                    {resume ? moment.tz(resume.updated).format(defaultValues.ADMIN_EDIT_PROFILE_FORMAT) : ''}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography className={[classes.adminGeneralDescriptionText, classes.inlineText]}>
                  <Typography className={[classes.adminGeneralDescriptionText, classes.bold, classes.inlineText]}>
                      {'Date and Time Approved: '}
                  </Typography>
                  {resume ? moment.tz(resume.approved_date).format(defaultValues.ADMIN_EDIT_PROFILE_FORMAT) : ''}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography className={[classes.adminGeneralDescriptionText, classes.inlineText]}>
                  <Typography className={[classes.adminGeneralDescriptionText, classes.bold, classes.inlineText]}>
                      {'Approved By: '}
                  </Typography>
                  {resume ? resume.approved_by : ''}
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
                    aria-label="ResumeAction"
                    name="resume_action"
                    className={classes.group}
                    value={selectedValue}
                    onChange={this.handleChange}
                  >
                    <FormControlLabel 
                      value="approved" 
                      control={
                        <Radio classes={{
                            root: classes.adminResumeApproveSelection,
                            checked: classes.adminResumeApproveSelectionChecked,
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
                <OverviewResume profile={profile} link={{pathname: "/admin/resume", state: {profile: profile}}}/>
              </Grid>
              <Grid item xs />
            </Grid>
          </Grid>
        </Grid>
        <ConfirmApproveResumeDialog
          open={openConfirmApproveDialog}
          onCancel={this.handleClickApproveCancel}
          onOK={this.handleClickApproveOk}
        />
        <ConfirmRejectResumeDialog
          open={openConfirmRejectDialog}
          onCancel={this.handleClickRejectCancel}
          onOK={this.handleClickRejectOk}
        />
      </Panel>
    );
  }

  render() {
    const { profile } = this.state;
    return (
      <AdminForm
        talent={profile}
        showName
        formSubTitle="Resume"
        nextLink={{pathname: "/admin/head-line", state: {profile: profile}}}
        nextButtonTitle="Back to Headline, Bio & Resume"
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(adminStyles)(EditResume));
