import React, {Component} from 'react';
import ImageLoader from 'react-loading-image';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Typography from '@material-ui/core/Typography';
import Panel from 'components/general/panel';
import * as talentActions from 'actions/talentActions';
import styles from 'styles';
import Spacer from "components/general/spacer";


class MyAuditionsForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      talentInfo: {}
    }
  }

  getInfoFromProps(props) {
    return {
      talentInfo: props.talentInfo
    }
  }

  componentWillMount() {
    this.setState({
      ...this.getInfoFromProps(this.props)
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.getInfoFromProps(nextProps)
    })
  }

  renderViewHistoryTable = () => {
    const { classes } = this.props;
    const talentViewedHistories = [
      {client: {name: 'Princess Cruises'}, viewed_date: 'April 23, 2018'},
      {client: {name: 'Royal Caribbean International'}, viewed_date: 'April 22, 2018'},
      {client: {name: 'Carnival Cruise Line'}, viewed_date: 'April 22, 2018'},
      {client: {name: 'Jean Ann Ryan Productions'}, viewed_date: 'April 21, 2018'},
      {client: {name: 'Jean Ann Ryan Production'}, viewed_date: 'April 20, 2018'},
      {client: {name: 'Jean Ann Ryan Productions'}, viewed_date: 'April 18, 2018'},
      {client: {name: 'Jean Ann Ryan Productions'}, viewed_date: 'April 18, 2018'},
      {client: {name: 'Royal Caribbean International'}, viewed_date: 'April 16, 2018'},
    ];

    return(
      <Grid container spacing={16} justify="center" alignItems="center">
        <Grid item lg={7} md={7} sm={7} xs={7}>
          <Typography className={classes.auditionTableTitle}>
            Who Viewed My Profile?
          </Typography>
        </Grid>
        <Grid item lg={5} md={5} sm={5} xs={5}>
          <Typography className={classes.auditionTableTitle}>
            When
          </Typography>
        </Grid>
        {
          talentViewedHistories.map((history) => {
            let items = [];
            items.push(
              <Grid item lg={7} md={7} sm={7} xs={7}>
                <Typography className={classes.auditionTableContentText}>
                  { history.client.name }
                </Typography>
              </Grid>
            );
            items.push(
              <Grid item lg={5} md={5} sm={5} xs={5}>
                <Typography className={classes.auditionTableContentText}>
                  { history.viewed_date }
                </Typography>
              </Grid>
            );
            return items;
          })
        }
      </Grid>
    )
  };

  render() {
    const { classes } = this.props;

    return (
      <Panel>
        <Grid container spacing={16} direction="column" justify="center" alignItems="center">
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Spacer size={20}/>
          </Grid>

          <Grid item lg={5} md={6} sm={8} xs={10}>
            { this.renderViewHistoryTable() }
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Spacer size={50}/>
          </Grid>
        </Grid>
      </Panel>
    )
  }
}


function mapStateToProps(state) {
  const { talentInfo } = state;

  return {
    talentInfo: talentInfo.value
  }
}

function mapDispatchToProps(dispatch) {
  return {
    talentActions: bindActionCreators(talentActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MyAuditionsForm));

