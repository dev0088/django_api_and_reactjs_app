import React, {Component} from 'react'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import DatePicker from 'react-datepicker';
import uuidv1 from "uuid";
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import {Redirect} from 'react-router';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Constant from 'constants/talent.search';
import {talentSearch} from 'actions/clientActions';
import styles from 'styles';
import '../client.css';


const mapDispatchToProps = dispatch => {
  return {
    getOnlineData: bindActionCreators(talentSearch, dispatch)
  }
};

const mapStateToProps = state => {
  const { talentSearchResult } = state
  return {
    talentSearchResult: talentSearchResult && talentSearchResult.value ? talentSearchResult.value : null
  }
};

class TalentSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sex_list: [],
      master_type_list: [],
      sub_type_list: [],
      master_role_list: [],
      sub_role_list: [],
      startDate: moment(),
      endDate: moment(),
      age_list: [],
      height_list: [],
      lang_list: [],
      rating_list: [],
      talent_name: '',
      talent_id: ''
    }
  }

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
    this.props.getOnlineData(this.state);
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

  onClickSex = (e, index) => {
    this.onToggle(e);
    this.onChangeState(e, this.state.sex_list, index);
  };

  onClickType = (e, index) => {
    this.onToggle(e);
    this.onChangeState(e, this.state.master_type_list, index);
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
    this.onChangeCheckboxState(e, this.state.age_list);
  };

  onClickHeight = (e) => {
    this.onChangeCheckboxState(e, this.state.height_list)
  };

  onClickLang = (e, index) => {
    if (e.target.checked) {
      this.state.lang_list.push(index);
    } else {
      let index = this.state.lang_list.indexOf(index);
      if (index > -1) {
        this.state.lang_list.splice(index, 1);
      }
    }
  };

  onChangeName = (e) => {
    this.state.talent_name = e.target.value;
  };

  onChangeId = (e) => {
    this.state.talent_id = e.target.value;
  };

  onClickRating = (e) => {
    this.onChangeCheckboxState(e, this.state.rating_list)
  };

  render() {

    return (
      <div>
        <div className="search-title text-center mt-4 mb-3">Talent Search</div>
        <div className="master-title mb-1">I need a...</div>
        <form onSubmit={this.onSearch}>
          <div className="d-flex justify-content-between mb-1">
            {Constant.sexes.map(sex => (
              <div key={uuidv1()} className={this.renderSexes(sex)}
                   onClick={(e) => this.onClickSex(e, sex.key)}>{sex.value}</div>
            ))}
          </div>
          <div className="d-flex justify-content-between mb-1">
            {Constant.types.map(type => (
              <div key={uuidv1()} className="master-select noselect master-select-deselected"
                   onClick={(e) => this.onClickType(e, type.key)}>{type.value}</div>
            ))}
          </div>
          <div className="d-flex justify-content-between">
            {Constant.subTypes.map((subtype, index) => (
              <div key={uuidv1()} className="master-select-empty d-flex flex-wrap">
                {subtype.map(eachtype => (
                  <div key={uuidv1()} className="sub-select noselect master-select-deselected"
                       onClick={(e) => this.onClickSubType(e, eachtype.key)}>{eachtype.value}</div>
                ))}
              </div>
            ))}
          </div>

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

        <div className="mt-2 d-flex justify-content-end mr-3 pb-4">
          <button className="btn btn-dark" onClick={this.goClientHomeScreen}>
            Back to My Home Page
          </button>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TalentSearch))