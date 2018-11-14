import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import TalentForm from 'components/shiptalent/forms/talentForm';
import * as talentActions from 'actions/talentActions';
import TalentAPI from 'apis/talentAPIs'
import TalentContactInfoForm from './talentContactInfoForm';
import ConfirmChangesDialog from 'components/shiptalent/dialogs/confirmChangesDialog';
import 'react-dropdown/style.css';
import './myContactInfo.css';
import { styles } from 'styles';

class MyContactInfo extends Component {

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
  }

  handleClickSave = (userID, data, handler) => {
    TalentAPI.saveTalentInfo(userID, data, handler)
    // this.props.talentActions.getCurrentTalentInfo()
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
    return (
      <TalentContactInfoForm
        talentInfo={this.props.talentInfo}
        onSave={this.handleClickSave}
        onChange={this.handleChange}
      />
    )
  }

  render() {
    const { showConfirmChanges } = this.state

    return (
      <div>
        <TalentForm
          formTitle="My Contact Info"
          nextLink="/edit-profile"
          nextButtonTitle="Back to Build/Edit My Profile"
          handleClickNextButton={this.checkChanges}
          contents={this.renderContents()}
        />
        <ConfirmChangesDialog
          open={showConfirmChanges}
          onClose={this.handleCloseConfirm}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { auth, talentReducer,  talentInfo } = state;
  return {
    auth,
    talentReducer,
    talentInfo: talentInfo.value
  }
}

function mapDispatchToProps(dispatch) {
  return {
    talentActions: bindActionCreators(talentActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MyContactInfo));
