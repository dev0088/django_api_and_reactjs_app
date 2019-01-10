import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import SkillSelection from './SkillSelection';
import styles, { clientDesigns } from 'styles';


class SkillsSelection extends Component {

  renderSkills() {
    const { classes, skills, loading, onChangeSkill, onChangeSubSkill } = this.props;
    let items = [];

    if (!skills || loading ) {
      return <CircularProgress className={classes.progress} />
    }

    for (let i = 0; i < skills.length; i ++) {
      let skill = skills[i];

      if (skill.select_option_title)
        items.push(
          <Grid
            item {...clientDesigns.talentSearch.PositionsTableItems}
            className={classes.clientTalentSearchGenderButtonItem}
          >
            <SkillSelection
              skill={skill}
              onChangeSkill={onChangeSkill}
              onChangeSubSkill={onChangeSubSkill}
            />
          </Grid>
        );
    }

    return items;
  }

  render() {
    return(
      <Grid container spacing={16} direction="row" justify="flex-start" alignItems="flex-start">
        { this.renderSkills() }
      </Grid>
    );
  }

}

export default withStyles(styles)(SkillsSelection);