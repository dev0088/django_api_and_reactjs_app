import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { adminStyles } from 'styles';


class ApproveAction extends Component {

  render() {
    const { selectedValue, onChange, classes } = this.props;
    return (
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend"></FormLabel>
        <RadioGroup
          aria-label="videoAction"
          name="video_action"
          className={classes.group}
          value={selectedValue}
          onChange={onChange}
        >
          <FormControlLabel 
            value="approved" 
            control={
              <Radio classes={{
                  root: classes.adminpictureApproveSelection,
                  checked: classes.adminpictureApproveSelectionChecked,
                }}
              />
            } 
            label="Approve and Post" 
          />
          <FormControlLabel value="reject" control={<Radio color="default" />} label="Reject and Delete" />
        </RadioGroup>
      </FormControl>
    );
  }
}

export default withStyles(adminStyles)(ApproveAction);