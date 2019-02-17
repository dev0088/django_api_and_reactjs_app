import React, {Component} from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { adminStyles } from 'styles';

class PositionCriteria extends Component {

  render() {
    const { positionIds, allPositionTypes, classes } = this.props;
    if (positionIds && allPositionTypes) {
      return (
        <div>
        {allPositionTypes && positionIds.map(positionId => {
            let position = allPositionTypes.find(position => {
                return position.id === positionId;
            });

            return (
            <Button
                size="small"
                className={classNames(classes.button, classes.adminSearchCriteriaPositionButton)}
            >
                <Typography className={classes.adminSearchCriteriaPositionButtonText}>
                { position.select_option_title }
                </Typography>
            </Button>
            )
        }) }
        </div>
      )
    }

    return <div/>
  }
}

export default withStyles(adminStyles)(PositionCriteria);