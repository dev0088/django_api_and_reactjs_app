import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Panel from 'components/general/panel';
import WizardSettingHeader from 'components/shiptalent/headers/wizardSettingHeader';
import ProfileWizardForm from 'components/shiptalent/forms/profileWizardForm';
import Spacer from 'components/general/spacer';
import * as talentActions from 'actions/talentActions';
import TalentAPI from 'apis/talentAPIs';
import {
  findPositionTypeByName,
  filterWizardQuestionScenarioByPosition,
  findAnswer
} from 'utils/appUtils';
import styles from 'styles';

class SelectSingleAnswerWizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      positionType: null,
      positionWizardQuestions: [],
      prevAnswer: null,
      selectedAnswer: null,
      singleSelectedAnswer: null,
      currentScenarioStep: {},
      currentIndex: 0,
      isFirst: false,
      isLast: false,
      prevScenarioStep: {},
      nextScenarioStep: {},
      backLink: {},
      nextLink: {}
    }
  }

  getInfoFromProps(props) {
    const {
      talentInfo,
      wizardQuestionScenario,
    } = props

    let res = {
      positionType: null,
      positionWizardQuestions: [],
      prevAnswer: null,
      selectedAnswer: null,
      singleSelectedAnswer: null,
      currentScenarioStep: {},
      currentIndex: 0,
      isFirst: false,
      isLast: false,
      prevScenarioStep: {},
      nextScenarioStep: {},
      backLink: {},
      nextLink: {}
    }

    if (wizardQuestionScenario) {
      if(props.location && props.location.state) {
        let propsState = props.location.state
        res.positionType = propsState.positionType
        res.currentScenarioStep = propsState.currentScenarioStep
        res.currentIndex = propsState.currentIndex

        if (res.positionType) {
          res.positionWizardQuestions = filterWizardQuestionScenarioByPosition(
            wizardQuestionScenario,
            res.positionType
          )
        }

        res.isFirst = (res.currentIndex === 0)
        res.isLast = (res.currentIndex === (res.positionWizardQuestions.length - 1))

        if (res.positionWizardQuestions.length > 0) {
          res.prevScenarioStep = res.positionWizardQuestions[res.isFirst ? 0 : (res.currentIndex - 1)]
          res.nextScenarioStep = res.positionWizardQuestions[res.isLast ? 0 : (res.currentIndex + 1)]

          res.backLink = {
            pathname: res.isFirst
              ? "/profile-wizard/select-male"
              : (res.prevScenarioStep.wizard_question.multi_selection
                ? "/profile-wizard/select-multi-answer"
                : "/profile-wizard/select-single-answer"),
            state: {
              currentScenarioStep: res.prevScenarioStep,
              currentIndex: res.isFirst ? 0 : (res.currentIndex - 1),
              positionType: res.isFirst ? {} : res.prevScenarioStep.position_type
            }
          }
          res.nextLink = {
            pathname: res.isLast
              ? "/profile-wizard/lastWizard"
              : (res.nextScenarioStep.wizard_question.multi_selection
                ? "/profile-wizard/select-multi-answer"
                : "/profile-wizard/select-single-answer"),
            state: {
              currentScenarioStep: res.nextScenarioStep,
              currentIndex: res.isLast ? 0 : (res.currentIndex + 1),
              positionType: res.isLast ? {} : res.nextScenarioStep.position_type
            }
          }
        }
      }
    }

    return {
      ...res
    }
  }

  componentDidMount() {
    this.props.talentActions.getAllPositionTypes()

    this.setState({
      ...this.getInfoFromProps(this.props)
    }, () => {
      this.props.talentActions.getCurrentTalentInfo()
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.getInfoFromProps(nextProps)
    })
  }

  handleClickAnswerButton = (type, val) =>  {
    const {
      currentScenarioStep, positionWizardQuestions,
      nextScenarioStep, nextLink, currentIndex, isLast
    } = this.state

    let answer = val
    let updatedNextLink = nextLink
    let updatedNextScenarioStep = nextScenarioStep

    if (answer.is_skippable && currentScenarioStep.skippable_step > 0) {
      let nextIndex = currentIndex + 1 + currentScenarioStep.skippable_step
      let isOverFlow = (isLast || nextIndex >= positionWizardQuestions.length)

      if (isOverFlow) {
        updatedNextScenarioStep = null
        updatedNextLink = { pathname: "/profile-wizard/lastWizard" }
      } else {
        updatedNextScenarioStep = positionWizardQuestions[nextIndex]
        updatedNextLink = {
          pathname: nextScenarioStep.wizard_question.multi_selection
                    ? "/profile-wizard/select-multi-answer"
                    : "/profile-wizard/select-single-answer",
          state: {
            currentScenarioStep: updatedNextScenarioStep,
            currentIndex: nextIndex,
            positionType: updatedNextScenarioStep.position_type
          }
        }
      }
    }

    this.setState({
      [type]: val,
      nextScenarioStep: updatedNextScenarioStep,
      nextLink: updatedNextLink
    });
  }

  handleClickNextButton = () => {
    const { positionType, singleSelectedAnswer } = this.state
    let data = {}

    if (singleSelectedAnswer) {
      if (singleSelectedAnswer.is_sub_skill) {
        data = {
          talent_skills: [{name: singleSelectedAnswer.sub_skill.skill.name}],
          talent_sub_skills: [{name: singleSelectedAnswer.sub_skill.name}],
        }
        TalentAPI.addTalentSkills(data, this.handleNextResponse)
      } else {
        data = {
          talent_position_type: positionType.name,
          talent_position_sub_types: [singleSelectedAnswer.position_sub_type.name]
        }
        TalentAPI.addTalentSubPositions(data, this.handleNextResponse)
      }
    }


  }

  handleNextResponse = (response, isFailed) => {
    console.log('==== response: ', response, isFailed)
    const { auth } = this.props
    this.props.talentActions.getCurrentTalentInfo(auth.user_id)
  }

  renderAnswerButtons() {
    const {
      singleSelectedAnswer,
      currentScenarioStep,
    } = this.state;
    const { classes } = this.props;
    let items = []

    if (currentScenarioStep && currentScenarioStep.wizard_question) {
      let wizard_question = currentScenarioStep.wizard_question
      let answers = wizard_question.wizard_question_answers

      for(let i = 0; i < answers.length; i ++) {
        let answer = answers[i]
        let title = ''
        if (answer.is_sub_skill) {
          title = answer.sub_skill.wizard_button_title
        } else {
          title = answer.position_sub_type
        }

        let btnClass = singleSelectedAnswer && (singleSelectedAnswer.id === answer.id)
          ? classes.talentProfileGuideButtonSelected
          : classes.talentProfileGuideButton

        items.push(
          <Grid item lg={6} md={6} sm={6} xs={12} key={`subPosition${i}`}
                className={classes.talentProfileGuideButtonItem}>
            <Button
              variant="contained"
              color="primary"
              className={ btnClass }
              fullWidth={true}
              onClick={() => this.handleClickAnswerButton(
                'singleSelectedAnswer', answer
              )}
            >
              <Typography className={classes.talentProfileGuideButtonTitle}>
                { title }
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
    const { singleSelectedAnswer, prevAnswer, currentScenarioStep } = this.state;
    const { classes } = this.props;
    let wizard_question = ''
    let questionTitle = ''
    let selection_title = ''

    if (currentScenarioStep && currentScenarioStep.wizard_question) {
      wizard_question = currentScenarioStep.wizard_question
      questionTitle = wizard_question.question
      selection_title = wizard_question.selection_title
    }

    return (
      <Panel title={""}>
        <WizardSettingHeader
          talentInfo={this.props.talentInfo}
          showSex={true}
          showPositionType={true}
          showSkill={false}
        />
        <Spacer size={15} />
        <Grid container className={classes.root} spacing={24}>
          <Grid item md={12}>
            <Typography className={classes.wizardSettingSubTitle}>
              { questionTitle }
            </Typography>
          </Grid>
          <Grid item md={12}>
            <h5 align="center" className="profile-bio-description">
              { selection_title }
            </h5>
          </Grid>
        </Grid>
        <Spacer size={15} />
        <Grid container spacing={16} direction="row" justify="center" alignItems="center">
          <Grid item lg={3} md={2} sm={1} xs={2} />
          <Grid item lg={6} md={8} sm={10} xs={8} >
            { this.renderAnswerButtons() }
          </Grid>
          <Grid item lg={3} md={2} sm={1} xs={2} />
        </Grid>
      </Panel>
    )
  }

  render() {
    const { backLink, nextLink } = this.state

    return (
      <ProfileWizardForm
        backLink={backLink}
        nextLink={nextLink}
        handleClickNextButton={this.handleClickNextButton}
      >
        { this.renderContents() }
      </ProfileWizardForm>
    )
  }
}

function mapStateToProps(state) {
  const { auth, talentInfo, wizardQuestionScenario } = state;

  return {
    auth: auth.access,
    talentInfo: talentInfo.value,
    wizardQuestionScenario: wizardQuestionScenario.value
  }
}

function mapDispatchToProps(dispatch) {
  return {
    talentActions: bindActionCreators(talentActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SelectSingleAnswerWizard));
