import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import defaultValues from 'constants/defaultValues';
import styles from 'styles';


class RatingValues extends Component {

  state = {
    mainRating: '0.00', //defaultValues.MAIN_RATING_VALUES[0],
    bonusRating: '0.00', //defaultValues.BONUS_RATING_VALUES[0]
  };

  handleChange = (event, name) => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { talent, castingRequest, classes } = this.props;
    const { mainRating, bonusRating } = this.state;

    if (castingRequest && talent) {
      return (
        <Grid container spacing={16} justify="center" alignItems="center">

          <Grid item lg={12} md={12} sm={12} xs={12} className={classes.leftText}>
            <Typography className={classes.financeTableTitle}>
              {`Average Rating: ${talent.average_rating}`}
            </Typography>
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12} className={classes.centerText}>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="mainRating"
                name="mainRating"
                value={mainRating}
                onChange={event => this.handleChange(event, 'mainRating')}
                row
              >
                { defaultValues.MAIN_RATING_VALUES.map(mainRatingValue => {
                    return (
                      <FormControlLabel
                        value={mainRatingValue}
                        control={<Radio color="primary" />}
                        label={mainRatingValue}
                        labelPlacement="bottom"
                      />
                    );
                  })
                }
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12} className={classes.centerText}>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="bonusRating"
                name="bonusRating"
                value={bonusRating}
                onChange={event => this.handleChange(event, 'bonusRating')}
                row
              >
                { defaultValues.BONUS_RATING_VALUES.map(bonusRatingValue => {
                  return (
                    <FormControlLabel
                      value={bonusRatingValue}
                      control={<Radio color="primary" />}
                      label={bonusRatingValue}
                      labelPlacement="bottom"
                    />
                  );
                })
                }
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      );
    }

    return <div/>
  }
}

export default withStyles(styles)(RatingValues);