import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import NavigateButtonGroup from 'components/shiptalent/buttonGroups/navigateButtonGroup';
import ClientTalentTitle from './clientTalentTitle';
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
    const {
      formTitle,
      formSubTitle, formSubTitleClass,
      children,
      backLink, backButtonTitle, handleClickBackButton,
      nextLink, nextButtonTitle, handleClickNextButton,
      talent, formClassName, classes
    } = this.props;
    let formStyle = formClassName ? {className: formClassName} : {}

    return (
      <div {...formStyle}>
        <Grid container spacing={16}>
          <Grid item xs={12} />
          <Grid item xs={12} >
            { talent && <ClientTalentTitle talent={talent} /> }
          </Grid>
          <Grid item xs={12} >
            <Typography
              align="center"
              className={[classes.h4SmallMargin, classes.bold]}
            >
              {formTitle}
            </Typography>
            <Typography
              align="center"
              className={
                formSubTitleClass
                ? [classes.clientFormSubTitle, formSubTitleClass]
                : classes.clientFormSubTitle
              }
            >
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
