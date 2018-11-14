import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Panel from 'components/general/panel';
import Spacer from "../../../../components/general/spacer";
import TalentForm from 'components/shiptalent/forms/talentForm';
import * as talentActions from 'actions/talentActions';
import styles from 'styles';

class LastWizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: props.talentInfo && (props.talentInfo.sex === 'm') ?
        "Male" : "Female"
    }
  }

  getInfoFromProps(props) {
    const { talentInfo } = props
    if (talentInfo) {
      this.setState({
        gender: talentInfo.sex === 'm' ? "Male" : "Female"
      })
    }
  }

  componentWillMount() {
    this.props.talentActions.getCurrentTalentInfo()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.getInfoFromProps(nextProps)
    })
  }

  handleClickGenderButton = (type, val) =>  {
    this.setState({ [type]: val});
  }

  handleClickNextButton = () => {

  }

  handleNextResponse = (response, isFailed) => {
    console.log('==== response: ', response, isFailed)
  }

  renderContents() {
    const { classes } = this.props;
    return (
      <Panel title={"Build My Profile Wizard"}>

        <Typography align="center" component="h3" variant="h3" gutterBottom>
          {"Great."}
        </Typography>
        <Typography align="center" component="h3" variant="h3" gutterBottom>
          {"Now that we know what you do, "}
          <br/>
          {"let's get some more information."}
        </Typography>
        <br/>
        <Grid container spacing={40}>
          <Grid item xs />
            <Grid item xs={8} md={4} sm>
              <Link to='/contact-info'>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.selectedButton}
                  fullWidth={false}
                  onClick={() => this.handleClickGenderButton()}
                >
                  <Typography className={classes.selectedButtonTitle}>
                    {"Go to My Contact Info"}
                  </Typography>
                </Button>
              </Link>
            </Grid>
          <Grid item xs />

          <Grid item xs={12}>
            <Grid container justify="center" direction="column" alignItems="center" spacing={24}>
              <Grid item xl={6} md={8} xs={12}>
                <Paper elevation={1} className={classes.paperDescription}>
                  <Grid container direction="column" alignItems="center"  spacing={24}>
                    <Grid item xs={12}>
                      <Typography variant="title" align="center" colorTextPrimary>
                        {"From here, the wizard takes Talent through each section:"}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography align="center" variant="body1">
                        {"My Contact Info → My Nationality → My Languages → My Height, Weight & Age Range → My Medical → My Headline & Bio → My Resume → My Pictures → My Videos"}
                        <br/>
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12} sm />
            </Grid>
          </Grid>
        </Grid>

      </Panel>
    )
  }

  render() {
    return (
      <TalentForm
        formTitle="Build My Profile Wizard"
        backLink="/profile-wizard/welcome"
        backButtonTitle="Back"
        nextLink="/profile-wizard/select-position-sub-type"
        nextButtonTitle="Back to Primary Position (demo link only)"
        handleClickNextButton={this.handleClickNextButton}
        contents={this.renderContents()}
      />
    )
  }
}

function mapStateToProps(state) {
  const { auth, talentInfo } = state;
  return {
    auth: auth.access,
    talentInfo: talentInfo.value,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    talentActions: bindActionCreators(talentActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LastWizard));
