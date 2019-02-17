import React, {Component} from 'react'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import AdminForm from 'components/shiptalent/forms/adminForm';
import ProfileTable from "./ProfileTable";
import Panel from "components/general/panel";
import { adminStyles } from 'styles';
import SearchCriteria from "./SearchCriteria/SearchCriteria";


class ProfileSearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: []
    }
  };

  getInfoFromProps(props) {
    const { talentSearchResult } = props;
    let profiles = [];

    if (talentSearchResult && talentSearchResult.value) profiles = talentSearchResult.value;

    return { profiles };
  }

  componentWillMount() {
    this.setState({
      ...this.getInfoFromProps(this.props)
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.getInfoFromProps(nextProps)
    });
  }

  renderContent() {
    const { classes, talentSearchResult, allPositionTypes, allSkills } = this.props;
    const { profiles } = this.state;

    if ( talentSearchResult.isFetching ) {
      return <CircularProgress className={classes.progress} />
    }

    return(
      <div>
        <Panel>
          <Grid container spacing={24} >
            <Grid item xl={2} lg={2} md={1} xs/>
            <Grid item xl={3} lg={3} md={4} xs={12}>
              <ProfileTable profiles={profiles} path='/admin/edit-profiles/edit-profile'/>
            </Grid>
            <Grid item xl={1} lg={1} md={1} xs/>
            <Grid item xl={4} lg={4} md={5} xs={12} className={classes.leftText}>
              <SearchCriteria
                condition={talentSearchResult.condition}
                allPositionTypes={allPositionTypes.value}
                allSkills={allSkills.value}
              />
              <Grid item xl={2} lg={2} md={1} xs/>
            </Grid>
          </Grid>
        </Panel>
      </div>
    )
  }

  render() {
    return (
      <AdminForm
        formTitle="Search Result"
        nextLink="/admin/profile-search"
        nextButtonTitle="Back to Profile Search"
      >
        {this.renderContent()}
      </AdminForm>
    )
  }
}


function mapStateToProps(state) {
  const { talentSearchResult, allPositionTypes, allSkills } = state;
  return {
    talentSearchResult,
    allPositionTypes,
    allSkills
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(adminStyles)(ProfileSearchResults));