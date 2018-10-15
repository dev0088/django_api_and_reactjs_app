import React, {Component} from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Panel from '../../../components/panel';
import { withStyles } from '@material-ui/core/styles';
import defaultValues from '../../../constants/defaultValues';
import * as talentActions from '../../../actions/talentActions';
import TalentAPI from '../../../apis/talentAPIs';
import styles from '../../../styles.js';

class SelectPositionSubTypeWizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allPositionTypes: [],
      currentPositionType: null,
      selectedPositionType: null,
      selectedPositionSubType: null
    }
  }

  getInfoFromProps(props) {
    const { talentInfo, allPositionTypes } = props
    let res = {
      allPositionTypes: [],
      currentPositionType: null,
      selectedPositionType: null,
      selectedPositionSubType: null
    }

    if (talentInfo) {
      res.allPositionTypes = allPositionTypes ? allPositionTypes : []
      if (talentInfo.talent_position_types && talentInfo.talent_position_types.length > 0) {
        res.selectedPositionType =  talentInfo.talent_position_types[0].position_type
        console.log('==== res.selectedPositionType: ', res.selectedPositionType)
      }
      if (talentInfo.talent_position_sub_types && talentInfo.talent_position_sub_types.length > 0 &&
        talentInfo.talent_position_sub_types[0].position_sub_type) {
        res.selectedPositionType = talentInfo.talent_position_sub_types[0].position_sub_type.position_type
        res.selectedPositionSubType = talentInfo.talent_position_sub_types[0].position_sub_type.name
        console.log('==== 1res.selectedPositionType: ', res.selectedPositionType)
      }
    }
    res.currentPositionType = this.findPositionTypeByName(res.allPositionTypes, res.selectedPositionType)
    console.log('==== getInfoFromProps: res: ', res)

    return res
  }

  findPositionTypeByName(allPositionTypes, name) {
    return allPositionTypes.find(function(positionType) {
      return positionType.name === name;
    });
  }

  componentDidMount() {
    this.props.talentActions.getAllPositionTypes()
    console.log('==== props: ', this.props)

    this.setState({
      ...this.getInfoFromProps(this.props)
    }, () => {
      const { auth } = this.props
      this.props.talentActions.getTalentInfo(auth.user_id)
    })


  }

  componentWillReceiveProps(nextProps) {
    console.log('==== componentWillReceiveProps')
    this.setState({
      ...this.getInfoFromProps(nextProps)
    })
  }

  handleClickPositionSubTypeButton = (type, val) =>  {
    this.setState({ [type]: val});
  }

  handleClickNextButton = () => {
    const { selectedPositionType, selectedPositionSubType } = this.state
    const { auth } = this.props
    console.log('==== selectedPositionSubType: ', selectedPositionSubType)
    let data = {
      talent_position_type: selectedPositionType,
      talent_position_sub_type: selectedPositionSubType,
    }

    TalentAPI.saveTalentInfo(auth.user_id, data, this.handleNextResponse)
  }

  handleNextResponse = (response, isFailed) => {
    console.log('==== response: ', response, isFailed)
    const { auth } = this.props
    // this.props.talentActions.getTalentInfo(auth.user_id)
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

  
  renderButtons() {
    const { selectedPositionSubType, currentPositionType } = this.state
    const { classes } = this.props;
    
    return (
      <Panel title={"Build My Profile Wizard"}>
        <h5 align="center" className="profile-bio-description">
          {`What is your ${selectedPositionSubType ? selectedPositionSubType.toLowerCase() : 'position sub type'} range?`}
        </h5>
        <h5 align="center" className="profile-bio-description">
          {currentPositionType && (currentPositionType.multi_selection ? "(select all that apply)" : "(select one)")}
        </h5>
        <br/>

        <Grid container className={classes.root} spacing={16}>
          {
            (currentPositionType && currentPositionType.position_sub_types) && 
              currentPositionType.position_sub_types.map((positionSubType, index) => {
                return (
                  <Grid item xs={6} key={index}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={"home-button"}
                      disabled={(positionSubType === selectedPositionSubType)}
                      fullWidth={false}
                      onClick={() => this.handleClickPositionSubTypeButton('selectedPositionSubType', positionSubType)}
                    >
                      <div className="home-button-title-only">
                        {positionSubType}
                      </div>
                    </Button>
                  </Grid>
                )
            })
          }
        </Grid>
      </Panel>
    )
  }

  render() {
    return (
      <div className="contact-info-view-container">
        {this.renderButtons()}
        <Row>
          <Col xs="4" md="4" className="pt-3 pt-md-3 profile-back-button-group-col">
            <Link to="/profile-wizard/select-position-type">
              <RaisedButton label="Back" primary={true}/>
            </Link>
          </Col>
          <Col xs="4" md="4" className="pt-4 pt-md-4" />
          <Col xs="4" md="4" className="pt-3 pt-md-3 profile-save-button-group-col">
            <Link to="/profile-wizard/lastWizard">
              <RaisedButton
                label="Next"
                primary={true}
                onClick={() => this.handleClickNextButton()} />
            </Link>
          </Col>
        </Row>
      </div>
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
