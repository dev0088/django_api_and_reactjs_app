import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { adminStyles } from 'styles';

class SubPropertyButton extends Component {
    render() {
        const { title, selected, classes } = this.props;

        return (
            <div className={selected ? classes.adminFormTalentSubPropertyButtonSelected : classes.adminFormTalentSubPropertyButton}>
                <Typography className={classes.adminFormTalentSubPropertyButtonTitle}>
                    { title }
                </Typography>
            </div>
        )
    }
}

export default withStyles(adminStyles)(SubPropertyButton);