import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SubSkillsSelection from './SubSkillsSelection';
import PropertyButton from './PropertyButton';
import { adminStyles } from 'styles';


class SkillSelection extends Component {

  render() {
    const {classes, skill, selectedSubSkills, titleItem, selected } = this.props;

    return(
      <div style={{display: 'block'}}>
        <PropertyButton title={skill[titleItem]} selected={selected} />
        <SubSkillsSelection
          allSubSkills={skill.sub_skills}
          selectedSubSkills={selectedSubSkills}
          titleItem={'abbreviated_key'}
        />
      </div>
    );

    // return(
    //   <div style={{display: 'block'}}>
    //   <Grid container spacing={8} direction="row" justify="center" alignItems="flex-start">
    //     <Grid
    //       item xl={12} lg={12} md={12} sm={12} xs={12}
    //       className={classes.clientTalentSearchGenderButtonItem}
    //     >
    //       <PropertyButton title={skill[titleItem]} selected={selected} />
    //     </Grid>
    //     <Grid
    //       item xl={12} lg={12} md={12} sm={12} xs={12}
    //       className={classes.clientTalentSearchGenderButtonItem}
    //     >
    //       <SubSkillsSelection
    //         allSubSkills={skill.sub_skills}
    //         selectedSubSkills={selectedSubSkills}
    //         titleItem={'abbreviated_key'}
    //       />
    //     </Grid>
    //   </Grid>
    //   </div>
    // );
  }

}

export default withStyles(adminStyles)(SkillSelection);