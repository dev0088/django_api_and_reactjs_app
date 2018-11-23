import React, {Component} from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Panel from 'components/general/panel';
import TalentForm from 'components/shiptalent/forms/talentForm';
import defaultValues from 'constants/defaultValues';
import * as talentActions from 'actions/talentActions';
import TalentAPI from 'apis/talentAPIs';
import styles from 'styles';

class SelectMaleWizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: props.talentInfo && (props.talentInfo.sex === 'm')
              ? "Male" : "Female"
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
		const { gender } = this.state
		const { auth } = this.props

    let data = {
      sex: gender === "Male" ? "m" : "f",
    }

    TalentAPI.saveTalentInfo(auth.user_id, data, this.handleNextResponse)
	}

	handleNextResponse = (response, isFailed) => {
    console.log('==== response: ', response, isFailed)
  };

  renderGenderButtons() {
    const { classes } = this.props
    let items = []
    for (let i = 0; i < defaultValues.GENDERS.length; i ++) {
      let gender = defaultValues.GENDERS[i]
      items.push(<Grid item lg={5} md={5} sm={4} xs={3} />)
      items.push(
        <Grid item lg={2} md={2} sm={4} xs={6}
              className={classes.talentProfileGuideButtonItem}
        >
          <Button
            variant="contained"
            color="primary"
            className={
              gender === this.state.gender
                ? classes.talentProfileGuideButtonSelected
                : classes.talentProfileGuideButton
            }
            fullWidth={true}
            onClick={() => this.handleClickGenderButton('gender', gender)}
          >
            <Typography className={classes.talentProfileGuideButtonTitle}>
              {`I am a ${gender}`}
            </Typography>
          </Button>
        </Grid>
      )
      items.push(<Grid item lg={5} md={5} sm={4} xs={3} />)
    }

    return items
  }

  renderContents() {
    const { classes } = this.props;

    return (
      <Panel title={"Step 1"}>
        <Typography className={classes.wizardSettingSubTitle}>
          {"First, tell us if you are Male or Female"}
        </Typography>
        <h5 align="center" className="profile-bio-description">
          {"(select one)"}
        </h5>
        <br/>
        <Grid container spacing={16} justify="center" alignItems="center">
        {
          this.renderGenderButtons()
        }

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
        nextLink="/profile-wizard/select-position-type"
        nextButtonTitle="Next"
        handleClickNextButton={this.handleClickNextButton}
      >
        {this.renderContents()}
      </TalentForm>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SelectMaleWizard));
