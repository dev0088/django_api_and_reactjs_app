import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import TalentItem from '../find_talent/talentItem';
import styles from 'styles';
import '../client.css';

class TalentTable extends Component {

  state = {
    checks: [],
    selectedTalentIDs: [],
  };

  handleChange = (event, index, talentID) => {
    let newChecks = this.state.checks;
    let talentIDs = this.state.selectedTalentIDs;

    newChecks[index] = event.target.checked;
    if (newChecks[index]) {
      talentIDs.push(talentID);
    } else {
      talentIDs.splice(talentIDs.indexOf(talentID), 1);
    }

    this.setState({
      checks: newChecks,
      selectedTalentIDs: talentIDs
    }, () => {
      const { onChange } = this.props;
      if(onChange) {
        onChange(this.state.selectedTalentIDs);
      }
    });
  };

  render() {
    const { talents, classes } = this.props;
    const { checks } = this.state;

    return (
      <Grid container spacing={24}>
        {(talents && talents.length > 0) ? (
          talents.map((talent, index) => {
            let items = [];
            items.push(
              <Grid item xs={1} key={`check-${index}`} className={classes.clientTalentTableCheckboxGridItem}>
                <Checkbox
                  checked={checks[index]}
                  onChange={event => this.handleChange(event, index, talent.id)}
                  value={`${index}`}
                  color="default"
                />
              </Grid>
            );
            items.push(
              <Grid item xs={11} key={`talent-${index}`}>
                <TalentItem talent={talent}/>
              </Grid>
            );
            return items;
          })
        ) : (<Grid item xs={12} />)}
      </Grid>
    )
  }
}

export default withStyles(styles)(TalentTable);