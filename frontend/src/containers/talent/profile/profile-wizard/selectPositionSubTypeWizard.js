import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Panel from 'components/general/panel';
import WizardSettingHeader from 'components/shiptalent/headers/wizardSettingHeader';
import TalentForm from 'components/shiptalent/forms/talentForm';
import Spacer from 'components/general/spacer';
import * as talentActions from 'actions/talentActions';
import TalentAPI from 'apis/talentAPIs';
import { findPositionTypeByName } from 'utils/appUtils';
import styles from 'styles';

class SelectPositionSubTypeWizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allPositionTypes: [],
      prevPositionType: null,
      selectedPositionType: null,
      singleSelectedPositionSubType: null,
    }
  }

  getInfoFromProps(props) {
    const { talentInfo, allPositionTypes } = props
    let res = {
      allPositionTypes: [],
      prevPositionType: null,
      selectedPositionType: null,
      singleSelectedPositionSubType: null
    }

    if (talentInfo) {
      res.allPositionTypes = allPositionTypes ? allPositionTypes : []
      if (talentInfo.talent_position_types && talentInfo.talent_position_types.length > 0) {
        res.selectedPositionType =  talentInfo.talent_position_types[0].position_type
      }
      
      res.prevPositionType = findPositionTypeByName(res.allPositionTypes, res.selectedPositionType)
      
      if (talentInfo.talent_position_sub_types && 
          talentInfo.talent_position_sub_types.length > 0 &&
          talentInfo.talent_position_sub_types[0].position_sub_type) {
        res.singleSelectedPositionSubType = talentInfo.talent_position_sub_types[0].position_sub_type.name
      }
    }

    return res
  }

  componentDidMount() {
    this.props.talentActions.getAllPositionTypes()

    this.setState({
      ...this.getInfoFromProps(this.props)
    }, () => {
      this.props.talentActions.getCurrentTalentInfo()
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.getInfoFromProps(nextProps)
    })
  }

  handleClickPositionSubTypeButton = (type, val) =>  {
    this.setState({ [type]: val});
  }

  handleClickNextButton = () => {
    const { selectedPositionType, singleSelectedPositionSubType } = this.state
    const { auth } = this.props
    let data = {
      talent_position_type: selectedPositionType,
      talent_position_sub_type: singleSelectedPositionSubType,
    }

    TalentAPI.saveTalentInfo(auth.user_id, data, this.handleNextResponse)
  }

  handleNextResponse = (response, isFailed) => {
    console.log('==== response: ', response, isFailed)
    const { auth } = this.props
    // this.props.talentActions.getCurrentTalentInfo(auth.user_id)
  }

  renderSubPositionButtons() {
    const { singleSelectedPositionSubType, prevPositionType } = this.state;
    const { classes } = this.props;
    let items = []

    if (prevPositionType && prevPositionType.position_sub_types) {
      let position_sub_types = prevPositionType.position_sub_types
      for(let i = 0; i < position_sub_types.length; i ++) {
        let positionSubType = position_sub_types[i]

        if (!positionSubType.wizard_button_title) {
          continue;
        }

        items.push(
          <Grid item lg={6} md={6} sm={6} xs={12} key={`subPosition${i}`}
                className={classes.talentProfileGuideButtonItem}>
            <Button
              variant="contained"
              color="primary"
              className={
                positionSubType === singleSelectedPositionSubType
                  ? classes.talentProfileGuideButtonSelected
                  : classes.talentProfileGuideButton
              }
              fullWidth={true}
              onClick={() => this.handleClickPositionSubTypeButton(
                'singleSelectedPositionSubType', positionSubType
              )}
            >
              <Typography className={classes.talentProfileGuideButtonTitle}>
                { positionSubType.wizard_button_title }
              </Typography>
            </Button>
          </Grid>
        )
      }
    }

    return (
      <Grid container spacing={16} >
        { items }
      </Grid>
    )
  }


  renderContents() {
    const { singleSelectedPositionSubType, prevPositionType } = this.state;
    const { classes } = this.props;
    
    return (
      <Panel title={"Step 3"}>
        <WizardSettingHeader
          talentInfo={this.props.talentInfo}
          showSex={true}
          showPositionType={true}
          showSkill={false}
        />
        <Spacer size={15} />
        <Grid container className={classes.root} spacing={24}>
          <Grid item md={12}>
            <Typography className={classes.wizardSettingSubTitle}>
              {prevPositionType && (prevPositionType.question ? prevPositionType.question : '')}
            </Typography>
          </Grid>
          <Grid item md={12}>
            <h5 align="center" className="profile-bio-description">
              {
                prevPositionType && (prevPositionType.multi_selection
                  ? "(select all that apply)"
                  : "(select one)")
              }
            </h5>
          </Grid>
        </Grid>
        <Spacer size={15} />
        <Grid container spacing={16} direction="row" justify="center" alignItems="center">
          <Grid item lg={3} md={2} sm={1} xs={2} />
          <Grid item lg={6} md={8} sm={10} xs={8} >
            { this.renderSubPositionButtons() }
          </Grid>
          <Grid item lg={3} md={2} sm={1} xs={2} />
        </Grid>
      </Panel>
    )
  }

  render() {
    return (
      <TalentForm
        backLink="/profile-wizard/select-position-type"
        nextLink="/profile-wizard/select-skill"
        handleClickNextButton={this.handleClickNextButton}
      >
        {this.renderContents()}
      </TalentForm>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SelectPositionSubTypeWizard));
