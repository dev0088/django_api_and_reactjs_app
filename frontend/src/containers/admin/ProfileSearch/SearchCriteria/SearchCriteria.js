import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {
  makeTitleWithAllPositionTypes, getSexTitle, getAvatarFromTalentInfo, makeTalentNameWithTid
} from 'utils/appUtils';
import { adminStyles } from 'styles';

const conditionTypeData = [
  { key: 'talent_name', title: 'Profile Name', type: 'text' },
  { key: 'talent_tid', title: 'Profile TID', type: 'text' },
  { key: 'talent_id', title: 'Profile ID', type: 'text' },
  { key: 'talent_name_or_tid', title: 'Profile Name or TID', type: 'text' },
  { key: 'sexes', title: 'Gender', type: 'button' },
  { key: 'position_ids', title: 'Positions', type: 'button' },
  { key: 'position_sub_type_ids', title: 'Positions Sub Types', type: 'button' },
  { key: 'skill_ids', title: 'Skills', type: 'button' },
  { key: 'sub_skill_ids', title: 'Sub Skills', type: 'button' },
  { key: 'availability', title: 'Availability', type: 'button' },
  { key: 'ages', title: 'Ages', type: 'checkbox'},
  { key: 'heights', title: 'Heights', type: 'checkbox'},
  { key: 'languages', title: 'Languages', type: 'checkbox'},
  { key: 'ratings', title: 'Ratings', type: 'checkbox'}
];


class SearchCriteria extends Component {

  render() {
    const { condition, allPositionTypes, allSkills, classes } = this.props;
    console.log('===== SearchCriteria: condition: ', condition);
    if (condition) {
      return (
        <div>
          <Typography className={[classes.bold, classes.underlineText, classes.formSubTitle]}>
            { `Search Criteria` }
          </Typography>
          <div>
          {condition.sexes.map(gender => {
            return (
              <Button
                size="small"
                className={[classes.button, classes.adminSearchCriteriaPositionButton]}
              >
                <Typography className={classes.adminSearchCriteriaPositionButtonText}>
                  {`${getSexTitle(gender)}`}
                </Typography>
              </Button>
            )
          }) }
          </div>
          <div>
            {allPositionTypes && condition.position_ids.map(positionId => {
              let position = allPositionTypes.find(position => {
                return position.id === positionId;
              });

              return (
                <Button
                  size="small"
                  className={[classes.button, classes.adminSearchCriteriaPositionButton]}
                >
                  <Typography className={classes.adminSearchCriteriaPositionButtonText}>
                    { position.select_option_title }
                  </Typography>
                </Button>
              )
            }) }
          </div>
          <div>
            {allSkills && condition.skill_ids.map(skillId => {
              let skill = allSkills.find(skill => {
                return skill.id === skillId;
              });

              return (
                <Button
                  size="small"
                  className={[classes.button, classes.adminSearchCriteriaPositionButton]}
                >
                  <Typography className={classes.adminSearchCriteriaPositionButtonText}>
                    { skill.select_option_title }
                  </Typography>
                </Button>
              )
            }) }
          </div>
        </div>
      )
    }

    return <div/>
  }
}

export default withStyles(adminStyles)(SearchCriteria);