import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
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
  }

}

export default withStyles(adminStyles)(SkillSelection);