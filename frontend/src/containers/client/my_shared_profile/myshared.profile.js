import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ClientForm from 'components/shiptalent/forms/clientForm';
import Panel from 'components/general/panel';
import ColumnButton from 'components/shiptalent/buttons/columnButton';
import Spacer from "components/general/spacer";
import ClientAPI from 'apis/clientAPIs';
import styles from 'styles';


class MySharedProfile extends Component {

  state = {
    castingRequestTalents: []
  };

  componentWillMount() {
    ClientAPI.getAllCompletedCastingRequestTalent(this.handleResponse);
  }

  handleResponse = (response, isFailed) => {
    console.log('==== Completed CastingRequestTalent: response: ', response);
    if(isFailed) {

    } else {
      this.setState({castingRequestTalents: response});
    }
  };

  render() {
    const { classes } = this.props;
    return(
      <ClientForm
        formTitle="My Shared Profiles"
        nextLink="/client/home"
        nextButtonTitle="Back to My Home Page"
      >
        <Grid container spacing={40} direction="column" justify="center" alignItems="center">
          <Panel>
            <Grid container spacing={40} direction="column" justify="center" alignItems="center">
              <Grid item xs={12} >
                <Spacer size={10} />
              </Grid>
              <ColumnButton
                link = {'/client/talent_shared'}
                itemClass = {classes.clientTalentViewVideoButtonGridItem}
                buttonClass = {classes.clientTalentViewVideoButton}
                title = {"View Talent You Have Shared"}
                titleClass = {classes.clientTalentViewVideoButtonText}
                xs = {12}
                fullWidth = {true}
              />
              <ColumnButton
                link = {'/client/talent_shared_by'}
                itemClass = {classes.clientTalentViewVideoButtonGridItem}
                buttonClass = {classes.clientTalentViewVideoButton}
                title = {"View My Casting Requests"}
                titleClass = {classes.clientTalentViewVideoButtonText}
                xs = {12}
                fullWidth = {true}
              />
              <ColumnButton
                link = {'/client/talent_shared_team'}
                itemClass = {classes.clientTalentViewVideoButtonGridItem}
                buttonClass = {classes.clientTalentViewVideoButton}
                title = {"View Shared Talent by Team Member"}
                titleClass = {classes.clientTalentViewVideoButtonText}
                xs = {12}
                fullWidth = {true}
              />
              <Grid item xs={12} >
                <Spacer size={50} />
              </Grid>
            </Grid>
          </Panel>
        </Grid>
      </ClientForm>
    );
  }
}


export default withStyles(styles)(MySharedProfile);