import React, {Component} from 'react'
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { adminStyles } from 'styles';


class QuestionSelection extends Component {
  state = {
    selectedQuestionId: '0'
  };

  componentWillMount = () => this.setState({selectedQuestionId: this.props.selectedQuestionId});

  componentWillReceiveProps = (nextProps) => this.setState({selectedQuestionId: nextProps.selectedQuestionId});

  onChange = event => {
    this.setState({ selectedQuestionId: event.target.value }, () => {
      if (this.props.onChange) this.props.onChange(parseInt(this.state.selectedQuestionId));
    });
  };

  render() {
    const { positionName } = this.props;
    const { selectedQuestionId } = this.state;
    return (
      <Grid container spacing={16} justify="center" alignItems="center">
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">{`${positionName && positionName} Questions:`}</FormLabel>
            <RadioGroup
              aria-label="selectedQuestionId"
              name="selectedQuestionId"
              value={selectedQuestionId}
              onChange={this.onChange}
              row
            >
              <FormControlLabel
                value={`0`}
                control={<Radio color="secondary" />}
                label={`1`}
                labelPlacement={`1`}
              />
              <FormControlLabel
                value={`1`}
                control={<Radio color="secondary" />}
                label={`2`}
                labelPlacement={`2`}
              />
              <FormControlLabel
                value={`2`}
                control={<Radio color="secondary" />}
                label={`3`}
                labelPlacement={`3`}
              />
              <FormControlLabel
                value={`3`}
                control={<Radio color="secondary" />}
                label={`4`}
                labelPlacement={`4`}
              />
              <FormControlLabel
                value={`4`}
                control={<Radio color="secondary" />}
                label={`5`}
                labelPlacement={`5`}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(adminStyles)(QuestionSelection);