import React, {Component} from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Panel from 'components/general/panel';
import TalentForm from 'components/shiptalent/forms/talentForm';
import Spacer from "components/general/spacer";
import styles from 'styles';
import './welcomeBuildProfileWizard.css';


class WelcomeBuildProfileWizard extends Component {
  constructor(props) {
    super(props);
  }

  renderContents() {
    const { classes } = this.props;
    return (
      <Panel title={"Welcome"}>
        <Typography className={classes.wizardSettingSubTitle}>
          {"Welcome to the Build My Profile Wizard."}
        </Typography>
        <Typography className={classes.wizardSettingSubTitle}>
          {"In this section, we will build your profile one step at a time."}
        </Typography>

        <Spacer size={40}/>

        <Grid container direction="column" justify="center" alignItems="center" spacing={24}>
          <Grid item md={12}>
            <Link to="/profile-wizard/select-male">
              <Button variant="contained"  color="primary" className={classes.talentProfileGuideButton}>
                <Typography className={classes.talentProfileGuideButtonTitle}>
                  {"Let's Build My Profile"}
                </Typography>
              </Button>
            </Link>
          </Grid>
        </Grid>

        <Spacer size={20}/>

      </Panel>
    )
  }

  render() {
    return (
      <TalentForm
        formTitle="Build My Profile Wizard"
        backLink="/my-profile"
        backButtonTitle="Back"
      >
        {this.renderContents()}
      </TalentForm>
  	)
  }
}

export default withStyles(styles)(WelcomeBuildProfileWizard);
