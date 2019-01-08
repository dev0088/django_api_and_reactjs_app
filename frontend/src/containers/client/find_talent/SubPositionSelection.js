import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import defaultValues from 'constants/defaultValues';
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
    const {classes, subPosition } = this.props;
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
          {`${subPosition.select_option_title}`}
        </Typography>
      </Button>
    );
  }

}

export default withStyles(styles)(SubPositionSelection);