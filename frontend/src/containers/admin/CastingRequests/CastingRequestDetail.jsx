import React from "react";
import moment from "moment";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Panel from "components/general/panel";
import Spacer from 'components/general/spacer';
import AdminForm from 'components/shiptalent/forms/adminForm';
import ProfileItem from 'containers/admin/ProfileSearch/ProfileItem';
import CastingRequestTalentTable from './CastingRequestTalentTable';
import CastingRequestOfferDetails from './CastingRequestOfferDetails';
import AdminAPI from 'apis/adminAPIs';
import defaultValues from 'constants/defaultValues';
import { getProfileButtonClassNameByCastingRequest } from 'utils/appUtils';
import { adminStyles } from 'styles';


class CastingRequestDetail extends React.Component  {

  state = {
    castingRequest: null,
    castingRequestTalent: null,
    note: '',
    isLoading: false,
  };

  getInfoFromProps = (props) => {
    const { location } = props;
    let castingRequest = (location && location.state && location.state.castingRequest) ? location.state.castingRequest : null;
    let castingRequestTalent = (location && location.state && location.state.castingRequestTalent) ? location.state.castingRequestTalent : null;
    console.log('==== castingRequest, castingRequestTalent: ', castingRequest, castingRequestTalent);
    console.log('==== props: ', props);
    return { castingRequest, castingRequestTalent };
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({...this.getInfoFromProps(nextProps), isLoading: true});
  };

  renderContent() {
    const { classes } = this.props;
    const { castingRequest, castingRequestTalent, note } = this.state;
    let profileItemClassName = getProfileButtonClassNameByCastingRequest(castingRequest, classes);

    return (
      <Panel>
        { (castingRequest && castingRequestTalent) ? (
          <Grid container spacing={32} justify="center" alignItems="center">
            <Grid item xs={12}><Spacer size={30} /></Grid>
            <Grid lg={1} md={1} xs={12} />
            <Grid lg={4} md={4} xs={12} >
              <ProfileItem 
                profile={castingRequestTalent.talent}
                link={{
                  pathname: "/admin/edit-profiles/edit-profile", 
                  state: {profileId: castingRequestTalent.talent.id}
                }}
                className={profileItemClassName}
              />
              <Spacer size={24} />
              <CastingRequestOfferDetails castingRequest={castingRequest} castingRequestTalent={castingRequestTalent} />
            </Grid>
            <Grid lg={1} md={1} xs={12} ><Spacer size={15} /></Grid>
            <Grid lg={5} md={5} xs={12} >
              <img 
                src={require('assets/img/casting_talent_status_description.png')} 
                alt='casting_status_description'
                className={classes.adminNewProfilesApprovalImage}
              />
            </Grid>
            <Grid lg={1} md={1} xs={12} />

            <Grid item xs={12}><Spacer size={15} /></Grid>

            <Grid lg={1} md={1} xs={12} />
            <Grid item lg={10} md={10} xs={12}>
              <Button variant="contained" size="small" className={[classes.button, classes.adminAddNoteButton]}>
                <Typography className={classes.adminAddNoteButtonTitle}>
                  Add Note
                </Typography>
              </Button>
              <TextField
                id="outlined-bare"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                rows={8}
                rowsMax={8}
                multiline
                value={note}
                InputProps={{ readOnly: true }}
                fullWidth
              />
            </Grid>
            <Grid lg={1} md={1} xs={12} />

            <Grid item xs={12}><Spacer size={30} /></Grid>
          </Grid>
          ) : (
            <div>None</div>
          )
        }
        
      </Panel>
    );
  }

  render() {
    const { castingRequest } = this.state;
    return (
      <AdminForm
        formTitle="CASTING REQUEST"
        formSubTitle={ castingRequest ? `${castingRequest.name} ${moment(castingRequest.created).format(defaultValues.ADMIN_CASTING_REQUEST_TITLE_FORMAT)}` : '' }
        nextLink={{pathname: '/admin/casting-request', state: {castingRequest: castingRequest}}}
        nextButtonTitle={ castingRequest ? `${castingRequest.name} ${moment(castingRequest.created).format(defaultValues.ADMIN_CASTING_REQUEST_TITLE_FORMAT)}` : '' }
      >
        {this.renderContent()}
      </AdminForm>
    );
  }
}

export default withStyles(adminStyles)(CastingRequestDetail);
