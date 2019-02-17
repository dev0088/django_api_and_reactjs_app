import React, {Component} from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { adminStyles } from 'styles';

class PropertyButton extends Component {
    render() {
        const { title, selected, classes } = this.props;

        return (
            <div className={selected ? classes.adminFormTalentGenderButtonSelected : classes.adminFormTalentGenderButton}>
                <Typography className={classes.adminFormTalentGenderButtonTitle}>
                    { title }
                </Typography>
            </div>
        )
    }
}

export default withStyles(adminStyles)(PropertyButton);