import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { getSexTitle } from 'utils/appUtils';
import { styles } from 'styles';

class WizardSettingHeader extends Component {

  renderOnlyPositionButton(position_type, classes) {
    return (
      <Grid container spacing={24}>
        <Grid item lg={1} md={2} sm={3} xs={3} >
          <Typography variant="subtitle1" className={classes.wizardSettingHeaderTitle}>
            {"Who is a: "}
          </Typography>
        </Grid>
        <Grid item wrap-xs-nowrap={true} lg={11} md={10} sm={9} xs={9} >
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.wizardSettingHeaderButton}
            fullWidth={false}
          >
            <Typography className={classes.wizardSettingHeaderText}>
              {position_type}
            </Typography>
          </Button>
        </Grid>
      </Grid>
    )
  }

  renderPositionSubTypesButtons(position_type, position_sub_types, classes) {
    let buttonItems = []

    for (let i = 0; i < position_sub_types.length; i++) {
      let position_sub_type = position_sub_types[i].position_sub_type

      buttonItems.push(
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={classes.wizardSettingHeaderButton}
          fullWidth={false}
          key={`subPositionTypeButton${i}`}
        >
          <Typography className={classes.wizardSettingHeaderText}>
            {`${position_sub_type.position_type}: ${position_sub_type.name}`}
          </Typography>
        </Button>
      )
    }

    return (
      <Grid container spacing={24}>
        <Grid item lg={1} md={2} sm={3} xs={3} >
          <Typography variant="subtitle1" className={classes.wizardSettingHeaderTitle}>
            {"Who is a: "}
          </Typography>
        </Grid>
        <Grid item wrap-xs-nowrap={true} lg={11} md={10} sm={9} xs={9}
              className={classes.wizardSettingHeaderButtonsGroupGridItem}
        >
          {buttonItems}
        </Grid>
      </Grid>
    )
  }

  renderOnlySkillButton(skill, classes) {
    return (
      <Grid container spacing={24}>
        <Grid item lg={1} md={2} sm={3} xs={3} >
          <Typography variant="subtitle1" className={classes.wizardSettingHeaderTitle}>
            {"Who also: "}
          </Typography>
        </Grid>
        <Grid item wrap-xs-nowrap={true} lg={11} md={10} sm={9} xs={9} >
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.wizardSettingHeaderButton}
            fullWidth={false}
          >
            <Typography className={classes.wizardSettingHeaderText}>
              {skill}
            </Typography>
          </Button>
        </Grid>
      </Grid>
    )
  }


  renderSubSkillsButtons(sub_skills, classes) {
    let buttonItems = []

    for (let i = 0; i < sub_skills.length; i++) {
      let sub_skill = sub_skills[i].sub_skill
      buttonItems.push(
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={classes.wizardSettingHeaderButton}
          fullWidth={false}
          key={`subSkillButton${i}`}
        >
          <Typography className={classes.wizardSettingHeaderText}>
            {`${sub_skill.skill}: ${sub_skill.name}`}
          </Typography>
        </Button>
      )
    }

    return (
      <Grid container spacing={24}>
        <Grid item lg={1} md={2} sm={3} xs={3} >
          <Typography variant="subtitle1" className={classes.wizardSettingHeaderTitle}>
            {"Who also: "}
          </Typography>
        </Grid>
        <Grid item wrap-xs-nowrap={true} lg={11} md={10} sm={9} xs={9}
              className={classes.wizardSettingHeaderButtonsGroupGridItem}
        >
          {buttonItems}
        </Grid>
      </Grid>
    )
  }

  renderSexButtons() {
    const { talentInfo, classes } = this.props;
    let sexTitle = ''
    if (talentInfo) {
      sexTitle = getSexTitle(talentInfo.sex)
    }

    return (
      <Grid container spacing={24}>
        <Grid wrap-xs-nowrap={true} item lg={1} md={2} sm={3} xs={3} >
          <Typography variant="subtitle1" className={classes.wizardSettingHeaderTitle}>
            {"I am a: "}
          </Typography>
        </Grid>
        <Grid wrap-xs-nowrap={true} item lg={11} md={10} sm={9} xs={9} >
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.wizardSettingHeaderButton}
            fullWidth={false}
          >
            <Typography className={classes.wizardSettingHeaderText}>
              {sexTitle}
            </Typography>
          </Button>
        </Grid>
      </Grid>
    )
  }

  renderPositionButtons() {
    const { talentInfo, classes } = this.props;
    let position_type = ''
    let position_sub_types = []

    if (talentInfo && talentInfo.talent_position_types[0]) {
      position_type = talentInfo.talent_position_types[0].position_type
      position_sub_types = talentInfo.talent_position_sub_types
    }

    if (position_sub_types.length === 0) {
      return this.renderOnlyPositionButton(position_type, classes)
    }

    return this.renderPositionSubTypesButtons(position_type, position_sub_types, classes)
  }

  renderSkillButtons() {
    const { talentInfo, classes } = this.props;
    let skill = ''
    let sub_skills = []

    if (talentInfo && talentInfo.talent_skills[0]) {
      skill = talentInfo.talent_skills[0].skill
      sub_skills = talentInfo.talent_sub_skills
    }

    if (sub_skills.length === 0) {
      return this.renderOnlySkillButton(skill, classes)
    }
    return this.renderSubSkillsButtons(sub_skills, classes)
  }

  render() {
    const {
      showSex, showPositionType, showSkill
    } = this.props;

    return (
      <Grid container spacing={8}>
        <Grid item md={12}>
          { showSex && this.renderSexButtons()}
        </Grid>
        <Grid item md={12}>
          { showPositionType && this.renderPositionButtons()}
        </Grid>
        <Grid item md={12}>
          { showSkill && this.renderSkillButtons()}
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles, { withTheme: true })(WizardSettingHeader);