import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SubPositionsSelection from './SubPositionsSelection';
import styles from 'styles';


class PositionSelection extends Component {

  state = {
    selectedPosition: false
  };

  handleClickPositionButton = () => {
    const { selectedPosition } = this.state;
    const { position, onChangePosition } = this.props;

    this.setState({selectedPosition: !selectedPosition}, () => {
      if (onChangePosition) onChangePosition(position.id);
    });
  };


  render() {
    const {classes, position, titleItem, onChangeSubPosition } = this.props;
    const {selectedPosition} = this.state;

    return(
      <Grid container spacing={8} justify="center" alignItems="flex-start">
        <Grid
          item xl={12} lg={12} md={12} sm={12} xs={12}
          className={classes.clientTalentSearchGenderButtonItem}
        >
          <Button
            color="primary"
            className={
              selectedPosition
                ? classes.clientTalentSearchGenderButtonSelected
                : classes.clientTalentSearchGenderButton
            }
            fullWidth={true}
            onClick={this.handleClickPositionButton}
          >
            <Typography className={classes.clientTalentSearchGenderButtonTitle}>
              {position[titleItem]}
            </Typography>
          </Button>
        </Grid>
        <Grid
          item xl={12} lg={12} md={12} sm={12} xs={12}
          className={classes.clientTalentSearchGenderButtonItem}
        >
          <SubPositionsSelection
            subPositions={position.position_sub_types}
            titleItem={titleItem}
            onChangeSubPosition={onChangeSubPosition}
          />
        </Grid>
      </Grid>
    );
  }

}

export default withStyles(styles)(PositionSelection);