import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import SkillSelection from './SkillSelection';
import { clientDesigns } from 'styles';
import { adminStyles } from 'styles';


class SkillsSelection extends Component {

  renderSkills() {
    const { classes, selectedSkills, selectedSubSkills, allSkills, titleItem, loading } = this.props;
    let items = [];
    let titleItemName = titleItem ? titleItem : 'select_option_title';

    if (loading ) {
      return <CircularProgress className={classes.progress} />
    }

    for (let i = 0; i < allSkills.length; i ++) {
      let skill = allSkills[i];
      let selected = false;
      if (selectedSkills)
        selected = selectedSkills.find(s => {
          return s.skill_id === skill.id;
        }) ? true : false;

      if (skill[titleItemName])
        items.push(
          // <Grid
          //   item {...clientDesigns.talentSearch.PositionsTableItems}
          //   className={classes.clientTalentSearchGenderButtonItem}
          // >
          
            <SkillSelection
              skill={skill}
              selectedSubSkills={selectedSubSkills}
              titleItem={titleItemName}
              selected={selected}
            />
          
          // </Grid>
        );
    }

    return items;
  }

  render() {
    const { classes } = this.props;
    return(
      // <Grid container spacing={16} direction="row" justify="flex-start" alignItems="flex-start">
      //   <Grid item xs>
        <div className={classes.adminTalentTitlePropertiesWrapper}>
          { this.renderSkills() }
        </div>
      //   </Grid>
      // </Grid>
    );
  }

}

export default withStyles(adminStyles)(SkillsSelection);