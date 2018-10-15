import React, {Component} from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import Button from '@material-ui/core/Button';
import Panel from '../../../components/panel';
import defaultValues from '../../../constants/defaultValues';
import * as talentActions from '../../../actions/talentActions';
import TalentAPI from '../../../apis/talentAPIs';


class SelectMaleWizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: props.talentInfo && (props.talentInfo.sex === 'm') ?
							"Male" : "Female"
    }
  }

	getInfoFromProps(props) {
		const { talentInfo } = props
		if (talentInfo) {
			this.setState({
				gender: talentInfo.sex === 'm' ? "Male" : "Female"
			})
		}
	}

	componentWillMount() {
    this.props.talentActions.getTalentInfo(this.props.auth.user_id)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.getInfoFromProps(nextProps)
    })
  }

  handleClickGenderButton = (type, val) =>  {
    this.setState({ [type]: val});
  }

	handleClickNextButton = () => {
		const { gender } = this.state
		const { auth } = this.props

    let data = {
      sex: gender === "Male" ? "m" : "f",
    }

    TalentAPI.saveTalentInfo(auth.user_id, data, this.handleNextResponse)
	}

	handleNextResponse = (response, isFailed) => {
    console.log('==== response: ', response, isFailed)
  }

  renderButtons() {

    return (
      <Panel title={"Build My Profile Wizard"}>
        <h5 align="center" className="profile-bio-description">
          {"First, tell us if you are Male or Female"}
        </h5>
        <h5 align="center" className="profile-bio-description">
          {"(select one)"}
        </h5>
        <br/>
        {
          defaultValues.GENDERS.map((gender, index) => {
            return (
							<Row className="profile-gender-row" key={index}>
			          <Col xs="12" md="4" className="pt-3 pt-md-3" />
			          <Col xs="12" md="4" className="pt-0 pt-md-2">
									<Button
										variant="contained"
										color="primary"
										className={"home-button"}
										disabled={(gender === this.state.gender)}
										fullWidth={false}
										onClick={() => this.handleClickGenderButton('gender', gender)}
									>
		                <div className="home-button-title-only">
		                  {`I am a ${gender}`}
		                </div>
		              </Button>
								</Col>
								<Col xs="12" md="4" className="pt-3 pt-md-3" />
			        </Row>
						)
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
            <Link to="/profile-wizard/welcome">
              <RaisedButton label="Back" primary={true}/>
            </Link>
          </Col>
          <Col xs="4" md="4" className="pt-4 pt-md-4"> </Col>
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
  const { auth, talentInfo } = state;
  return {
		auth: auth.access,
    talentInfo: talentInfo.value,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    talentActions: bindActionCreators(talentActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectMaleWizard);
