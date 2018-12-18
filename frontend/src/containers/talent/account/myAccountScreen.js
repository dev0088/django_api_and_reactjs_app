import React, {Component} from 'react';
import TalentBuildProfileForm from 'components/shiptalent/forms/talentBuildProfileForm';
import TalentAccountForm from './talentAccountForm';


class MyAccount extends Component {
  render() {
    return (
      <TalentBuildProfileForm
        ContentLayout={TalentAccountForm}
        formTitle={"My Account"}
        nextLink={"/home"}
        nextButtonTitle={"Back to My Home Page"}
      />
    )
  }
}

export default MyAccount;
