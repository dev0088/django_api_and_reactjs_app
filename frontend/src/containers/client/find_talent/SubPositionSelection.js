import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from 'styles';


class SubPositionSelection extends Component {

  state = {
    selectedSubPosition: false
  };

  handleClickSubPositionButton = () => {
    const { onChangeSubPosition, subPosition } = this.props;
    const { selectedSubPosition } = this.state;

    this.setState({selectedSubPosition: !selectedSubPosition}, () => {
      if (onChangeSubPosition) onChangeSubPosition(subPosition.id);
    });
  };


  render() {
    const {classes, subPosition, titleItem } = this.props;
    const {selectedSubPosition} = this.state;

    return(
      <Button
        color="primary"
        className={
          selectedSubPosition
            ? classes.clientTalentSearchSubPositionButtonSelected
            : classes.clientTalentSearchSubPositionButton
        }
        fullWidth={true}
        onClick={this.handleClickSubPositionButton}
      >
        <Typography className={classes.clientTalentSearchSubPositionButtonTitle}>
          {subPosition[titleItem]}
        </Typography>
      </Button>
    );
  }

}

export default withStyles(styles)(SubPositionSelection);