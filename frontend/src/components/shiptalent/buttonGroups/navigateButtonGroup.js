import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import styles from 'styles';

class NavigateButtonGroup extends Component {

  render() {
    const {
      backLink, backButtonTitle, backButtonClass, handleClickBackButton,
      nextLink, nextButtonTitle, nextButtonClass, handleClickNextButton,
      classes
    } = this.props;

    return (
      <Grid container spacing={24}>
        <Grid item xs={5} md={5}>
          { backLink && (
            <Link to={backLink} onClick={handleClickBackButton}>
              <Button
                variant="contained"
                color="primary"
                className={backButtonClass}
              >
                {backButtonTitle ? backButtonTitle : 'Back'}
              </Button>
            </Link>
          )}
        </Grid>
        <Grid item xs={2} md={2} />
        <Grid item xs={5} md={5} className={classes.clientFormNextButtonContainerGridItem}>
          {nextLink && (
            <Link to={nextLink} onClick={handleClickNextButton}>
              <Button
                variant="contained"
                color="primary"
                primary={true}
                fullWidth={false}
                focusVisible={true}
                className={nextButtonClass}
              >
                {nextButtonTitle ? nextButtonTitle : 'Back'}
              </Button>
            </Link>
          )}
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(NavigateButtonGroup));
