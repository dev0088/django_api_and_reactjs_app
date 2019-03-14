import React from "react";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import AdminForm from 'components/shiptalent/forms/adminForm';
import Card from "components/admin/Card/Card";
import CardHeader from "components/admin/Card/CardHeader";
import CardBody from "components/admin/Card/CardBody";
import MetricToolsItem from 'containers/admin/MetricTools/MetricToolsItem';
import SortConditions from './SortConditions';
import TalentTable from "./TalentTable";
import * as clientActions from 'actions/clientActions';
import defaultValues from 'constants/defaultValues';
import { adminStyles } from 'styles';


class TalentMetrics extends React.Component  {
  state = {
    sortConditions: [],
    talents: [],
    isLoading: false
  };

  componentWillMount = () => {
    const { talentSearchResult, isLoading } = this.props;
    const { ADMIN_TALENT_SORT_CONDITION } = defaultValues;
    let sortConditions = {};
    
    let conditions = Object.keys(ADMIN_TALENT_SORT_CONDITION).map(key => {
      let sortName = ADMIN_TALENT_SORT_CONDITION[key].name;
      sortConditions = {...sortConditions, [sortName]: false };
      return {...sortConditions, sortName: false };
    });

    // Set default sort condition
    sortConditions[ADMIN_TALENT_SORT_CONDITION.ALPHA.name] = true;

    this.setState({sortConditions, talents: talentSearchResult, isLoading});
  }

  componentWillReceiveProps = (nextProps) => {
    const { talentSearchResult, isLoading } = nextProps;
    this.setState({talents: talentSearchResult, isLoading});
  }

  handleChange = name => event => {
    let newSortCondition = this.state.sortConditions;
    newSortCondition[name] = event.target.checked
    this.setState({sortConditions: newSortCondition}, () => {
      this.props.clientActions.setSearchCondition(newSortCondition);
      this.props.clientActions.talentSearch(newSortCondition);
    });
  };


  renderContent = () => {
    const { classes } = this.props;
    const { sortConditions, talents, isLoading } = this.state;

    return (
      <Grid container spacing={24}>
        <Grid item lg={4} md={4} sm={12} xs={12} >
          <Card className={classes.dashboardGeneralCard}>
            <CardHeader className={classes.dashboardGeneralCardHeader}>Select sort conditions</CardHeader>
            <CardBody>
              <SortConditions sortConditions={sortConditions} onChange={this.handleChange} />
            </CardBody>
          </Card>
        </Grid>
        
        <Grid item lg={8} md={8} sm={12} xs={12}>
          <Card className={classes.dashboardGeneralCard}>
            <CardBody>
              <TalentTable talents={talents} isLoading={isLoading}/>
            </CardBody>
          </Card>
        </Grid>
      </Grid>
    );
  };

  renderContentOld = () => {
    return (
      <Grid container spacing={24}>
        <Grid item md={2} sm={2} xs={1} />
        <Grid item md={8} sm={8} xs={10}>
          <Grid container spacing={24}>
            <Grid item md={3} sm={6} xs={12}>
              <MetricToolsItem path="/admin/talent-metrics" title="TALENT METRICS" subTitle='(ALPAHA)' />
            </Grid>
            <Grid item md={3} sm={6} xs={12} >  
              <MetricToolsItem path="/admin/choose-client" title="LIST ALL TALENT" subTitle='(POSITION)' />
            </Grid>
            <Grid item md={3} sm={6} xs={12} >
            <MetricToolsItem path="/admin/choose-client" title="SORT TALENT BY LOGIN DATE" />
            </Grid>
            <Grid item md={3} sm={6} xs={12} >
              <MetricToolsItem path="/admin/choose-client" title="SORT TALENT BY SEARCH RETURNS" />
            </Grid>

            <Grid item md={3} sm={6} xs={12}>
              <MetricToolsItem path="/admin/talent-metrics" title="SORT TALENT BY SEARCH RETURNS" />
            </Grid>
            <Grid item md={3} sm={6} xs={12} >  
              <MetricToolsItem path="/admin/choose-client" title="SORT TALENT BY VIEWS" />
            </Grid>
            <Grid item md={3} sm={6} xs={12} >
            <MetricToolsItem path="/admin/choose-client" title="SORT TALENT BY SHARES" />
            </Grid>
            <Grid item md={3} sm={6} xs={12} >
              <MetricToolsItem path="/admin/choose-client" title="SORT TALENT BY BLOKS" />
            </Grid>

            <Grid item md={3} sm={6} xs={12}>
              <MetricToolsItem path="/admin/talent-metrics" title="SORT TALENT BY RATING" />
            </Grid>
            <Grid item md={3} sm={6} xs={12} >  
              <MetricToolsItem path="/admin/choose-client" title="SORT TALENT BY NATIONALITY" />
            </Grid>
            <Grid item md={3} sm={6} xs={12} >
              <MetricToolsItem path="/admin/choose-client" title="SORT TALENT BY SHARES" />
            </Grid>
            <Grid item md={3} sm={6} xs={12} >
              <MetricToolsItem path="/admin/choose-client" title="SORT TALENT BY BLOKS" />
            </Grid>

          </Grid>
        </Grid>
        <Grid item md={2} sm={2} xs={1} />
      </Grid>
    );
  };

  render = () => {
    return (
      <AdminForm
          formTitle="TALENT METRICS"
          nextLink="/admin/dashboard"
          nextButtonTitle="Agent Dashboard"
        >
        { this.renderContent() }
      </AdminForm>
    );
  };
}

TalentMetrics.propTypes = {
  classes: PropTypes.object.isRequired
};


const mapDispatchToProps = dispatch => {
  return {
    clientActions: bindActionCreators(clientActions, dispatch)
  }
};

const mapStateToProps = state => {
  const { talentSearchResult } = state;
  return {
    talentSearchResult: (talentSearchResult && talentSearchResult.value) ? talentSearchResult.value : null,
    isLoading: (talentSearchResult && talentSearchResult.isFetching) ? talentSearchResult.isFetching : false
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(adminStyles)(TalentMetrics));