import React, {Component} from 'react'
import '../client.css'
import {connect} from "react-redux";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class TalentSearch extends Component {
    state = {
        sexes: ['Male', 'Female', '', '', '', '', '', ''],
        types: ['Vocalist', 'Dancer', 'Actor', 'Aerialist', 'Musician', 'Cruise Staff', 'Youth Staff', 'Technician'],
        subTypes: [
            ['Soprano', 'Tenor', 'Alto', 'Baritone'],
            ['Jazz', 'Tap', 'Ballet', 'Contemp', 'Hip-Hop', 'Lyrical', 'Ballroom', 'Gymnastics'],
            [],
            [],
            ['Solo', 'Duo', 'Trio', 'Quartet', 'Band'],
            [],
            [],
            ['Audio', 'Lighting', 'Video']
        ],
        cando: ['Sings', 'Dances', 'Moves', 'Acts', 'Plays', '', '', ''],
        subCandos: [
            [],
            ['Jazz', 'Tap', 'Ballet', 'Contemp', 'Hip-Hop', 'Lyrical', 'Ballroom', 'Gymnastics'],
            [],
            [],
            ['Piano', 'Bass', 'Drums', 'Strings', 'Winds', 'Brass', 'Percussion'],
            [],
            [],
            []
        ],
        startDate: moment(),
        endDate: moment(),
        ages: [
            [18, 21],
            [22, 25],
            [26, 30],
            [31, 35],
            [36, 40],
            [41, 45],
            [46, 50],
            [51, 300]
        ],
        heights: [
            ['0', '5.0'],
            ['5.1', '5.4'],
            ['5.5', '5.8'],
            ['5.9', '5.11'],
            ['6.0', '6.4'],
            ['6.4', '10.0']
        ],
        langs: ['English', 'Spanish', 'Portuguese', 'German', 'French', 'Italian', 'Japanese', 'Mandarin', 'Cantonese'],
        ratings: [
            [0, 8.00],
            [8.00, 8.24],
            [8.25, 8.49],
            [8.50, 8.74],
            [8.75, 8.99],
            [9.00, 9.24],
            [9.25, 9.49],
            [9.50, 9.74],
            [9.75, 10.0],
        ]
    };

    renderSexes(sex) {
        let default_css = 'master-select noselect ';

        if (sex === '') {
            default_css += 'invisible';
            return default_css
        }
        else
            return default_css
    }

    renderCando(eachdo) {
        let default_css = 'master-select noselect ';

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

    render() {
        return (
            <div>
                <div className="search-title text-center mt-4 mb-3">Talent Search</div>
                <div className="master-title mb-1">I need a...</div>
                <div className="d-flex justify-content-between mb-1">
                    {this.state.sexes.map(sex => (
                        <div key={sex.id} className={this.renderSexes(sex)}>{sex}</div>
                    ))}
                </div>
                <div className="d-flex justify-content-between mb-1">
                    {this.state.types.map(type => (
                        <div key={type} className="master-select noselect">{type}</div>
                    ))}
                </div>
                <div className="d-flex justify-content-between">
                    {this.state.subTypes.map(subtype => (
                        <div key={subtype.length} className="master-select-empty d-flex flex-wrap">
                            {subtype.map(eachtype => (
                                <div key={eachtype} className="sub-select noselect">{eachtype}</div>
                            ))}
                        </div>
                    ))}
                </div>

                <div className="master-title mb-1 mt-3">Who also...</div>
                <div className="d-flex justify-content-between mb-1">
                    {this.state.cando.map(eachdo => (
                        <div key={eachdo} className={this.renderCando(eachdo)}>{eachdo}</div>
                    ))}
                </div>
                <div className="d-flex justify-content-between">
                    {this.state.subCandos.map(subcando => (
                        <div key={subcando.length} className="master-select-empty d-flex flex-wrap">
                            {subcando.map(eachcando => (
                                <div key={eachcando} className="sub-select noselect">{eachcando}</div>
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
                    {this.state.ages.map(age => (
                        <div className="mr-3"><input key={age[0]} className="mr-1"
                                                     type="checkbox"/>{this.renderAge(age)}</div>
                    ))}
                </div>

                <div className="master-title mb-1 mt-3">Height (select all that apply)</div>
                <div className="d-flex">
                    {this.state.heights.map(height => (
                        <div className="mr-3"><input key={height[0]} className="mr-1"
                                                     type="checkbox"/>{this.renderHeight(height)}</div>
                    ))}
                </div>

                <div className="master-title mb-1 mt-3">Languages Spoken (select all that apply)</div>
                <div className="d-flex">
                    {this.state.langs.map(lang => (
                        <div className="mr-3"><input key={lang[0]} className="mr-1" type="checkbox"/>{lang}</div>
                    ))}
                </div>

                <div className="master-title mb-1 mt-3">Average Cruise Line Rating (select all that apply)</div>
                <div className="d-flex">
                    {this.state.ratings.map(rate => (
                        <div className="mr-3"><input key={rate[0]} className="mr-1"
                                                     type="checkbox"/>{this.renderRate(rate)}</div>
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