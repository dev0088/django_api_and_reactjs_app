import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import NavigateButtonGroup from 'components/shiptalent/buttonGroups/navigateButtonGroup';
import styles from 'styles';

class ClientForm extends Component {

  handleClickBackButton = () => {
    const { handleClickBackButton } = this.props;
    if(handleClickBackButton) {
      handleClickBackButton()
    }
  };

  handleClickNextButton = () => {
    const { handleClickNextButton } = this.props;
    if(handleClickNextButton) {
      handleClickNextButton()
    }
  };

  render() {
    const { formTitle, formSubTitle, children, backLink, nextLink, backButtonTitle, nextButtonTitle, classes } = this.props;
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={12} />
          <Grid item xs={12} >
            <Typography align="center" component="h4" variant="h4" gutterBottom>
              {formTitle}
            </Typography>
            <Typography align="center" className={classes.clientFormSubTitle}>
              {formSubTitle}
            </Typography>
          </Grid>

          <Grid item xs={12} >
            {children}
          </Grid>

          <Grid item xs={12} >
            <NavigateButtonGroup
              backLink={backLink}
              backButtonTitle={backButtonTitle}
              backButtonClass={classes.clientFormBackButton}
              nextLink={nextLink}
              nextButtonTitle={nextButtonTitle}
              nextButtonClass={classes.clientFormNextButton}
            />
          </Grid>
        </Grid>

      </div>
    )
  }
}

export default (withStyles(styles)(ClientForm));
