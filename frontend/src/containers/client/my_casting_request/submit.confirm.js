import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Spacer from "components/general/spacer";
import ClientForm from "components/shiptalent/forms/clientForm";
import styles from 'styles';
import '../client.css';

class CastingRequestSubmitConfirm extends Component {

  render() {
    const { classes } = this.props;

    return (
      <ClientForm
        nextLink="/client/home"
        nextButtonTitle="Back to My Home Page"
      >
        <Spacer size={100}/>
        <Typography
          align="center" component="h4" variant="h4" gutterBottom
          className={[classes.centerText, classes.bold]}
        >
          Thank you.
        </Typography>
        <Spacer size={50}/>
        <Typography
          align="center" component="h4" variant="h4" gutterBottom
          className={[classes.centerText, classes.bold]}
        >
          Your Casting Request has been submitted.
        </Typography>
        <Typography
          align="center" component="h4" variant="h4" gutterBottom
          className={[classes.centerText, classes.bold]}
        >
          A ShipTalent.com representative
        </Typography>
        <Typography
          align="center" component="h4" variant="h4" gutterBottom
          className={[classes.centerText, classes.bold]}
        >
          will be contracting you shortly to confirm
        </Typography>
        <Spacer size={100}/>
      </ClientForm>
    )
  }
}

export default (withStyles(styles)(CastingRequestSubmitConfirm));