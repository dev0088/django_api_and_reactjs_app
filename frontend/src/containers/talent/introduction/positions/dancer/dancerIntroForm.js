import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Panel from 'components/general/panel';
import DancerIntroCommon from './dancerIntroCommon';
import styles from 'styles';

class DancerIntroForm extends Component {

  render() {
    return (
      <Panel>
        <Grid container spacing={16} justify="center" alignItems="center">
          <Grid item lg={1} md={1} sm={1} xs={1} />
          <Grid item lg={10} md={10} sm={10} xs={10}>
            <DancerIntroCommon />
          </Grid>
          <Grid item lg={1} md={1} sm={1} xs={1} />
        </Grid>
      </Panel>
    )
  }
}


export default withStyles(styles)(DancerIntroForm);
