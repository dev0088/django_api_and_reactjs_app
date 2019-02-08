import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import { adminStyles } from 'styles';


class ProfileCurrentStatus extends Component {

  renderCheckbox = (name, title, value, className) => {
    return (
        <Grid item xs={12}>
            <FormControlLabel 
            control={
                <Checkbox checked={true} value={value} className={className} />
            } label={
                <Typography className={[this.props.classes.adminGeneralText]}>
                    {title}
                </Typography>
            } 
            />
        </Grid>
    );
  };
    
  render() {
    const { profile, classes } = this.props;

    return (
        <Grid container spacing={0} justify="flex-start"> 
            <Grid item xs={12}>
                <Typography className={[classes.bold, classes.adminTalentViewButtonText]}>
                    CURRENT STATUS
                </Typography>
            </Grid>
            <Grid container spacing={0}>
                { this.renderCheckbox('isAvailable', 'Available', false, classes.adminTalentCurrentStatusCheckboxAvailable) }
                { this.renderCheckbox('notAvailable', 'Not Avaliable (Talent Calendar)', false, classes.adminTalentCurrentStatusCheckboxNotAvailable) }
                { this.renderCheckbox('isActiveCastingRequest', 'Active Casting Request', false, classes.adminTalentCurrentStatusCheckboxActiveCastingRequest) }
                { this.renderCheckbox('isContracted', 'Contracted', false, classes.adminTalentCurrentStatusCheckboxContracted) }
                { this.renderCheckbox('isDeployed', 'Deployed until', false, classes.adminTalentCurrentStatusCheckboxDeployed) }
            </Grid> 
        </Grid>
    );
  }
}

export default withStyles(adminStyles)(ProfileCurrentStatus);