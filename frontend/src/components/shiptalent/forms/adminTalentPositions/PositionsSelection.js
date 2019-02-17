import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import PositionSelection from './PositionSelection';
import { adminStyles } from 'styles';


class PositionsSelection extends Component {

  renderPositions() {
    const { classes, selectedPositions, selectedSubPositions, allPositionTypes, titleItem, loading } = this.props;
    let items = [];
    let titleItemName = titleItem ? titleItem : 'select_option_title';
    
    if (loading) {
      return <CircularProgress className={classes.progress} />
    }
    
    for (let i = 0; i < allPositionTypes.length; i ++) {
      let positionType = allPositionTypes[i];
      let selected = false;
      if (selected)
        selected = selectedPositions.find(p => {
          return p.position_type_id === positionType.id;
        }) ? true : false;

      if (positionType[titleItemName]) 
        items.push(
          // <Grid
          //   item xs
          //   className={classes.adminFormTalentPropertyButtonItem}
          // >
            <PositionSelection
              position={positionType}
              selectedSubPositions={selectedSubPositions}
              titleItem={titleItemName}
              selected={selected}
              key={`positionSelection-${positionType.id}`}
            />
          // </Grid>
        );
    }

    return items;
  }

  render() {
    const { classes } = this.props;
    return(
      // <Grid container spacing={16} direction="row" justify="flex-start" alignItems="flex-start">
      //   <Grid item xs />
      <div className={classes.adminTalentTitlePropertiesWrapper}>
        { this.renderPositions() }
      </div>
        // <Grid item xs />
      // </Grid>
    );
  }

}

export default withStyles(adminStyles)(PositionsSelection);