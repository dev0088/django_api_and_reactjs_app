import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Panel from 'components/general/panel';
import WizardSettingHeader from 'components/shiptalent/headers/wizardSettingHeader';
import TalentForm from 'components/shiptalent/forms/talentForm';
import Spacer from 'components/general/spacer';
import * as talentActions from 'actions/talentActions';
import TalentAPI from 'apis/talentAPIs';
import { findSkillByName } from 'utils/appUtils';
import styles from 'styles';

class SelectSubSkillWizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allSkills: [],
      prevSkill: null,
      selectedSkill: null,
      singleSelectedSubSkill: null,
    }
  }

  getInfoFromProps(props) {
    const { talentInfo, allSkills } = props
    let res = {
      allSkills: [],
      prevSkill: null,
      selectedSkill: null,
      singleSelectedSubSkill: null
    }

    if (talentInfo) {
      res.allSkills = allSkills ? allSkills : []
      if (talentInfo.talent_skills && talentInfo.talent_skills.length > 0) {
        res.selectedSkill =  talentInfo.talent_skills[0].skill
      }

      res.prevSkill = findSkillByName(res.allSkills, res.selectedSkill)

      if (talentInfo.talent_sub_skills &&
        talentInfo.talent_sub_skills.length > 0 &&
        talentInfo.talent_sub_skills[0].sub_skill) {
        res.singleSelectedSubSkill = talentInfo.talent_sub_skills[0].sub_skill.name
      }
    }

    return res
  }

  componentDidMount() {
    this.props.talentActions.getAllSkills()

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

  handleClickPositionSubTypeButton = (type, val) =>  {
    this.setState({ [type]: val});
  }

  handleClickNextButton = () => {
    const { selectedSkill, singleSelectedSubSkill } = this.state
    const { auth } = this.props

    let data = {
      talent_skills: [{name: selectedSkill}],
      talent_sub_skills: [{name: singleSelectedSubSkill}],
    }

    TalentAPI.saveTalentInfo(auth.user_id, data, this.handleNextResponse)
  }

  handleNextResponse = (response, isFailed) => {
    console.log('==== response: ', response, isFailed)
    const { auth } = this.props
    this.props.talentActions.getCurrentTalentInfo(auth.user_id)
  }

  renderSubPositionButtons() {
    const { singleSelectedSubSkill, prevSkill } = this.state;
    const { classes } = this.props;
    let items = []

    if (prevSkill && prevSkill.sub_skills) {
      let sub_skills = prevSkill.sub_skills
      for(let i = 0; i < sub_skills.length; i ++) {
        if (!sub_skills[i].wizard_button_title) {
          continue
        }
        let subSkill1 = sub_skills[i].name

        // items.push(<Grid item lg={3} md={2} sm={1} xs={12} key={`subSkill${i}-1`} />)
        items.push(
          <Grid item lg={6} md={6} sm={6} xs={12} key={`subSkill${i}`}
                className={classes.talentProfileGuideButtonItem}>
            <Button
              variant="contained"
              color="primary"
              className={
                subSkill1 === singleSelectedSubSkill
                  ? classes.talentProfileGuideButtonSelected
                  : classes.talentProfileGuideButton
              }
              fullWidth={true}
              onClick={() => this.handleClickPositionSubTypeButton(
                'singleSelectedSubSkill', subSkill1
              )}
            >
              <Typography className={classes.talentProfileGuideButtonTitle}>
                { subSkill1 }
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
    const { singleSelectedSubSkill, prevSkill } = this.state;
    const { classes } = this.props;

    return (
      <Panel title={"Step 3"}>
        <WizardSettingHeader
          talentInfo={this.props.talentInfo}
          showSex={true}
          showPositionType={true}
          showSkill={false}
        />
        <Spacer size={15} />
        <Grid container className={classes.root} direction="column"  justify="center" alignItems="center" spacing={24}>
          <Grid item md={12}>
            <Typography className={classes.wizardSettingSubTitle}>
              {prevSkill && (prevSkill.question ? prevSkill.question : '')}
            </Typography>
          </Grid>
          <Grid item md={12}>
            <h5 align="center" className="profile-bio-description">
              {
                prevSkill && (prevSkill.multi_selection
                  ? "(select all that apply)"
                  : "(select one)")
              }
            </h5>
          </Grid>
        </Grid>
        <Spacer size={15} />
        <Grid container spacing={16} direction="row" justify="center" alignItems="center">
          <Grid item lg={3} md={2} sm={1} xs={2} />
          <Grid item lg={6} md={8} sm={10} xs={8} >
            { this.renderSubPositionButtons() }
          </Grid>
          <Grid item lg={3} md={2} sm={1} xs={2} />
        </Grid>
      </Panel>
    )
  }

  render() {
    return (
      <TalentForm
        backLink="/profile-wizard/select-skill"
        nextLink="/profile-wizard/lastWizard"
        handleClickNextButton={this.handleClickNextButton}
      >
        {this.renderContents()}
      </TalentForm>
    )
  }
}

function mapStateToProps(state) {
  const { auth, talentInfo, allSkills } = state;

  return {
    auth: auth.access,
    talentInfo: talentInfo.value,
    allSkills: allSkills.value
  }
}

function mapDispatchToProps(dispatch) {
  return {
    talentActions: bindActionCreators(talentActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SelectSubSkillWizard));
