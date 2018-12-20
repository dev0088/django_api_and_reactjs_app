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
    const { formTitle, formSubTitle, children,
      backLink, backButtonTitle, handleClickBackButton,
      nextLink, nextButtonTitle, handleClickNextButton,
      classes
    } = this.props;

    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={12} />
          <Grid item xs={12} >
            <Typography align="center" className={[classes.h4SmallMargin, classes.bold]}>
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
              handleClickBackButton={handleClickBackButton}
              nextLink={nextLink}
              nextButtonTitle={nextButtonTitle}
              nextButtonClass={classes.clientFormNextButton}
              handleClickNextButton={handleClickNextButton}
              direction="column"
            />
          </Grid>
        </Grid>

      </div>
    )
  }
}

export default (withStyles(styles)(ClientForm));
