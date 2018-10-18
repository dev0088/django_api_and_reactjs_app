import React, {Component} from 'react'
import '../client.css'
import {connect} from "react-redux";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import Constant from '../../../constants/talent.search'


class TalentSearch extends Component {
    state = {
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
        talent_id: []
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
        if (height[0] === '0') {
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

    onSearch = () => {
        window.location.href = '/client/talent_search_result'
    };

    goWelcomePage = () => {
        window.location.href = "/client/welcome"
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
    onChangeState = (e, state) => {
        if (e.target.classList.contains("master-select-selected")) {
            state.push(e.target.innerText)
        } else {
            let index = state.indexOf(e.target.innerText)
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

    onClickSex = (e) => {
        this.onToggle(e);
        this.onChangeState(e, this.state.sex_list);
    };

    onClickType = (e) => {
        this.onToggle(e);
        this.onChangeState(e, this.state.master_type_list);
    };

    onClickSubType = (e) => {
        this.onToggle(e);
        this.onChangeState(e, this.state.sub_type_list);
    };

    onClickCanDo = (e) => {
        this.onToggle(e);
        this.onChangeState(e, this.state.master_role_list);
    };

    onClickSubCanDo = (e) => {
        this.onToggle(e);
        this.onChangeState(e, this.state.sub_role_list);
    };

    onClickAge = (e) => {
        this.onChangeCheckboxState(e, this.state.age_list);
    };

    onClickHeight = (e) => {
        this.onChangeCheckboxState(e, this.state.height_list)
    };

    onClickLang = (e) => {
        this.onChangeCheckboxState(e, this.state.lang_list)
    };

    onClickRating = (e) => {
        this.onChangeCheckboxState(e, this.state.rating_list)
    };

    render() {
        return (
            <div>
                <div className="search-title text-center mt-4 mb-3">Talent Search</div>
                <div className="master-title mb-1">I need a...</div>
                <div className="d-flex justify-content-between mb-1">
                    {Constant.sexes.map(sex => (
                        <div className={this.renderSexes(sex)} onClick={this.onClickSex}>{sex}</div>
                    ))}
                </div>
                <div className="d-flex justify-content-between mb-1">
                    {Constant.types.map(type => (
                        <div key={type} className="master-select noselect master-select-deselected"
                             onClick={this.onClickType}>{type}</div>
                    ))}
                </div>
                <div className="d-flex justify-content-between">
                    {Constant.subTypes.map(subtype => (
                        <div key={subtype.length} className="master-select-empty d-flex flex-wrap">
                            {subtype.map(eachtype => (
                                <div key={eachtype} className="sub-select noselect master-select-deselected"
                                     onClick={this.onClickSubType}>{eachtype}</div>
                            ))}
                        </div>
                    ))}
                </div>

                <div className="master-title mb-1 mt-3">Who also...</div>
                <div className="d-flex justify-content-between mb-1">
                    {Constant.cando.map(eachdo => (
                        <div key={eachdo} className={this.renderCando(eachdo)}
                             onClick={this.onClickCanDo}>{eachdo}</div>
                    ))}
                </div>
                <div className="d-flex justify-content-between">
                    {Constant.subCandos.map(subcando => (
                        <div key={subcando.length} className="master-select-empty d-flex flex-wrap">
                            {subcando.map(eachcando => (
                                <div key={eachcando} className="sub-select noselect master-select-deselected"
                                     onClick={this.onClickSubCanDo}>{eachcando}</div>
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
                        <div className="mr-3">
                            <input key={age[0]} className="mr-1" type="checkbox" value={this.renderAge(age)}
                                   onChange={this.onClickAge}/>
                            {this.renderAge(age)}
                        </div>
                    ))}
                </div>

                <div className="master-title mb-1 mt-3">Height (select all that apply)</div>
                <div className="d-flex">
                    {Constant.heights.map(height => (
                        <div className="mr-3">
                            <input key={height[0]} className="mr-1" type="checkbox" onClick={this.onClickHeight} />
                            {this.renderHeight(height)}
                        </div>
                    ))}
                </div>

                <div className="master-title mb-1 mt-3">Languages Spoken (select all that apply)</div>
                <div className="d-flex">
                    {Constant.langs.map(lang => (
                        <div className="mr-3">
                            <input key={lang[0]} className="mr-1" type="checkbox" onClick={this.onClickLang} />
                            {lang}
                        </div>
                    ))}
                </div>

                <div className="master-title mb-1 mt-3">Average Cruise Line Rating (select all that apply)</div>
                <div className="d-flex">
                    {Constant.ratings.map(rate => (
                        <div className="mr-3">
                            <input key={rate[0]} className="mr-1" type="checkbox" onClick={this.onClickRating} />
                            {this.renderRate(rate)}
                        </div>
                    ))}
                </div>

                <div className="master-title mb-1 mt-3">Already know who you're looking for?</div>
                <div className="row mb-5">
                    <div className="col-5">
                        <div className="d-flex">
                            <small>SEARCH BY NAME:</small>
                            <input className="form-control form-control-sm" width="100%" type="text"/>
                        </div>
                        <div className="d-flex">
                            <small>SEARCH BY TALENT ID:</small>
                            <input className="form-control form-control-sm" type="text"/>
                        </div>
                    </div>
                    <div className="col-7 my-auto">
                        <button className="btn btn-primary" onClick={this.onSearch}>Search</button>
                    </div>
                </div>

                <div className="mt-2 d-flex justify-content-end mr-3 pb-4">
                    <button className="btn btn-dark" style={this.btnStyle} onClick={this.goWelcomePage}>
                        Back to My Home Page
                    </button>
                </div>
            </div>
        )
    }
}

export default connect(null, null)(TalentSearch)