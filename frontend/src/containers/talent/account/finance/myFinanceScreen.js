import React, {Component} from 'react';
import TalentBuildProfileForm from 'components/shiptalent/forms/talentBuildProfileForm';
import TalentFinanceForm from './talentFinanceForm';


class MyFinance extends Component {
  render() {
    return (
      <TalentBuildProfileForm
        ContentLayout={TalentFinanceForm}
        formTitle={"My Finance"}
        nextLink={"/my-account"}
        nextButtonTitle={"Back to My Account"}
        fullWidth={true}
      />
    )
  }
}

export default MyFinance;
