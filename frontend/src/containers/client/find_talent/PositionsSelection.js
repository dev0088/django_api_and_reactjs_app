import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import PositionSelection from './PositionSelection';
import styles, { clientDesigns } from 'styles';


class PositionsSelection extends Component {

  renderPositions() {
    const { classes, positions, titleItem, loading, onChangePosition, onChangeSubPosition } = this.props;
    let items = [];
    let titleItemName = titleItem ? titleItem : 'select_option_title';
    
    if (!positions || loading ) {
      return <CircularProgress className={classes.progress} />
    }

    for (let i = 0; i < positions.length; i ++) {
      let position = positions[i];

      if (position[titleItemName]) 
        items.push(
          <Grid
            item {...clientDesigns.talentSearch.PositionsTableItems}
            className={classes.clientTalentSearchGenderButtonItem}
          >
            <PositionSelection
              position={position}
              titleItem={titleItemName}
              onChangePosition={onChangePosition}
              onChangeSubPosition={onChangeSubPosition}
            />
          </Grid>
        );
    }

    return items;
  }

  render() {
    return(
      <Grid container spacing={16} direction="row" justify="flex-start" alignItems="flex-start">
        { this.renderPositions() }
      </Grid>
    );
  }

}

export default withStyles(styles)(PositionsSelection);