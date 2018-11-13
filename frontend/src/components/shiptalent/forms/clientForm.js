import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
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

  renderBottomButtons() {
    const { backLink, nextLink, backButtonTitle, nextButtonTitle, classes } = this.props;
    return (
      <Grid container spacing={24}>
        <Grid item xs={4} md={4}>
          <Link to={backLink}>
            <Button
              variant="contained"
              color="primary"
              className={classes.clientFormBackButton}
              onClick={this.handleClickBackButton}
            >
              {backButtonTitle ? backButtonTitle : 'Back'}
            </Button>
          </Link>
        </Grid>
        <Grid item xs={4} md={4} />
        <Grid item xs={4} md={4} className={classes.clientFormNextButtonContainerGrid}>
          <Link to={nextLink}>
            <Button
              variant="contained"
              color="primary"
              primary={true}
              fullWidth={false}
              focusVisible={true}
              className={classes.clientFormNextButton}
              onClick={this.handleClickNextButton}
            >
              {nextButtonTitle ? nextButtonTitle : 'Back'}
            </Button>
          </Link>
        </Grid>
      </Grid>
    )
  }

  render() {
    const { formTitle, formSubTitle, contents, classes } = this.props;
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={12} />
          <Grid item xs={12} >
            <Typography align="center" component="h3" variant="h3" gutterBottom>
              {formTitle}
            </Typography>
            <Typography align="center" className={classes.clientFormSubTitle}>
              {formSubTitle}
            </Typography>
          </Grid>

          <Grid item xs={12} >
            {contents}
          </Grid>

          <Grid item xs={12} >
            {this.renderBottomButtons()}
          </Grid>
        </Grid>

      </div>
    )
  }
}

export default (withStyles(styles)(ClientForm));
