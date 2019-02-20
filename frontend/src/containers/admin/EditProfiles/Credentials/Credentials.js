import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Panel from "components/general/panel";
import AdminForm from 'components/shiptalent/forms/adminForm';
import Spacer from 'components/general/spacer';
import ChangeTidDialog from './ChangeTidDialog';
import * as adminActions from 'actions/adminActions';
import * as talentActions from 'actions/talentActions';
import defaultValues from 'constants/defaultValues';
import AdminAPI from 'apis/adminAPIs';
import { adminStyles } from 'styles';
import UserNoteSync from "../UserNote/UserNoteSync";


class Credentials extends React.Component  {
  state = {
    profileId: 0,
    userIds: [],
    changePasswordNoteType: [defaultValues.USER_NOTE_TYPE.CHANGE_PASSWORD],
    tidNoteTypes: [defaultValues.USER_NOTE_TYPE.TID],
    loginNoteType: [defaultValues.USER_NOTE_TYPE.LOGIN, defaultValues.USER_NOTE_TYPE.LOGOUT],
    showChangeDialog: false
  };

  getInfoFromProps = (props) => {
    const { profile } = props;
    let profileId = profile && profile.user.id;
    let userIds = [];

    if (profile) userIds.push(profile.user.id);

    return { profileId, userIds };
  };

  componentWillMount = () => this.setState({...this.getInfoFromProps(this.props)}, () => {
    
  });

  componentWillReceiveProps = (nextProps) => this.setState({...this.getInfoFromProps(nextProps)});

  handleClickChangeTidButton = () => this.setState({showChangeDialog: true});

  onOK = (tid) => {
    this.setState({showChangeDialog: false}, () => {
      const { profile } = this.props;
      if (profile) AdminAPI.saveProfile(profile.user.id, { tid }, this.handleChangeTidResponse);
    });
  };

  onCancel = () => this.setState({showChangeDialog: false});
  
  handleChangeTidResponse = (response, isFailed) => {
    if (isFailed) {} 
    else {
      const { profile } = this.props;
      if (profile) this.props.talentActions.getTalentInfo(profile.id);
    }
  };

  renderContent() {
    const { profile, classes } = this.props;
    const { userIds, changePasswordNoteType, tidNoteTypes, loginNoteType, showChangeDialog } = this.state;

    return (
      <Panel>
        <Grid container spacing={16} justify="flex-start" alignItems="flex-start">
          <Grid item md={6} sm={12} xs={12}>
            <Grid container spacing={0} justify="flex-start" alignItems="flex-start">
              <Grid item xs={12}>
                <Typography className={classNames(classes.adminGeneralDescriptionText, classes.bold, classes.inlineText)}>
                  USER NAME / EMAIL
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-bare"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  value={profile ? profile.user.email : ''}
                  InputProps={{ readOnly: true }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}><Spacer size={27} /></Grid>

              <Grid item xs={12}>
                <Typography className={classNames(classes.adminGeneralDescriptionText, classes.bold, classes.inlineText)}>
                  PASSWORD CHANGE/RESET HISTORY
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <UserNoteSync 
                  userIds={userIds} 
                  noteTypes={changePasswordNoteType} 
                  objectId={null}
                  enableAdd={false}
                />
              </Grid>
              <Grid item xs={12}><Spacer size={27} /></Grid>

              <Grid item xs={12}>
                <Grid container spacing={8} directioin="row" justify="space-between" alignItems="flex-end">
                  <Grid item xs={6}>
                    <Typography className={classNames(classes.adminGeneralDescriptionText, classes.bold, classes.inlineText)}>
                      TALENT ID LOG
                    </Typography>
                  </Grid>
                  <Grid item xs={6} className={classes.rightText}>
                    <Button variant="contained" size="small" className={classNames(classes.button, classes.adminAddNoteButton)}
                      onClick={this.handleClickChangeTidButton}
                    >
                      <Typography className={classes.adminAddNoteButtonTitle}>
                        Change
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <UserNoteSync 
                  userIds={userIds}
                  noteTypes={tidNoteTypes}
                  objectId={null}
                  enableAdd={false}
                />
              </Grid>

            </Grid>
          </Grid>

          <Grid item md={6} sm={12} xs={12}>
            <Typography className={classNames(classes.adminGeneralDescriptionText, classes.bold, classes.inlineText)}>
              LOGIN HISTORY
            </Typography>
            <UserNoteSync 
              userIds={userIds}
              noteTypes={loginNoteType}
              objectId={null}
              enableAdd={false}
              lines={29}
            />
          </Grid>
        </Grid>
        <ChangeTidDialog
          open={showChangeDialog}
          onOK={this.onOK}
          onCancel={this.onCancel}
          previousTid={profile ? profile.tid : ''}
        />
      </Panel>
    );
  }

  render() {
    const { profile } = this.props;

    return (
      <AdminForm
        talent={profile}
        showName
        formSubTitle="CREDENTIALS"
        nextLink={{pathname: "/admin/edit-profiles/edit-profile", state: {profileId: profile ? profile.id : null}}}
        nextButtonTitle="Back to Profile"
      >
        {this.renderContent()}
      </AdminForm>
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
    adminActions: bindActionCreators(adminActions, dispatch),
    talentActions: bindActionCreators(talentActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(adminStyles)(Credentials));
