import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Spacer from "components/general/spacer";
import Panel from 'components/general/panel';
import WizardSettingHeader from 'components/shiptalent/headers/wizardSettingHeader';
import TalentForm from 'components/shiptalent/forms/talentForm';
import * as talentActions from 'actions/talentActions';
import TalentAPI from 'apis/talentAPIs';
import { getPrefixByWord, findPositionTypeByName, filterWizardQuestionScenarioByPositionName } from 'utils/appUtils';
import styles from 'styles';

class SelectPositionTypeWizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allPositionTypes: [],
      selectedPositionType: null,
      positionWizardQuestions: []
    }
  }

  getInfoFromProps(props) {
    const { talentInfo, allPositionTypes, wizardQuestionScenario } = props
    let res = {
      allPositionTypes: [],
      selectedPositionType: null,
      positionWizardQuestions: []
    }

    if (talentInfo) {
      res.allPositionTypes = allPositionTypes ? allPositionTypes : []
      if (talentInfo.talent_position_types && talentInfo.talent_position_types.length > 0) {
        res.selectedPositionType =  talentInfo.talent_position_types[0].position_type
      } else if (talentInfo.talent_position_sub_types && talentInfo.talent_position_sub_types.length > 0 &&
                 talentInfo.talent_position_sub_types[0].position_sub_type) {
        res.selectedPositionType = talentInfo.talent_position_sub_types[0].position_sub_type.position_type
      }

      if (wizardQuestionScenario) {
        res.positionWizardQuestions = filterWizardQuestionScenarioByPositionName(
          wizardQuestionScenario, res.selectedPositionType)
      }
    }

    return res
  }

  componentWillMount() {
    this.props.talentActions.getAllPositionTypes()
    this.props.talentActions.getCurrentTalentInfo()
    this.props.talentActions.getWizardQuestionScenario()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.getInfoFromProps(nextProps)
    })
  }

  handleClickPositionTypeButton = (type, val) =>  {
    const { wizardQuestionScenario } = this.props

    let positionWizardQuestions = filterWizardQuestionScenarioByPositionName(
      wizardQuestionScenario, val)
    this.setState({
      [type]: val,
      positionWizardQuestions
    });
  }

  handleClickNextButton = () => {
    const { selectedPositionType } = this.state
    const { auth } = this.props

    let data = {
      talent_position_type: selectedPositionType,
    }

    TalentAPI.saveTalentInfo(auth.user_id, data, this.handleNextResponse)
  }

  handleNextResponse = (response, isFailed) => {
    console.log('==== response: ', response, isFailed)
    const { auth } = this.props
    this.props.talentActions.getCurrentTalentInfo(auth.user_id)
  }

  renderPositionButtons() {
    const { allPositionTypes, selectedPositionType } = this.state
    const { classes } = this.props
    let items = []

    if (allPositionTypes && allPositionTypes.length > 0) {
      for(let i = 0; i < allPositionTypes.length; i ++) {
        let positionType = allPositionTypes[i]

        if (!positionType.wizard_button_title) {
          continue
        }

        items.push(
          <Grid item lg={6} md={6} sm={6} xs={12} key={`position${i}`}
                className={classes.talentProfileGuideButtonItem}>
            <Button
              variant="contained"
              color="primary"
              className={
                positionType.name === selectedPositionType
                  ? classes.talentProfileGuideButtonSelected
                  : classes.talentProfileGuideButton
              }
              fullWidth={true}
              onClick={() => this.handleClickPositionTypeButton('selectedPositionType', positionType.name)}
            >
              <Typography className={classes.talentProfileGuideButtonTitle}>
                {positionType.wizard_button_title}
              </Typography>
            </Button>
          </Grid>
        )
      }
    }

    return (
      <Grid container spacing={16} >
        { items }
      </Grid>
    )
  }

  renderContents() {
    const { classes } = this.props;

    return (
      <Panel title={"Step 2"}>
        <WizardSettingHeader
          talentInfo={this.props.talentInfo}
          showSex={true}
          showPositionType={false}
          showSkill={false}
        />
        <Spacer size={15} />
        <Typography className={classes.wizardSettingSubTitle}>
          {"Next, tell us what your primary position is "}
        </Typography>
        <h5 align="center" className="profile-bio-description">
          {"(select one)"}
        </h5>
        <br/>

        <Grid container spacing={16} direction="row" justify="center" alignItems="center">
          <Grid item lg={3} md={2} sm={1} xs={2} />
          <Grid item lg={6} md={8} sm={10} xs={8} justify="center" alignItems="center">
            { this.renderPositionButtons() }
          </Grid>
          <Grid item lg={3} md={2} sm={1} xs={2} />
        </Grid>
      </Panel>
    )
  }

  render() {
    const { talentInfo, allPositionTypes, wizardQuestionScenario } = this.props
    const { selectedPositionType, positionWizardQuestions } = this.state
    let prevPositionType = {}
    let nextLink = "/profile-wizard/select-position-sub-type"

    if (talentInfo && allPositionTypes && selectedPositionType) {
      prevPositionType = findPositionTypeByName(allPositionTypes, selectedPositionType)
      if (prevPositionType && prevPositionType.multi_selection) {
        // nextLink = "/profile-wizard/select-multi-position-sub-type"
        nextLink = "/profile-wizard/select-multi-answer"
      }
    }
    let isLast = positionWizardQuestions.length === 0 ? true : false
    let currentScenarioStep = positionWizardQuestions[0]
    let nextPath = isLast ? "/profile-wizard/lastWizard" : "/profile-wizard/select-multi-answer"

    if (currentScenarioStep && currentScenarioStep.wizard_question) {
      nextPath = currentScenarioStep.wizard_question.multi_selection
        ? nextPath : "/profile-wizard/select-single-answer"
    }

    nextLink = {
      pathname: nextPath,
      state: {
        currentScenarioStep: currentScenarioStep,
        positionType: currentScenarioStep ? currentScenarioStep.position_type : null,
        currentIndex: 0,
        isFirst: true,
        isLast: isLast
      }
    }

    return (
      <TalentForm
        formTitle="Build My Profile Wizard"
        backLink="/profile-wizard/select-male"
        backButtonTitle="Back"
        nextLink={nextLink}
        nextButtonTitle="Next"
        handleClickNextButton={this.handleClickNextButton}
      >
        {this.renderContents()}
      </TalentForm>
    )
  }
}

function mapStateToProps(state) {
  const { auth, talentInfo, allPositionTypes, wizardQuestionScenario } = state;

  return {
    auth: auth.access,
    talentInfo: talentInfo.value,
    allPositionTypes: allPositionTypes.value,
    wizardQuestionScenario: wizardQuestionScenario.value
  }
}

function mapDispatchToProps(dispatch) {
  return {
    talentActions: bindActionCreators(talentActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SelectPositionTypeWizard));
