import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AdminTalentGenders from './adminTalentGenders';
import PositionsSelection from './adminTalentPositions/PositionsSelection';
import SkillsSelection from './adminTalentPositions/SkillsSelection';
import { makeTalentNameWithTid } from 'utils/appUtils';
import { adminStyles } from 'styles';


class AdminTalentTitle extends Component {
  render() {
    const { talent, showName, showGender, showPosition, allPositionTypes, allSkills, loading, classes } = this.props;

    return (
      <Grid container spacing={16} alignItems="center" justify="center">
        <Grid item lg={4} md={4} xs />
        <Grid item lg={4} md={4} xs={12}>
        { showName && 
          <Link to={{pathname: "/admin/edit-profiles/edit-profile", state: {profileId: talent.id}}}>
            <Button variant="contained" size="large" fullWidth className={[classes.button, classes.adminTalentViewButton]}>
              <Typography className={[classes.bold, classes.adminTalentViewButtonText]}>
                { makeTalentNameWithTid(talent)}
              </Typography>
            </Button>
          </Link>
        }  
        </Grid>
        <Grid item lg={4} md={4} xs>
        { showGender &&  <AdminTalentGenders sex={talent.sex} /> }
        </Grid>

        { showPosition && 
        <Grid item xs={12}>
          <Grid container spacing={0} direction="row" justify="center" alignItems="center">
            <Grid item lg md={12} xs={12}/>
            <Grid item lg md={12} xs={12}>
              <PositionsSelection 
                selectedPositions={talent.talent_position_types}
                selectedSubPositions={talent.talent_position_sub_types}
                allPositionTypes={allPositionTypes.value}
                titleItem={'agent_title'}
                loading={!allPositionTypes.isFetched} 
              />
            </Grid>
            <Grid item lg md={12} xs={12}>
              <SkillsSelection 
                selectedSkills={talent.talent_skills}
                selectedSubSkills={talent.talent_sub_skills}
                allSkills={allSkills.value}
                titleItem={'agent_title'}
                loading={!allSkills.isFetched} 
              />
            </Grid>
            <Grid item lg md={12} xs={12}/>
          </Grid>
        </Grid>
        }
      </Grid>
    )
  }
}

export default (withStyles(adminStyles)(AdminTalentTitle));