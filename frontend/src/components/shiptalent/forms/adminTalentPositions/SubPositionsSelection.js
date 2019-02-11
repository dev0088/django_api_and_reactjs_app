import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SubPositionSelection from './SubPositionSelection'
import { adminStyles } from 'styles';


class SubPositionsSelection extends Component {

  renderSubPositions() {
    const { selectedSubPositions, allSubPositions, titleItem } = this.props;
    let items = [];
    
    for (let i = 0; i < allSubPositions.length; i ++) {
      let subPosition = allSubPositions[i];
      let selected = false;
      if (selectedSubPositions)
        selected = selectedSubPositions.find(s => {
          return s.position_sub_type.id === subPosition.id;
        }) ? true : false;

      let newTitleItem = subPosition[titleItem] ? titleItem : 'select_option_title';
      if (subPosition[newTitleItem])
        items.push(
          // <Grid
          //   item xs //xl={6} lg={6} md={6} sm={6} xs={6}
          //   className={classes.clientTalentSearchGenderButtonItem}
          //   key={`subPosition-${subPosition.id}`}
          // >
            <SubPositionSelection
              subPosition={subPosition}
              titleItem={newTitleItem}
              selected={selected}
            />
          // </Grid>
        );
    }

    return items;
  }

  render() {
    const { classes } = this.props;
    return(
      // <Grid container spacing={0} justify="center" alignItems="center">
        <div className={classes.adminTalentTitleSubPropertiesWrapper}>
          { this.renderSubPositions() }
        </div>
      // </Grid>
    );
  }

}

export default withStyles(adminStyles)(SubPositionsSelection);