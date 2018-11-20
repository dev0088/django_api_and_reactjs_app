import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import TalentForm from 'components/shiptalent/forms/talentForm';
import * as talentActions from 'actions/talentActions';
import TalentAPI from 'apis/talentAPIs'
import ConfirmChangesDialog from 'components/shiptalent/dialogs/confirmChangesDialog';
import { styles } from 'styles';

class TalentBuildProfileForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isChanged: false,
      showConfirmChanges: false
    }
  }

  componentWillMount() {
    this.props.talentActions.getCurrentTalentInfo()
  }

  handleChange = (isChanged) => {
    this.setState({ isChanged })
  };

  handleClickSave = (data, handler) => {
    const { saveInfoAPI } = this.props
    saveInfoAPI(data, handler)
  };

  checkChanges = (event) => {
    const { isChanged } = this.state

    if (isChanged) {
      event.preventDefault()
      this.setState({
        showConfirmChanges: true
      })
    }
  };

  handleCloseConfirm = () => {
    this.setState({
      showConfirmChanges: false
    })
  };

  renderContents() {
    const { ContentLayout, contentTitle } = this.props

    return (
      <ContentLayout
        contentTitle={contentTitle}
        talentInfo={this.props.talentInfo}
        position={this.props.position}
        subPosition={this.props.subPosition}
        onSave={this.handleClickSave}
        onChange={this.handleChange}
      />
    )
  }

  render() {
    const {
      formTitle, formSubTitle,
      backLink, backButtonTitle, handleClickBackButton,
      nextLink, nextButtonTitle, handleClickNextButton
    } = this.props
    const { showConfirmChanges } = this.state

    return (
      <div>
        <TalentForm
          formTitle={formTitle}
          formSubTitle={formSubTitle}
          backLink={backLink}
          backButtonTitle={backButtonTitle}
          handleClickBackButton={handleClickBackButton}
          nextLink={nextLink}
          nextButtonTitle={nextButtonTitle}
          handleClickNextButton={this.checkChanges}
        >
          {this.renderContents()}
        </TalentForm>
        <ConfirmChangesDialog
          open={showConfirmChanges}
          onClose={this.handleCloseConfirm}
        />
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
    talentActions: bindActionCreators(talentActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TalentBuildProfileForm));
