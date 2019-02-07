import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SubPositionSelection from './SubPositionSelection'
import styles from 'styles';


class SubPositionsSelection extends Component {

  renderSubPositions() {
    const { classes, subPositions, titleItem, onChangeSubPosition } = this.props;
    let items = [];
    
    for (let i = 0; i < subPositions.length; i ++) {
      let subPosition = subPositions[i];

      if (subPosition[titleItem])
        items.push(
          <Grid
            item xl={6} lg={6} md={6} sm={6} xs={6}
            className={classes.clientTalentSearchGenderButtonItem}
            key={`subPosition-${subPosition.id}`}
          >
            <SubPositionSelection
              subPosition={subPosition}
              titleItem={titleItem}
              onChangeSubPosition={onChangeSubPosition}
            />
          </Grid>
        );
    }

    return items;
  }

  render() {
    return(
      <Grid container spacing={8} justify="flex-start" alignItems="center">
        { this.renderSubPositions() }
      </Grid>
    );
  }

}

export default withStyles(styles)(SubPositionsSelection);