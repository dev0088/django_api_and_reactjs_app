import React, {Component} from 'react'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import DatePicker from 'react-datepicker';
import uuidv1 from "uuid";
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import {Redirect} from 'react-router';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ClientForm from 'components/shiptalent/forms/clientForm';
import Constant from 'constants/talent.search';
import * as clientActions from 'actions/clientActions';
import * as talentActions from 'actions/talentActions';
import Panel from "components/general/panel";
import GenderSelection from './GenderSelection';
import PositionsSelection from './PositionsSelection';
import styles from 'styles';
import '../client.css';


class TalentSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allPositionTypes: props.allPositionTypes,
      allSkills: props.allSkills,
      talent_name: '',
      talent_tid: '',
      talent_id: '',
      talent_name_or_tid: '',
      sexes: [],
      position_ids: [],
      position_sub_type_ids: [],
      skill_ids: [],
      sub_skill_ids: [],
      availability: {},
      ages: [],
      heights: [],
      languages: [],
      ratings: []
    }
  }

  componentWillMount = () => {
    this.props.talentActions.getAllPositionTypes();
    this.props.talentActions.getAllSkills();
  }

  componentWillReceiveProps = (nextProps) => {
    const { allPositionTypes, allSkills } = nextProps;
    this.setState({ allPositionTypes, allSkills });
  };


  renderSexes(sex) {
    let default_css = 'master-select master-select-deselected noselect ';

    if (sex === '') {
      default_css += 'invisible';
      return default_css
    }
    else
      return default_css
  }

  renderCando(eachdo) {
    let default_css = 'master-select noselect master-select-deselected ';

    if (eachdo === '') {
      default_css += 'invisible';
      return default_css
    }
    else
      return default_css
  }

  renderAge(age) {
    if (age[0] === 51) {
      return age[0] + '+'
    } else {
      return age[0] + '~' + age[1]
    }
  }

  renderHeight(height) {
    if (height[0] === '0.0') {
      const q = height[1].split('.')[0];
      const r = height[1].split('.')[1];

      return '<' + q + '\' ' + r + '\"'
    } else if (height[0] === '6.4') {
      const q = height[0].split('.')[0];
      const r = height[0].split('.')[1];

      return '>' + q + '\' ' + r + '\"'
    } else {
      const lh = height[0].split('.')[0] + '\' ' + height[0].split('.')[1] + '\"'
      const rh = height[1].split('.')[0] + '\' ' + height[1].split('.')[1] + '\"'

      return lh + '~' + rh
    }
  }

  renderRate(rate) {
    if (rate[0] == 0)
      return '<' + rate[1]
    else
      return rate[0] + '~' + rate[1]
  }

  handleChangeStartDate = (date) => {
    this.setState({
      startDate: date
    });
  };

  handleChangeEndDate = (date) => {
    this.setState({
      endDate: date
    })
  };

  onSearch = (e) => {
    e.preventDefault();
    console.log('==== onSearch: state: ', this.state);
    this.props.clientActions.talentSearch(this.state);
    this.props.history.push('/client/talent_search_result');
  };

  goClientHomeScreen = () => {
    window.location.href = "/client/home"
  };

  // Toggle search features
  onToggle = (e) => {
    let tag = e.target;

    if (e.target.classList.contains("master-select-deselected")) {
      e.target.classList.remove("master-select-deselected");
      e.target.classList.add("master-select-selected");
    } else {
      e.target.classList.remove("master-select-selected");
      e.target.classList.add("master-select-deselected");
    }
  };

  // change state value according to toggle
  onChangeState = (e, state, index) => {
    if (e.target.classList.contains("master-select-selected")) {
      state.push(index)
    } else {
      let index = state.indexOf(index);
      if (index > -1) {
        state.splice(index, 1);
      }
    }
  };

  onChangeCheckboxState = (e, state) => {
    if (e.target.checked) {
      state.push(e.target.value);
    } else {
      let index = state.indexOf(e.target.value)
      if (index > -1) {
        state.splice(index, 1);
      }
    }
  };

  onChangeGender = (genders) => this.setState({sexes: genders});

  onClickType = (e, index) => {
    this.onToggle(e);
    this.onChangeState(e, this.state.position_ids, index);
  };

  onClickSubType = (e, index) => {
    this.onToggle(e);
    this.onChangeState(e, this.state.sub_type_list, index);
  };

  onClickCanDo = (e, index) => {
    this.onToggle(e);
    this.onChangeState(e, this.state.master_role_list, index);
  };

  onClickSubCanDo = (e, index) => {
    this.onToggle(e);
    this.onChangeState(e, this.state.sub_role_list, index);
  };

  onClickAge = (e) => {
    this.onChangeCheckboxState(e, this.state.ages);
  };

  onClickHeight = (e) => {
    this.onChangeCheckboxState(e, this.state.heights)
  };

  onClickLang = (e, index) => {
    if (e.target.checked) {
      this.state.languages.push(index);
    } else {
      let index = this.state.languages.indexOf(index);
      if (index > -1) {
        this.state.languages.splice(index, 1);
      }
    }
  };

  onChangeName = (e) => {
    this.state.talent_name = e.target.value;
  };

  onChangeId = (e) => {
    this.state.talent_tid = e.target.value;
  };

  onClickRating = (e) => {
    this.onChangeCheckboxState(e, this.state.ratings)
  };


  onChangePosition = (position) => {
    const { position_ids } = this.state;

    let newSelectedPositions = position_ids;
    let index = newSelectedPositions.indexOf(position);

    if ( index > -1) newSelectedPositions.splice(index, 1);
    else newSelectedPositions.push(position);

    this.setState({ position_ids: newSelectedPositions });
  };

  onChangeSubPosition = (subPosition) => {
    const { position_sub_type_ids } = this.state;

    let newSelectedSubPositions = position_sub_type_ids;
    let index = newSelectedSubPositions.indexOf(subPosition);

    if ( index > -1) newSelectedSubPositions.splice(index, 1);
    else newSelectedSubPositions.push(subPosition);

    this.setState({ position_sub_type_ids: newSelectedSubPositions });
  };

  renderContent = () => {
    const { classes } = this.props;
    const { allPositionTypes } = this.state;

    return (
      <Panel>
        <Grid container spacing={16} justify="flex-start" alignItems="center">
          <Grid item lg={12} md={12} sm={12} xs={12} >
            <Typography className={classes.clientFormSubTitle}>
              {`I need a...`}
            </Typography>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12} >
            <GenderSelection onChange={(genders) => this.onChangeGender(genders)} />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12} >
            <PositionsSelection
              loading={!allPositionTypes.isFetched}
              positions={allPositionTypes && allPositionTypes.value}
              onChangePosition={(position) => this.onChangePosition(position)}
              onChangeSubPosition={(subPosition) => this.onChangeSubPosition(subPosition)}
            />
          </Grid>
        </Grid>

        <form onSubmit={this.onSearch}>
          <div className="master-title mb-1 mt-3">Who also...</div>
          <div className="d-flex justify-content-between mb-1">
            {Constant.cando.map(eachdo => (
              <div key={uuidv1()} className={this.renderCando(eachdo)}
                   onClick={(e) => this.onClickCanDo(e, eachdo.key)}>{eachdo.value}</div>
            ))}
          </div>
          <div className="d-flex justify-content-between">
            {Constant.subCandos.map(subcando => (
              <div key={uuidv1()} className="master-select-empty d-flex flex-wrap">
                {subcando.map(eachcando => (
                  <div key={uuidv1()} className="sub-select noselect master-select-deselected"
                       onClick={(e) => this.onClickSubCanDo(e, eachcando.key)}>{eachcando.value}</div>
                ))}
              </div>
            ))}
          </div>

          <div className="master-title mb-1 mt-3">And is available...</div>
          <div className="d-flex">
            <div className="mr-2">Between</div>
            <DatePicker className="mr-4" selected={this.state.startDate} onChange={this.handleChangeStartDate}
                        dropdownMode="scroll"/>
            <div className="mr-2">And</div>
            <DatePicker selected={this.state.endDate} onChange={this.handleChangeEndDate}
                        dropdownMode="scroll"/>
          </div>

          <div className="master-title mb-1 mt-3">Age Range (select all that apply)</div>
          <div className="d-flex">
            {Constant.ages.map(age => (
              <div key={uuidv1()} className="mr-3">
                <input className="mr-1" type="checkbox" value={age} onChange={this.onClickAge}/>
                {this.renderAge(age)}
              </div>
            ))}
          </div>

          <div className="master-title mb-1 mt-3">Height (select all that apply)</div>
          <div className="d-flex">
            {Constant.heights.map(height => (
              <div key={uuidv1()} className="mr-3">
                <input className="mr-1" type="checkbox" value={height} onClick={this.onClickHeight}/>
                {this.renderHeight(height)}
              </div>
            ))}
          </div>

          <div className="master-title mb-1 mt-3">Languages Spoken (select all that apply)</div>
          <div className="d-flex">
            {Constant.langs.map(lang => (
              <div key={uuidv1()} className="mr-3">
                <input className="mr-1" type="checkbox" onClick={(e) => this.onClickLang(e, lang.key)}/>
                {lang.value}
              </div>
            ))}
          </div>

          <div className="master-title mb-1 mt-3">Average Cruise Line Rating (select all that apply)</div>
          <div className="d-flex">
            {Constant.ratings.map(rate => (
              <div key={uuidv1()} className="mr-3">
                <input className="mr-1" type="checkbox" value={rate} onClick={this.onClickRating}/>
                {this.renderRate(rate)}
              </div>
            ))}
          </div>

          <div className="master-title mb-1 mt-3">Already know who you're looking for?</div>
          <div className="row mb-5">
            <div className="col-5">
              <div className="d-flex">
                <small>SEARCH BY NAME:</small>
                <input className="form-control form-control-sm" width="100%" type="text" onChange={this.onChangeName}/>
              </div>
              <div className="d-flex">
                <small>SEARCH BY TALENT ID:</small>
                <input className="form-control form-control-sm" type="text" onChange={this.onChangeId}/>
              </div>
            </div>
            <div className="col-7 my-auto">
              <button type="submit" className="btn btn-primary">Search</button>
            </div>
          </div>
        </form>
      </Panel>
    )
  };

  render() {
    return (
      <ClientForm
        formTitle="Talent Search"
        backLink="/client/home"
        backButtonTitle="Back to My Home Page"
      >
        {this.renderContent()}
      </ClientForm>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    clientActions: bindActionCreators(clientActions, dispatch),
    talentActions: bindActionCreators(talentActions, dispatch)
  }
};

const mapStateToProps = state => {
  const { talentSearchResult, allPositionTypes, allSkills } = state;
  return {
    talentSearchResult: talentSearchResult && talentSearchResult.value ? talentSearchResult.value : null,
    allPositionTypes,
    allSkills
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TalentSearch))