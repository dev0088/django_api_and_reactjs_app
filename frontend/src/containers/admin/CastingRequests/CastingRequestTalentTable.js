import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ProfileItem from 'containers/admin/ProfileSearch/ProfileItem';
import { getProfileButtonClassNameByCastingRequest } from 'utils/appUtils';
import { adminStyles } from 'styles';


class CastingRequestTalentTable extends Component {
  render() {
    const { castinRequestTalents, castingRequest, classes } = this.props;
    let profileItemClassName = classes.adminTalentViewButton;
    if (castingRequest) profileItemClassName = getProfileButtonClassNameByCastingRequest(castingRequest, classes);
    
    return (
      (castinRequestTalents) ? (
        <Grid container spacing={24} justify="center" alignItems="center">
        { castinRequestTalents.map((castingRequestTalent, index) => {
            return (
              <Grid item xs={12} key={index}>
                <ProfileItem 
                  profile={castingRequestTalent.talent}
                  link={{
                    pathname: "/admin/casting-detail", 
                    state: {castingRequestTalent: castingRequestTalent, castingRequest: castingRequest}
                  }}
                  className={profileItemClassName}
                />
              </Grid>
            );
          })
        }
        </Grid>
      ) : (
        <div>None</div>
      )        
    );
  }
}

export default withStyles(adminStyles)(CastingRequestTalentTable);