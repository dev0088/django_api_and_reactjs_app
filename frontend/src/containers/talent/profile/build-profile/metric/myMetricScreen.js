import React, {Component} from 'react';
import TalentBuildProfileForm from 'components/shiptalent/forms/talentBuildProfileForm';
import TalentMetricForm from './talentMetricForm';
import TalentAPI from 'apis/talentAPIs'

class MyMetrics extends Component {
  render() {
    return (
      <TalentBuildProfileForm
        ContentLayout={TalentMetricForm}
        formTitle={"My Height, Weight, & Age Range"}
        nextLink={"/edit-profile"}
        nextButtonTitle={"Back to Build/Edit My Profile"}
        saveInfoAPI={TalentAPI.saveTalentInfoWithToken}
      />
    )
  }
}

export default MyMetrics;
