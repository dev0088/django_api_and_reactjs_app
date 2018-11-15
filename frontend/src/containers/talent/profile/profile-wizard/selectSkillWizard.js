import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Panel from 'components/general/panel';
import { withStyles } from '@material-ui/core/styles';
import WizardSettingHeader from 'components/shiptalent/headers/wizardSettingHeader';
import TalentForm from 'components/shiptalent/forms/talentForm';
import defaultValues from 'constants/defaultValues';
import * as talentActions from 'actions/talentActions';
import TalentAPI from 'apis/talentAPIs';
import styles from 'styles';

class SelectSkillWizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allPositionTypes: [],
      selectedPositionType: null
    }
  }

  getInfoFromProps(props) {
    const { talentInfo, allPositionTypes } = props
    let res = {
      allPositionTypes: [],
      selectedPositionType: null
    }

    if (talentInfo) {
      res.allPositionTypes = allPositionTypes ? allPositionTypes : []
      if (talentInfo.talent_position_types && talentInfo.talent_position_types.length > 0) {
        res.selectedPositionType =  talentInfo.talent_position_types[0].position_type
      } else if (talentInfo.talent_position_sub_types && talentInfo.talent_position_sub_types.length > 0 &&
        talentInfo.talent_position_sub_types[0].position_sub_type) {
        res.selectedPositionType = talentInfo.talent_position_sub_types[0].position_sub_type.position_type
      }
    }

    return res
  }

  componentWillMount() {
    this.props.talentActions.getAllPositionTypes()
    this.props.talentActions.getCurrentTalentInfo()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.getInfoFromProps(nextProps)
    })
  }

  handleClickPositionTypeButton = (type, val) =>  {
    this.setState({ [type]: val});
  }

  handleClickNextButton = () => {
    const { selectedPositionType } = this.state
    const { auth } = this.props
    console.log('==== selectedPositionType: ', selectedPositionType)
    let data = {
      talent_position_type: selectedPositionType,
    }

    TalentAPI.saveTalentInfo(auth.user_id, data, this.handleNextResponse)
  }

  handleNextResponse = (response, isFailed) => {
    console.log('==== response: ', response, isFailed)
    const { auth } = this.props
    this.props.talentActions.getCurrentTalentInfo(auth.user_id)
  }

  getPrefixByWord(positionTypeName) {
    let firstLetter = positionTypeName.substring(0, 1)
    let res = 'a'

    if (firstLetter === 'A' || firstLetter === 'a' ||
      firstLetter === 'E' || firstLetter === 'e' ||
      firstLetter === 'I' ||  firstLetter === 'i' ||
      firstLetter === 'O' ||  firstLetter === 'o' ||
      firstLetter === 'U' ||  firstLetter === 'u' ||
      firstLetter === 'W' ||  firstLetter === 'w' ||
      firstLetter === 'Y' ||  firstLetter === 'y'
    ) {
      res = 'an'
    }

    return res
  }

  renderContents() {
    const { allPositionTypes, selectedPositionType } = this.state
    const { classes } = this.props;

    return (
      <Panel title={"Step 4"}>
        <WizardSettingHeader
          talentInfo={this.props.talentInfo}
          showSex={true}
          showPositionType={true}
          showSkill={false}
        />
        <h5 align="center" className="profile-bio-description">
          {"Next, tell us what your primary position is "}
        </h5>
        <h5 align="center" className="profile-bio-description">
          {"(select one)"}
        </h5>
        <br/>

        <Grid container className={classes.root} spacing={16}>
          {
            allPositionTypes.map((positionType, index) => {
              if (positionType.name !== defaultValues.DEFAULT_PRACTICE_POSITION_TYPE) {
                return (
                  <Grid item xs={6} key={index}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={"home-button"}
                      disabled={(positionType.name === selectedPositionType)}
                      fullWidth={false}
                      onClick={() => this.handleClickPositionTypeButton('selectedPositionType', positionType.name)}
                    >
                      <div className="home-button-title-only">
                        {`I am ${this.getPrefixByWord(positionType.name)} ${positionType.name}`}
                      </div>
                    </Button>
                  </Grid>
                )
              }
            })
          }
        </Grid>
      </Panel>
    )
  }

  render() {
    return (
      <TalentForm
        formTitle="Build My Profile Wizard"
        backLink="/profile-wizard/select-position-sub-type"
        backButtonTitle="Back"
        nextLink="/profile-wizard/select-sub-skill"
        nextButtonTitle="Next"
        handleClickNextButton={this.handleClickNextButton}
        contents={this.renderContents()}
      />
    )
  }
}

function mapStateToProps(state) {
  const { auth, talentInfo, allPositionTypes } = state;

  return {
    auth: auth.access,
    talentInfo: talentInfo.value,
    allPositionTypes: allPositionTypes.value
  }
}

function mapDispatchToProps(dispatch) {
  return {
    talentActions: bindActionCreators(talentActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SelectSkillWizard));
