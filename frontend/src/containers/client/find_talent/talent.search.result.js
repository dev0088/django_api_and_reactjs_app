import React, {Component} from 'react'
import '../client.css'

import face from '../../../images/faces/a.jpg'

class TalentSearchResult extends Component {
    state = {
        result_list: [
            {
                img: face,
                name: 'Philip LaVerne',
                vda_no: '222',
                role: 'Male Vocalist (tenor) who Dances and Acts',
                description: 'Pop/Rock Tenor with Strong Dancing and Acting Skills and Five Years of Cruise Ship Experience',
                rate: '9.41'
            },
            {
                img: face,
                name: 'Jonathan Lockhart',
                vda_no: '117',
                role: 'Male Vocalist (tenor) who Dances and Acts',
                description: 'Experienced Musical Theater Triple Threat',
                rate: '9.37'
            },
            {
                img: face,
                name: 'Thomas Tomasello',
                vda_no: '179',
                role: 'Male Vocalist (tenor) who Dances and Acts',
                description: 'Experienced Production Vocalist Looking to Enter the Cruise Industry',
                rate: '9.21'
            }
        ]
    };

    goWelcomeScreen = () => {
        window.location.href = "/client/welcome"
    };

    goTalentSearch = () => {
        window.location.href = "/client/talent_search"
    };

    render() {
        return (
            <div>
                <div className="result-title text-center mt-4">Search Result</div>
                <div className="result-subtitle text-center mb-3">Click Picture to View Full Profile</div>

                {this.state.result_list.map(each => (
                    <div className="d-flex mb-2">
                        <img src={each.img} className="search-face mr-2" />
                        <div>
                            <div>{each.name}(VDA{each.vda_no}) - {each.role}</div>
                            <div className="font-weight-bold">"{each.description}"</div>
                            <div>Average Rating: {each.rate}</div>
                        </div>
                    </div>
                ))}

                <div className="font-weight-bold mt-4 mb-2">
                    NEAR AVAILABLE (Availability within 14 Days of Specified Contract Start and/or End Date)
                </div>

                {this.state.result_list.map(each => (
                    <div className="d-flex mb-2">
                        <img src={each.img} className="search-face mr-2"/>
                        <div>
                            <div>{each.name}(VDA{each.vda_no}) - {each.role}</div>
                            <div className="font-weight-bold">"{each.description}"</div>
                            <div>Average Rating: {each.rate}</div>
                        </div>
                    </div>
                ))}

                <div className="mt-5 pb-4">
                    <div className="d-flex justify-content-end mr-3">
                        <button className="btn btn-dark" style={this.btnStyle} onClick={this.goWelcomeScreen}>
                            Back to My Home Page
                        </button>
                    </div>
                    <div className="mt-2 d-flex justify-content-end mr-3">
                        <button className="btn btn-dark" style={this.btnStyle} onClick={this.goTalentSearch}>
                            Back to Search Results
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default TalentSearchResult