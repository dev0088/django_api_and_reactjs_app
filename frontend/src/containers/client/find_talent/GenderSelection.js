import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import defaultValues from 'constants/defaultValues';
import styles, { clientDesigns } from 'styles';


class GenderSelection extends Component {

  state = {
    genders: []
  };

  handleClickGenderButton = (event, gender) => {
    const { genders } = this.state;

    let newGenders = genders;
    let index = newGenders.indexOf(gender);

    if ( index > -1) newGenders.splice(index, 1);
    else newGenders.push(gender);

    this.setState({ genders: newGenders }, () => {
      const { onChange } = this.props;
      if (onChange) onChange(newGenders);
    });
  };

  renderGenderButtons() {
    const { classes } = this.props;
    const { genders } = this.state;

    let items = [];

    for (let i = 0; i < defaultValues.GENDERS.length; i ++) {
      let gender = defaultValues.GENDERS[i];
      let isSelected = genders.indexOf(gender) > -1;

      items.push(
        <Grid
          item {...clientDesigns.talentSearch.PositionsTableItems}
          className={classes.clientTalentSearchGenderButtonItem}
        >
          <Button
            color="primary"
            className={
              isSelected
                ? classes.clientTalentSearchGenderButtonSelected
                : classes.clientTalentSearchGenderButton
            }
            fullWidth={true}
            onClick={(event) => this.handleClickGenderButton(event, gender)}
          >
            <Typography
              className={
                isSelected
                  ? classes.clientTalentSearchGenderButtonSelectedTitle
                  : classes.clientTalentSearchGenderButtonTitle
              }
            >
              {`${gender}`}
            </Typography>
          </Button>
        </Grid>
      );
    }

    return items;
  }

  render() {
    return(
      <Grid container spacing={16} direction="row" justify="flex-start" alignItems="center">
        {this.renderGenderButtons()}
      </Grid>
    );
  }

}

export default withStyles(styles)(GenderSelection);