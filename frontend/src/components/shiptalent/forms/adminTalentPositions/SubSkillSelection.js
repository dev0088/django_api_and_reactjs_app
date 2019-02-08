import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import SubPropertyButton from './SubPropertyButton';
import { adminStyles } from 'styles';


class SubSkillSelection extends Component {
  render() {
    const {subSkill, selected, titleItem} = this.props;
    return(
      <SubPropertyButton title={subSkill[titleItem][0] } selected={selected} />
    );
  }

}

export default withStyles(adminStyles)(SubSkillSelection);