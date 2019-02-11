import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SubSkillSelection from './SubSkillSelection'
import { adminStyles } from 'styles';


class SubSkillsSelection extends Component {

  renderSubSkills() {
    const { selectedSubSkills, allSubSkills, titleItem } = this.props;
    let items = [];

    for (let i = 0; i < allSubSkills.length; i ++) {
      let subSkill = allSubSkills[i];
      let selected = false;
      if (selectedSubSkills)
        selected = selectedSubSkills.find(s => {
          return s.sub_skill.id === subSkill.id;
        }) ? true : false;

      let newTitleItem = subSkill[titleItem] ? titleItem : 'select_option_title';
      
      if (subSkill[newTitleItem])
        items.push(
          // <Grid
          //   item xl={6} lg={6} md={6} sm={6} xs={6}
          //   className={classes.clientTalentSearchGenderButtonItem}
          //   key={`subSkill-${subSkill.id}`}
          // >
            <SubSkillSelection
              subSkill={subSkill}
              titleItem={newTitleItem}
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
      // <Grid container spacing={0} justify="center" alignItems="center">
        <div className={classes.adminTalentTitleSubPropertiesWrapper}>
          { this.renderSubSkills() }
        </div>
      // </Grid>
    );
  }

}

export default withStyles(adminStyles)(SubSkillsSelection);