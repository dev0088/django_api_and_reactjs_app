import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from 'styles';


class SubSkillSelection extends Component {

  state = {
    selectedSubSkill: false
  };

  handleClickSubSkillButton = () => {
    const { onChangeSubSkill, subSkill } = this.props;
    const { selectedSubSkill } = this.state;

    this.setState({selectedSubSkill: !selectedSubSkill}, () => {
      if (onChangeSubSkill) onChangeSubSkill(subSkill.id);
    });
  };


  render() {
    const {classes, subSkill, titleItem} = this.props;
    const {selectedSubSkill} = this.state;

    return(
      <Button
        color="primary"
        className={
          selectedSubSkill
            ? classes.clientTalentSearchSubPositionButtonSelected
            : classes.clientTalentSearchSubPositionButton
        }
        fullWidth={true}
        onClick={this.handleClickSubSkillButton}
      >
        <Typography className={classes.clientTalentSearchSubPositionButtonTitle}>
          {subSkill[titleItem]}
        </Typography>
      </Button>
    );
  }

}

export default withStyles(styles)(SubSkillSelection);