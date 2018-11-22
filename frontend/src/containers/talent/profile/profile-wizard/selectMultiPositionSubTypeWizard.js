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

class SelectMultiPositionSubTypeWizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allPositionTypes: [],
      prevPositionType: null,
      selectedPositionType: null,
      multiSelectedPositionSubType: []
    }
  }

  getInfoFromProps(props) {
    const { talentInfo, allPositionTypes } = props
    let res = {
      allPositionTypes: [],
      prevPositionType: null,
      selectedPositionType: null,
      multiSelectedPositionSubType: []
    }

    if (talentInfo) {
      res.allPositionTypes = allPositionTypes ? allPositionTypes : []

      if (talentInfo.talent_position_types &&
        talentInfo.talent_position_types.length > 0) {
        res.selectedPositionType =  talentInfo.talent_position_types[0].position_type
        res.prevPositionType = findPositionTypeByName(res.allPositionTypes, res.selectedPositionType)
        console.log('==== res.selectedPositionType: ', res.selectedPositionType)
      }

      if (talentInfo.talent_position_sub_types &&
          talentInfo.talent_position_sub_types.length > 0 &&
          res.prevPositionType) {
        let talent_position_sub_types = talentInfo.talent_position_sub_types
        for (let i = 0; i < talent_position_sub_types.length; i ++) {
          res.multiSelectedPositionSubType.push(talent_position_sub_types[i].position_sub_type.name)
        }
      }
    }

    console.log('==== Multi: getInfoFromProps: res: ', res)

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
    const { multiSelectedPositionSubType } = this.state
    let selectPositionSubTypes = multiSelectedPositionSubType
    let index = selectPositionSubTypes.indexOf(val)

    if ( index >= 0) {
      selectPositionSubTypes.splice(index, 1);
    } else {
      selectPositionSubTypes.push(val)
    }

    this.setState({ multiSelectedPositionSubType: selectPositionSubTypes});
  }

  handleClickNextButton = () => {
    const { selectedPositionType, multiSelectedPositionSubType } = this.state
    const { auth } = this.props
    console.log('==== multiSelectedPositionSubType: ', multiSelectedPositionSubType)
    let data = {
      talent_position_type: selectedPositionType,
      talent_position_sub_types: multiSelectedPositionSubType,
    }

    TalentAPI.saveTalentInfo(auth.user_id, data, this.handleNextResponse)
  }

  handleNextResponse = (response, isFailed) => {
    console.log('==== response: ', response, isFailed)
    const { auth } = this.props
    // this.props.talentActions.getCurrentTalentInfo(auth.user_id)
  }

  renderSubPositionButtons() {
    const { multiSelectedPositionSubType, prevPositionType } = this.state;
    const { classes } = this.props;
    let items = []

    if (prevPositionType && prevPositionType.position_sub_types) {
      let position_sub_types = prevPositionType.position_sub_types
      for(let i = 0; i < position_sub_types.length; i +=2) {
        let positionSubType1 = position_sub_types[i]

        items.push(<Grid item lg={3} md={2} sm={1} xs={0} />)
        items.push(
          <Grid
            item lg={3} md={4} sm={5} xs={12}
            className={classes.talentProfileGuideButtonItem}
          >
            <Button
              variant="contained"
              color="primary"
              className={
                multiSelectedPositionSubType.indexOf(positionSubType1) >= 0
                  ? classes.talentProfileGuideButtonSelected
                  : classes.talentProfileGuideButton
              }
              fullWidth={true}
              onClick={() => this.handleClickPositionSubTypeButton(
                'multiSelectedPositionSubType', positionSubType1
              )}
            >
              <Typography className={classes.talentProfileGuideButtonTitle}>
                { positionSubType1 }
              </Typography>
            </Button>
          </Grid>
        )

        if (position_sub_types[i + 1]) {
          let positionSubType2 = position_sub_types[i + 1]

          items.push(
            <Grid
              item lg={3} md={4} sm={5} xs={12}
              className={classes.talentProfileGuideButtonItem}
            >
              <Button
                variant="contained"
                color="primary"
                className={
                  multiSelectedPositionSubType.indexOf(positionSubType2) >= 0
                    ? classes.talentProfileGuideButtonSelected
                    : classes.talentProfileGuideButton
                }
                fullWidth={true}
                onClick={() => this.handleClickPositionSubTypeButton(
                  'multiSelectedPositionSubType', positionSubType2
                )}
              >
                <Typography className={classes.talentProfileGuideButtonTitle}>
                  { positionSubType2 }
                </Typography>
              </Button>
            </Grid>
          )
        } else {
          items.push(<Grid item lg={3} md={4} sm={5} xs={12}/>)
        }
        items.push(<Grid item lg={3} md={2} sm={1} xs={0} />)
      }
      return items
    }

    return (<div/>)
  }


  renderContents() {
    const { multiSelectedPositionSubType, prevPositionType } = this.state;
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
        <Grid container className={classes.root} spacing={30}>
          <Grid item md={12}>
            <h5 align="center" className="profile-bio-description">
              {prevPositionType && (prevPositionType.question ? prevPositionType.question : '')}
            </h5>
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
        <Grid container spacing={16} justify="center" alignItems="center">
          { this.renderSubPositionButtons() }
        </Grid>
      </Panel>
    )
  }

  render() {
    return (
      <TalentForm
        backLink="/profile-wizard/select-position-type"
        nextLink="/profile-wizard/lastWizard"
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SelectMultiPositionSubTypeWizard));
