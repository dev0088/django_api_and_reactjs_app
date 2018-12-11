import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Panel from 'components/general/panel';
import VocalistIntroCommon from './vocalistIntroCommon';
import styles from 'styles';

class VocalistIntroForm extends Component {

  render() {
    return (
      <Panel>
        <Grid container spacing={16} justify="center" alignItems="center">
          <Grid item lg={1} md={1} sm={1} xs={1} />
          <Grid item lg={10} md={10} sm={10} xs={10}>
            <VocalistIntroCommon formTitle={this.props.formTitle} />
          </Grid>
          <Grid item lg={1} md={1} sm={1} xs={1} />
        </Grid>
      </Panel>
    )
  }
}


export default withStyles(styles)(VocalistIntroForm);
