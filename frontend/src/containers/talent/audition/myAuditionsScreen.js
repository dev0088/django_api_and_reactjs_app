import React, {Component} from 'react';
import TalentBuildProfileForm from 'components/shiptalent/forms/talentBuildProfileForm';
import MyAuditionsForm from './myAuditionsForm';


class MyAuditions extends Component {

  handleClickNextButton = (event) => {
    event.preventDefault();
    this.props.history.goBack();
  };

  render() {
    const nextLink = '/home'

    return (
      <TalentBuildProfileForm
        ContentLayout={MyAuditionsForm}
        formTitle={"My Auditions"}
        nextLink={nextLink}
        nextButtonTitle={`Back to My Home Page`}
        handleClickNextButton={this.handleClickNextButton}
      />
    )
  }
}

export default MyAuditions;
