import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SubSkillsSelection from './SubSkillsSelection';
import styles from 'styles';


class SkillSelection extends Component {

  state = {
    selectedSkill: false
  };

  handleClickPositionButton = () => {
    const { selectedSkill } = this.state;
    const { skill, onChangeSkill } = this.props;

    this.setState({selectedSkill: !selectedSkill}, () => {
      if (onChangeSkill) onChangeSkill(skill.id);
    });
  };


  render() {
    const {classes, skill, onChangeSubSkill } = this.props;
    const {selectedSkill} = this.state;

    return(
      <Grid container spacing={8} justify="center" alignItems="flex-start">
        <Grid
          item xl={12} lg={12} md={12} sm={12} xs={12}
          className={classes.clientTalentSearchGenderButtonItem}
        >
          <Button
            color="primary"
            className={
              selectedSkill
                ? classes.clientTalentSearchGenderButtonSelected
                : classes.clientTalentSearchGenderButton
            }
            fullWidth={true}
            onClick={this.handleClickPositionButton}
          >
            <Typography className={classes.clientTalentSearchGenderButtonTitle}>
              {`${skill.name}`}
            </Typography>
          </Button>
        </Grid>
        <Grid
          item xl={12} lg={12} md={12} sm={12} xs={12}
          className={classes.clientTalentSearchGenderButtonItem}
        >
          <SubSkillsSelection
            subSkills={skill.sub_skills}
            onChangeSubSkill={onChangeSubSkill}
          />
        </Grid>
      </Grid>
    );
  }

}

export default withStyles(styles)(SkillSelection);