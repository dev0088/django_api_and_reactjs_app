import React, {Component} from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { adminStyles } from 'styles';

class SkillCriteria extends Component {

  render() {
    const { skillIds, allSkills, classes } = this.props;
    if (skillIds && allSkills) {
      return (
        <div>
        { skillIds.map(skillId => {
            let skill = allSkills.find(skill => {
                return skill.id === skillId;
            });

            return (
            <Button
                size="small"
                className={classNames(classes.button, classes.adminSearchCriteriaPositionButton)}
            >
                <Typography className={classes.adminSearchCriteriaPositionButtonText}>
                { skill.select_option_title }
                </Typography>
            </Button>
            )
        }) }
        </div>
      )
    }

    return <div/>
  }
}

export default withStyles(adminStyles)(SkillCriteria);