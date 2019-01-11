import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SubSkillSelection from './SubSkillSelection'
import styles from 'styles';


class SubSkillsSelection extends Component {

  renderSubSkills() {
    const { classes, subSkills, onChangeSubSkill } = this.props;
    let items = [];

    for (let i = 0; i < subSkills.length; i ++) {
      let subSkill = subSkills[i];

      if (subSkill.select_option_title)
        items.push(
          <Grid
            item xl={6} lg={6} md={6} sm={6} xs={6}
            className={classes.clientTalentSearchGenderButtonItem}
            key={`subSkill-${subSkill.id}`}
          >
            <SubSkillSelection
              subSkill={subSkill}
              onChangeSubSkill={onChangeSubSkill}
            />
          </Grid>
        );
    }

    return items;
  }

  render() {
    return(
      <Grid container spacing={8} justify="flex-start" alignItems="center">
        { this.renderSubSkills() }
      </Grid>
    );
  }

}

export default withStyles(styles)(SubSkillsSelection);