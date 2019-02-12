import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { adminStyles } from 'styles';


class StatusCheckBox extends Component {   
  render() {
    const { name, title, checked, className, classes } = this.props;
    return (
      <FormControlLabel 
        control={
            <Checkbox checked={checked} value={name} className={className} disabled/>
        } label={
            <Typography className={[classes.adminGeneralText]}>
                {title}
            </Typography>
        } 
      />
    );
  }
}

export default withStyles(adminStyles)(StatusCheckBox);