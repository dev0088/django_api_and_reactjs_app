import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import StatusCheckBox from 'components/shiptalent/checkbox/StatusCheckBox';
import { adminStyles } from 'styles';


class ProfileCurrentStatus extends Component {

  renderCheckbox = (name, title, checked, className) => {
    return (
        <Grid item xs={12}>
            <StatusCheckBox name={name} title={title} checked={checked} className={className} />
        </Grid>
    );
  };
    
  render() {
    const { classes } = this.props;

    return (
        <Grid container spacing={0} justify="flex-start"> 
            <Grid item xs={12}>
                <Typography className={[classes.bold, classes.adminTalentViewButtonText]}>
                    CURRENT STATUS
                </Typography>
            </Grid>
            <Grid container spacing={0}>
                { this.renderCheckbox('isAvailable', 'Available', true, classes.adminStatusTalentAvailable) }
                { this.renderCheckbox('notAvailable', 'Not Avaliable (Talent Calendar)', true, classes.adminStatusTalentNotAvailable) }
                { this.renderCheckbox('isActiveCastingRequest', 'Active Casting Request', true, classes.adminStatusTalentActiveCastingRequest) }
                { this.renderCheckbox('isContracted', 'Contracted', true, classes.adminStatusTalentContracted) }
                { this.renderCheckbox('isDeployed', 'Deployed until', true, classes.adminStatusTalentDeployed) }
            </Grid> 
        </Grid>
    );
  }
}

export default withStyles(adminStyles)(ProfileCurrentStatus);