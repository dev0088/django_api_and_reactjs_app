import React, {Component} from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import Button from '@material-ui/core/Button';
import Panel from '../../components/panel';
import defaultValues from '../../constants/defaultValues';
import * as talentActions from  '../../actions/talentActions';
import TalentAPI from '../../apis/talentAPIs';


class SelectPositionTypeWizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allPositionTypes: [],
      selectedPositionType: null,
      selectedPositionSubType: [],
      multiSelection: false
    }
  }

  getInfoFromProps(props) {
    const { talentInfo, allPositionTypes } = props
    let res = {
      allPositionTypes: [],
      selectedPositionType: null
    }

    if (talentInfo) {
      res = {
        allPositionTypes: allPositionTypes ? allPositionTypes : [],
        selectedPositionType: talentInfo.talent_position_sub_type.talent_position_type
      }
    }

    return res
  }

  componentWillMount() {
    this.props.talentActions.getTalentInfo(this.props.auth.user_id)
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
    let data = {
      // talent_position_type: selectedPositionType
    }

    TalentAPI.saveTalentInfo(auth.user_id, data, this.handleNextResponse)
  }

  handleNextResponse = (response, isFailed) => {
    console.log('==== response: ', response, isFailed)
    const { auth } = this.props

    this.props.talentActions.getTalentInfo(auth.user_id)
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
    const { allPositionTypes, selectedPositionType } = this.state

    return (
      <Panel title={"Build My Profile Wizard"}>
        <h5 align="center" className="profile-bio-description">
          {"Next, tell us what your primary position is "}
        </h5>
        <h5 align="center" className="profile-bio-description">
          {"(select one)"}
        </h5>
        <br/>
        {
          allPositionTypes.map((positionType, index) => {
            if (positionType.name !== defaultValues.DEFAULT_PRACTICE_POSITION_TYPE) {
              return (
                <Row className="profile-gender-row" key={index}>
                  <Col xs="12" md="4" className="pt-3 pt-md-3"/>
                  <Col xs="12" md="4" className="pt-0 pt-md-2">
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
                  </Col>
                  <Col xs="12" md="4" className="pt-3 pt-md-3"/>
                </Row>
              )
            }
          })
        }
      </Panel>
    )
  }

  render() {
    return (
      <div className="contact-info-view-container">
        {this.renderButtons()}
        <Row>
          <Col xs="4" md="4" className="pt-3 pt-md-3 profile-back-button-group-col">
            <Link to="/profile-wizard/select-male">
              <RaisedButton label="Back" primary={true}/>
            </Link>
          </Col>
          <Col xs="4" md="4" className="pt-4 pt-md-4" />
          <Col xs="4" md="4" className="pt-3 pt-md-3 profile-save-button-group-col">
            <Link to="/profile-wizard/select-position-type">
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectPositionTypeWizard);
