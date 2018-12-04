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
import { getPrefixByWord, findSkillByName } from 'utils/appUtils';
import styles from 'styles';

class SelectSkillTypeWizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allSkills: [],
      selectedSkill: null
    }
  }

  getInfoFromProps(props) {
    const { talentInfo, allSkills } = props
    let res = {
      allSkills: [],
      selectedSkill: null
    }

    if (talentInfo) {
      res.allSkills = allSkills ? allSkills : []
      if (talentInfo.talent_skills && talentInfo.talent_skills.length > 0) {
        res.selectedSkill =  talentInfo.talent_skills[0].skill
      } else if (talentInfo.talent_sub_skills && talentInfo.talent_sub_skills.length > 0 &&
        talentInfo.talent_sub_skills[0].sub_skill) {
        res.selectedSkill = talentInfo.talent_sub_skills[0].sub_skill.skill
      }
    }

    return res
  }

  componentDidMount() {
    this.props.talentActions.getAllSkills()
    this.props.talentActions.getCurrentTalentInfo()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.getInfoFromProps(nextProps)
    })
  }

  handleClickPositionTypeButton = (type, val) =>  {
    this.setState({ [type]: val});
  }

  handleClickNextButton = () => {
    const { selectedSkill } = this.state
    const { auth, talentInfo } = this.props
    console.log('==== selectedSkill: ', selectedSkill)
    let data = {
      talent_skills: [{name: selectedSkill}],
    }

    TalentAPI.saveTalentInfo(auth.user_id, data, this.handleNextResponse)
  }

  handleNextResponse = (response, isFailed) => {
    console.log('==== response: ', response, isFailed)
    const { auth } = this.props
    this.props.talentActions.getCurrentTalentInfo(auth.user_id)
  }

  renderSkillButtons() {
    const { allSkills, selectedSkill } = this.state
    const { classes } = this.props
    let items = []

    if (allSkills && allSkills.length > 0) {
      for(let i = 0; i < allSkills.length; i +=2) {
        let skill1 = allSkills[i]

        items.push(<Grid key={`item${i}-1`} item lg={3} md={2} sm={1} xs={12}/>)
        items.push(
          <Grid key={`item${i}-2`}
                item lg={3} md={4} sm={5} xs={12}
                className={classes.talentProfileGuideButtonItem}
          >
            <Button
              variant="contained"
              color="primary"
              className={
                skill1.name === selectedSkill
                  ? classes.talentProfileGuideButtonSelected
                  : classes.talentProfileGuideButton
              }
              fullWidth={true}
              onClick={() => this.handleClickPositionTypeButton('selectedSkill', skill1.name)}
            >
              <Typography className={classes.talentProfileGuideButtonTitle}>
                {`I am ${getPrefixByWord(skill1.name)} ${skill1.name}`}
              </Typography>
            </Button>
          </Grid>
        )

        if (allSkills[i + 1]) {
          let skill2 = allSkills[i + 1]

          items.push(
            <Grid key={`item${i}-3`}
                  item lg={3} md={4} sm={5} xs={12}
                  className={classes.talentProfileGuideButtonItem}
            >
              <Button
                variant="contained"
                color="primary"
                className={
                  skill2.name === selectedSkill
                    ? classes.talentProfileGuideButtonSelected
                    : classes.talentProfileGuideButton
                }
                fullWidth={true}
                onClick={() => this.handleClickPositionTypeButton('selectedSkill', skill2.name)}
              >
                <Typography className={classes.talentProfileGuideButtonTitle}>
                  {`I am ${getPrefixByWord(skill2.name)} ${skill2.name}`}
                </Typography>
              </Button>
            </Grid>
          )
        } else {
          items.push(<Grid key={`item${i}-3`} item lg={3} md={4} sm={5} xs={12}/>)
        }
        items.push(<Grid key={`item${i}-4`} item lg={3} md={2} sm={1} xs={12} />)
      }
      return items
    }

    return (<div/>)
  }

  renderContents() {
    const { classes } = this.props;

    return (
      <Panel title={"Step 4"}>
        <WizardSettingHeader
          talentInfo={this.props.talentInfo}
          showSex={true}
          showPositionType={true}
          showSkill={false}
        />
        <Spacer size={15} />
        <Typography className={classes.wizardSettingSubTitle}>
          {"Next, tell us what your primary skill is "}
        </Typography>
        <h5 align="center" className="profile-bio-description">
          {"(select one)"}
        </h5>
        <br/>

        <Grid container spacing={16} justify="center" alignItems="center">
          { this.renderSkillButtons() }
        </Grid>
      </Panel>
    )
  }

  render() {
    const { talentInfo, allSkills } = this.props
    const { selectedSkill } = this.state
    let prevSkill = {}
    let nextLink = "/profile-wizard/select-sub-skill"

    if (talentInfo && allSkills && selectedSkill) {
      prevSkill = findSkillByName(allSkills, selectedSkill)
      if (prevSkill && prevSkill.multi_selection) {
        nextLink = "/profile-wizard/select-multi-sub-skill"
      }
    }

    return (
      <TalentForm
        formTitle="Build My Profile Wizard"
        backLink="/profile-wizard/select-position-type"
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SelectSkillTypeWizard));
