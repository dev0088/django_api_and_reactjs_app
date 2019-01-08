import React, {Component} from 'react'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ClientForm from 'components/shiptalent/forms/clientForm';
import TalentTable from "./talentTable";
import { makeTitleWithAllPositionTypes, getSexTitle, getAvatarFromTalentInfo } from 'utils/appUtils';
import Panel from "components/general/panel";
import styles from 'styles';


class TalentSearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      availableTalents: [],
      nearAvailableTalents: []
    }
  };

  getInfoFromProps(props) {
    const { talentSearchResult } = props;
    let availableTalents = [];
    let nearAvailableTalents = [];

    if (talentSearchResult) {
      console.log('==== talent search result: ', talentSearchResult);
      for(let i = 0; i < talentSearchResult.length; i ++) {
        let talent = talentSearchResult[i];
        if (talent.profile_status.is_completed_profile) {
          availableTalents.push(talent);
        } else {
          nearAvailableTalents.push(talent);
        }
      }
    }

    return {
      availableTalents,
      nearAvailableTalents
    };
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
    const { classes } = this.props;
    const { availableTalents, nearAvailableTalents } = this.state;

    return(
      <div>
        {
          availableTalents.length > 0 &&
          <Panel>
            <Grid container spacing={24}>
              <Grid item xs={12} >
                <TalentTable talents={availableTalents} />
              </Grid>
              <Grid item xs={12} />
            </Grid>
          </Panel>
        }
        {
          nearAvailableTalents.length > 0 &&
          <Panel
            title="NEAR AVAILABLE(Availability within 14 Days of Specified Contract Start and/or End Date)"
            bold={true}
          >
            <Grid container spacing={24}>
              <Grid item xs={12} >
                <TalentTable talents={nearAvailableTalents} />
              </Grid>
            </Grid>
          </Panel>
        }
      </div>
    )
  }

  render() {
    return (
      <ClientForm
        formTitle="Search Result"
        formSubTitle="Click Picture to View FullProfile"
        backLink="/client/home"
        backButtonTitle="Back to My Home Page"
        nextLink="/client/talent_search"
        nextButtonTitle="Back to Talent Search"
        handleClickNextButton={this.handleClickNextButton}
      >
        {this.renderContent()}
      </ClientForm>
    )
  }
}


function mapStateToProps(state) {
  const { talentSearchResult } = state;
  return {
    talentSearchResult: talentSearchResult && talentSearchResult.value ? talentSearchResult.value : null
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TalentSearchResult));