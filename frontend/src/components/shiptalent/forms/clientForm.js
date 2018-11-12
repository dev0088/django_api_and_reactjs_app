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
              className={classes.backButton}
              onClick={this.handleClickBackButton}
            >
              {backButtonTitle ? backButtonTitle : 'Back'}
            </Button>
          </Link>
        </Grid>
        <Grid item xs={4} md={4} />
        <Grid item xs={4} md={4} className={classes.nextButton}>
          <Link to={nextLink}>
            <Button
              variant="contained"
              color="primary"
              primary={true}
              fullWidth={false}
              focusVisible={true}
              className={classes.nextButton}
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

    // return (
    //   <div className="contact-info-view-container">
    //     {contents}
    //     <Row>
    //       <Col xs="4" md="4" className="pt-3 pt-md-3 profile-back-button-group-col">
    //         <Link to={backLink}>
    //           <RaisedButton
    //             label={backButtonTitle ? backButtonTitle : 'Back'}
    //             primary={true}
    //             onClick={this.handleClickBackButton}
    //           />
    //         </Link>
    //       </Col>
    //       <Col xs="4" md="4" className="pt-4 pt-md-4" />
    //       <Col xs="4" md="4" className="pt-3 pt-md-3 profile-save-button-group-col">
    //         <Link to={nextLink}>
    //           <RaisedButton
    //             label={nextButtonTitle ? nextButtonTitle : 'Next'}
    //             primary={true}
    //             onClick={this.handleClickNextButton}
    //           />
    //         </Link>
    //       </Col>
    //     </Row>
    //   </div>
    // )
  }
}

export default (withStyles(styles)(ClientForm));
