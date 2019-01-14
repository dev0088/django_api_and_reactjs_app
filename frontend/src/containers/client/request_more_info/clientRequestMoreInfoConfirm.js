import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Panel from 'components/general/panel';
import Spacer from 'components/general/spacer';
import ClientForm from 'components/shiptalent/forms/clientForm';
import styles from 'styles';


class ClientCommunityConfirm extends Component {

  render() {
    const { classes } = this.props;
    const { talent } = this.props.location.state;

    return (
      <ClientForm
        nextLink={{pathname: '/client/talent_view', state:{talentId: talent.id}}}
        nextButtonTitle="Back to Profile"
        talent={talent}
      >
        <Panel>
          <Grid container spacing={16} direction="column" justify="center" alignItems="center">

            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Spacer size={30} />
            </Grid>

            <Grid item lg={8} md={8} sm={10} xs={10}>
              <Typography className={[classes.clientFormSubTitle, classes.centerText]} >
                {'Thank you.'}
              </Typography>
            </Grid>

            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Spacer size={30} />
            </Grid>

            <Grid item lg={8} md={8} sm={10} xs={10}>
              <Typography className={[classes.clientFormSubTitle, classes.centerText]}>
                {'Your request for more information has been sent.'}
              </Typography>
              <Typography className={[classes.clientFormSubTitle, classes.centerText]}>
                {'A ShipTalent.com representative will get back to you shortly with the information you have requested.'}
              </Typography>
            </Grid>

            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Spacer size={30} />
            </Grid>

          </Grid>
        </Panel>
      </ClientForm>
    );
  }
}


export default withStyles(styles)(ClientCommunityConfirm);
