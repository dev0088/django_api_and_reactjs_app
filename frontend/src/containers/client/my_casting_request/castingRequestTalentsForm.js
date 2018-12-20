import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Panel from 'components/general/panel';
import CastingRequestTalent from './castingRequestTalent';
import styles from 'styles';


class CastingRequestTalentsForm extends Component {

  render() {
    const { title, castingRequest, castingRequestTalents } = this.props;
    let items = [];

    if (castingRequestTalents.length > 0) {
      items = castingRequestTalents.map(castingRequestTalent => {
        return (
          <Grid item xs={12}>
            <CastingRequestTalent castingRequestTalent={castingRequestTalent} />
          </Grid>
        );
      });
    }

    return (
      <Panel title={title} bold={true} center={true} key="casting-request-submit-form">
        <Grid container spacing={16} direction="row" justify="center" alignItems="center">
          { items }
        </Grid>
      </Panel>
    )
  }
}

export default (withStyles(styles)(CastingRequestTalentsForm));
