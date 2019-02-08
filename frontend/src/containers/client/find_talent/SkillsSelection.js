import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import SkillSelection from './SkillSelection';
import styles, { clientDesigns } from 'styles';


class SkillsSelection extends Component {

  renderSkills() {
    const { classes, skills, titleItem, loading, onChangeSkill, onChangeSubSkill } = this.props;
    let items = [];
    let titleItemName = titleItem ? titleItem : 'select_option_title';

    if (!skills || loading ) {
      return <CircularProgress className={classes.progress} />
    }

    for (let i = 0; i < skills.length; i ++) {
      let skill = skills[i];

      if (skill[titleItemName])
        items.push(
          <Grid
            item {...clientDesigns.talentSearch.PositionsTableItems}
            className={classes.clientTalentSearchGenderButtonItem}
          >
            <SkillSelection
              skill={skill}
              titleItem={titleItemName}
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
        <Grid item xs />
      </Grid>
    );
  }

}

export default withStyles(styles)(SkillsSelection);