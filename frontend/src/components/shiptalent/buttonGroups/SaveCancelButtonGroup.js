import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { styles } from 'styles';

class SaveCancelButtonGroup extends Component {

  render() {
    const { classes, onCancel,onSave } = this.props;

    return (
      <Grid container direction="column" justify="center" alignItems="flex-end" spacing={24}>
        <Grid item xs={12} sm>
          <Button 
            size="large"
            className={classes.button}
            onClick={onCancel}
          >
            {'Cancel'}
          </Button>
          <Button 
            size="large" color="primary"
            className={classes.button}
            onClick={onSave}
          >
            {'Save'}
          </Button>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles, { withTheme: true })(SaveCancelButtonGroup);