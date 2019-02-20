import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import ClientForm from 'components/shiptalent/forms/clientForm';
import { styles } from 'styles';

class ClientVideoForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentWillMount() {
    // this.props.talentActions.getCurrentTalentInfo()
  }

  handleClickNextButton = (event) => {
    const { handleClickNextButton } = this.props

    if (handleClickNextButton) {
      handleClickNextButton(event)
    }
  };

  renderContents() {
    const {
      ContentLayout, contentTitle,
      talent, position, subSkill,
      fromWizard, formTitle
    } = this.props;

    return (
      <ContentLayout
        contentTitle={contentTitle}
        talent={talent}
        position={position}
        subSkill={subSkill}
        fromWizard={fromWizard}
        formTitle={formTitle}
      />
    )
  }

  render() {
    const {
      formTitle, formSubTitle,
      backLink, backButtonTitle, handleClickBackButton,
      nextLink, nextButtonTitle, handleClickNextButton,
      talent
    } = this.props

    return (
      <div>
        <ClientForm
          formTitle={formTitle}
          formSubTitle={formSubTitle}
          backLink={backLink}
          backButtonTitle={backButtonTitle}
          handleClickBackButton={handleClickBackButton}
          nextLink={nextLink}
          nextButtonTitle={nextButtonTitle}
          handleClickNextButton={(e) => {this.handleClickNextButton(e)}}
          talent={talent}
        >
          {this.renderContents()}
        </ClientForm>
      </div>
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
    // talentActions: bindActionCreators(talentActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ClientVideoForm));
