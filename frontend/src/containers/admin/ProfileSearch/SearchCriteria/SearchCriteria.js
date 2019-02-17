import React, {Component} from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import PositionCriteria from './PositionCriteria';
import SkillCriteria from './SkillCriteria';
import { getSexTitle, makeRatingSearchConditionTitle, makeHeightSearchConditionTitle } from 'utils/appUtils';
import defaultValues from 'constants/defaultValues';
import { adminStyles } from 'styles';


class SearchCriteria extends Component {

  renderTextCondition = (title, value) => {
    const { classes } = this.props;
    return value ? (
      <Typography className={classes.adminGeneralText}>
        { `${title}: ${value}` }
      </Typography>
    ) : (
      <div></div>
    );
  };

  renderCheckboxCondition = (name, title, value) => {
    return value ? (
      <FormControlLabel control={<Checkbox checked={true} value={name} color="primary" />} label={title} />
    ) : (
      <div></div>
    );
  };

  renderEtc = () => {
    const { condition } = this.props;
    const { is_available, not_available, is_active_cating_request, is_contracted, is_current_deployed } = condition;
    return (
      <Grid container spacing={0} justify="flex-start" alignItems="center">
        <Grid item lg={12} md={12} sm={12} xs={12} >
          <FormGroup column>
            { this.renderCheckboxCondition('isAvailable', 'Available',  is_available) }
            { this.renderCheckboxCondition('notAvailable', 'Not Available (Talent Calendar)', not_available) }
            { this.renderCheckboxCondition('isActiveCastingRequest', 'Active Casting Request', is_active_cating_request) }
            { this.renderCheckboxCondition('isContracted', 'Contracted', is_contracted) }
            { this.renderCheckboxCondition('isCurrentDeployed', 'Current Deployed', is_current_deployed) }
          </FormGroup>
        </Grid>
      </Grid>
    );
  };

  renderLanguage = () => {
    const { condition, classes } = this.props;
    const { languages } = condition;

    if (languages && languages.length > 0) {
      return (
        <Grid container spacing={16} justify="flex-start" alignItems="center">
          <Grid item lg={12} md={12} sm={12} xs={12} >
            <Typography className={classes.adminFormSubTitle}>
              {`Languages`}
            </Typography>
  
            <FormGroup row>
              { condition.languages.map((language) => {
                  return (
                    <FormControlLabel control={<Checkbox checked={true} value={language} color="primary" />} label={language} />
                  );
                })
              }
            </FormGroup>
          </Grid>
        </Grid>
      );
    }
    
    return <div></div>;
  };

  renderRatingRange = () => {
    const { condition, classes } = this.props;
    const { ratings } = condition;

    if (ratings && ratings.length > 0) {
      return (
        <Grid container spacing={16} justify="flex-start" alignItems="center">
          <Grid item lg={12} md={12} sm={12} xs={12} >
            <Typography className={classes.adminFormSubTitle}>
              {`Ratings`}
            </Typography>
  
            <FormGroup row>
              { ratings.map((ratingRange, index) => {
                  return <FormControlLabel control={<Checkbox checked={true} value={index} color="primary" />} label={makeRatingSearchConditionTitle(ratingRange)} />;
                })
              }
            </FormGroup>
          </Grid>
        </Grid>
      );
    }

    return <div></div>;
  };

  renderAvailable = () => {
    const { classes } = this.props;
    const { availability } = this.props.condition;

    if (availability.start_date || availability.end_date) {
      return (
        <Grid container spacing={16} justify="flex-start" alignItems="center">
          <Grid item lg={12} md={12} sm={12} xs={12} >
            <Typography className={classes.adminFormSubTitle}>
              {`Available`}
            </Typography>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12} >
            <Typography className={classNames(classes.descriptionText, classes.inlineText)}>
              {`Between: ${moment(availability.start_date).format(defaultValues.CASTING_REQUEST_TITLE_DATE_FORMAT)}    And: ${moment(availability.end_date).format(defaultValues.CASTING_REQUEST_TITLE_DATE_FORMAT)}`}
            </Typography>
          </Grid>
        </Grid>
      );
    }
    return <div></div>;
  };

  renderAgeRange = () => {
    const { classes } = this.props;
    const { ages } = this.props.condition;

    if (ages && ages.length > 0) {
      return (
        <Grid container spacing={16} justify="flex-start" alignItems="center">
          <Grid item lg={12} md={12} sm={12} xs={12} >
            <Typography className={classes.adminFormSubTitle}>
              {`Age ranges`}
            </Typography>
            <FormGroup row>
              { ages.map((age) => {
                  return (
                    <FormControlLabel control={ <Checkbox checked={true} value={age} color="primary" /> } label={age} />
                  );
                })
              }
            </FormGroup>
          </Grid>
        </Grid>
      );  
    }

    return <div></div>;
  };

  renderHeight = () => {
    const { classes } = this.props;
    const { heights } = this.props.condition;

    if (heights && heights.length > 0) {
      return (
        <Grid container spacing={16} justify="flex-start" alignItems="center">
          <Grid item lg={12} md={12} sm={12} xs={12} >
            <Typography className={classes.adminFormSubTitle}>
              {`Heights`}
            </Typography>

            <FormGroup row>
              { heights.map((heightRange, index) => {
                return <FormControlLabel control={ <Checkbox checked={true} value={index} color="primary" /> } label={makeHeightSearchConditionTitle(heightRange)} />;
              })
              }
            </FormGroup>
          </Grid>
        </Grid>
      );
    }

    return <div></div>;
  };


  render() {
    const { condition, allPositionTypes, allSkills, classes } = this.props;

    if (condition) {
      return (
        <div>
          <Typography className={classNames(classes.adminGeneralTitle, classes.bold, classes.underlineText)}>
            { `Search Criteria` }
          </Typography>
          { this.renderTextCondition('Talent name', condition.talent_name, classes) }
          { this.renderTextCondition('Talent TID', condition.talent_tid, classes) }
          <div>
          {condition.sexes.map(gender => {
            return (
              <Button size="small" className={classNames(classes.button, classes.adminSearchCriteriaPositionButton)}>
                <Typography className={classes.adminSearchCriteriaPositionButtonText}>
                  {getSexTitle(gender)}
                </Typography>
              </Button>
            )
          }) }
          </div>
          <PositionCriteria allPositionTypes={allPositionTypes} positionIds={condition.position_ids} />
          <SkillCriteria allSkills={allSkills} skillIds={condition.skill_ids} />
          { this.renderEtc() }
          { this.renderAvailable() }
          { this.renderLanguage() }
          { this.renderRatingRange() }
          { this.renderAgeRange() }
          { this.renderHeight() }
        </div>
      )
    }

    return <div/>
  }
}

export default withStyles(adminStyles)(SearchCriteria);