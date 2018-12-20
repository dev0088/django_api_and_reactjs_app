import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import Panel from 'components/general/panel';
import CastingRequestTalent from './castingRequestTalent';
import styles from 'styles';


class CastingRequestTalentsForm extends Component {

  render() {
    const { title, castingRequest, castingRequestTalents, classes } = this.props;
    let items = [];

    if (castingRequestTalents.length > 0) {
      items = castingRequestTalents.map(castingRequestTalent => {
        return (
          <Grid item xs={12} style={{ display: 'inherit'}}>
            <Link to={{
              pathname: '/client/casting_request/add_wage',
              state: {castingRequestTalent}
            }}>
              <EditIcon className={classes.talentProfileEditIcon}/>
            </Link>
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
