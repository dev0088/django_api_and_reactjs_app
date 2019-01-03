import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import ClientForm from 'components/shiptalent/forms/clientForm';
import Panel from 'components/general/panel';
import Spacer from 'components/general/spacer';
import ClientAPI from 'apis/clientAPIs';
import styles from 'styles';


class BlockedProfileEdit extends Component {

  state = {
    expiration: 'month',
    talent: null,
    blockedProfile: null,
  };

  getInfoFromProps = (props) => {
    let res = {
      talent: null,
      blockedProfile: null,
      expiration: 'month'
    };

    if (this.props.location) {
      const locationState = props.location.state;
      res.talent = locationState.talent;
      res.blockedProfile = locationState.blockedProfile;
      if (res.blockedProfile) {
        res.talent = res.blockedProfile.talent;
        res.expiration = res.blockedProfile.description;
      }
    }

    return res;
  };

  componentWillMount() {
    this.setState({ ...this.getInfoFromProps(this.props) })
    // ClientAPI.getAllBlockedProfiles(this.handleAllBlockedProfilesResponse);
  }

  componentWillReceivedProps(nextProps) {
    this.setState({ ...this.getInfoFromProps(this.props) })
  }

  handleChange = event => {
    this.setState({ expiration: event.target.value });
  };

  handleClickBlock = () => {
    const { talent, expiration, blockedProfile } = this.state;
    let data = {
      talent: talent.id,
      description: expiration
    };
    if (blockedProfile) {
      data = {
        talent: blockedProfile.talent.id,
        description: expiration
      };
      ClientAPI.saveBlockedProfile(blockedProfile.id, data, this.handleBlockTalentResponse);
    } else if (talent) ClientAPI.blockTalent(data, this.handleBlockTalentResponse);
  };

  handleBlockTalentResponse = (response, isFailed) => {
    console.log('==== handleBlockTalentResponse: response: ', response);
    if(isFailed) {

    } else {
      this.props.history.push(
        '/client/block_profile/confirm',
        {talent: this.state.talent, expiration: this.state.expiration, blockedProfile: response});
    }
  };

  renderContent = () => {
    const { expiration } = this.state;
    const { classes } = this.props;

    return (
      <Panel title="Block Profile" bold={true} center={true} >
        <Grid container spacing={24} direction="column" justify="center" alignItems="center">
          <Grid item lg={10} md={10} sm={10} xs={10}>
            <Typography className={classes.wizardSettingSubTitle}>
              {"If you want to stop this talent from appearing in your search results, you may block this talent for however long you wish."}
            </Typography>
          </Grid>

          <Grid item lg={12} md={12} sm={10} xs={0}> <Spacer size={20}/> </Grid>

          <Grid item lg={10} md={10} sm={10} xs={10}>
            <FormControl component="fieldset">
              <FormLabel component="legend" className={classes.wizardSettingSubTitle}>Simply select an option below</FormLabel>
              <RadioGroup
                aria-label="expiration"
                name="expiration"
                value={expiration}
                onChange={this.handleChange}
                column
              >
                <FormControlLabel
                  value="hour"
                  control={<Radio color="primary" />}
                  label="Block for an hour"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="today"
                  control={<Radio color="primary" />}
                  label="Block for today"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="week"
                  control={<Radio color="primary" />}
                  label="Block for a week"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="month"
                  control={<Radio color="primary" />}
                  label="Block for a month"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="six_months"
                  control={<Radio color="primary" />}
                  label="Block for six months"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="forever"
                  control={<Radio color="primary" />}
                  label="Block for forever"
                  labelPlacement="end"
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item lg={10} md={10} sm={10} xs={10}>
            <Typography className={classes.wizardSettingSubTitle}>
              {"You may manage or remove your blocks in the My Blocked Profiles section of My HOme Page. Blocks that time-out will be removed b y the system automatically."}
            </Typography>
          </Grid>

          <Grid item lg={8} md={8} sm={8} xs={8} className={classes.talentProfileGuideButtonItem}>
            <Button
              variant="contained" color={'primary'}
              fullWidth={true}
              className={classes.clientTalentViewVideoButton}
              onClick={this.handleClickBlock}
            >
              <Typography className={classes.clientTalentViewVideoButtonText}>
                {"Block Talent"}
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Panel>
    )
  };

  render() {
    const { talent } = this.state;

    return (
      <ClientForm
        formTitle={talent ? `${talent.user.first_name} ${talent.user.last_name}` : '' }
        formSubTitle={talent ? talent.head_line : '' }
        nextLink="/client/home"
        nextButtonTitle="Cancel and return to Profile"
      >
        {this.renderContent()}
      </ClientForm>
    )
  }
}

export default withStyles(styles)(BlockedProfileEdit);