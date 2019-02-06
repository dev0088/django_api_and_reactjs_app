import React, {Component} from 'react'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import AdminForm from 'components/shiptalent/forms/adminForm';
import ProfileTable from "./ProfileTable";
import { makeTitleWithAllPositionTypes, getSexTitle, getAvatarFromTalentInfo } from 'utils/appUtils';
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
          <Grid container spacing={24}>
            <Grid item xs={6} >
              <ProfileTable profiles={profiles} />
            </Grid>
            <Grid item xs={6}>
              <SearchCriteria
                condition={talentSearchResult.condition}
                allPositionTypes={allPositionTypes.value}
                allSkills={allSkills.value}
              />
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
        handleClickNextButton={this.handleClickNextButton}
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