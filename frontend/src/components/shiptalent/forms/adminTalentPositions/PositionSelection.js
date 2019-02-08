import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SubPositionsSelection from './SubPositionsSelection';
import PropertyButton from './PropertyButton';
import { adminStyles } from 'styles';


class PositionSelection extends Component {
  render() {
    const { position, selected, titleItem, selectedSubPositions } = this.props;

    return (
      <div style={{display: 'inline-block'}}>
        <PropertyButton title={position[titleItem]} selected={selected} />
        <SubPositionsSelection
          allSubPositions={position.position_sub_types}
          selectedSubPositions={selectedSubPositions}
          titleItem={'abbreviated_key'}
        />
      </div>
    )

    // return(
    //   <Grid container spacing={8} justify="center" alignItems="flex-start">
    //     <Grid
    //       item xl={12} lg={12} md={12} sm={12} xs={12}
    //       className={classes.adminFormTalentPropertyButtonItem}
    //     >
    //       <PropertyButton title={position[titleItem]} selected={selected} />
    //     </Grid>
    //     <Grid
    //       item xl={12} lg={12} md={12} sm={12} xs={12}
    //       className={classes.adminFormTalentPropertyButtonItem}
    //     >
    //       <SubPositionsSelection
    //         allSubPositions={position.position_sub_types}
    //         selectedSubPositions={selectedSubPositions}
    //         titleItem={'abbreviated_key'}
    //       />
    //     </Grid>
    //   </Grid>
    // );
  }
}

export default withStyles(adminStyles)(PositionSelection);