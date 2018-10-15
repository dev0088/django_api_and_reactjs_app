import React, {Component} from 'react'
import '../client.css'
import face from "../../../images/user3.jpg";

class TalentSharedTeam extends Component {
    state = {
        team_list: [
            "adas@cmiw.com", "ceopdjpd@sada.com", "asosjda@.com", "asldwo@.com"
        ],
        talent_list: []
    };

    btnStyle = {
        borderRadius: '15px'
    };

    returnStyle = {
        width: '15rem'
    };

    goBack = () => {
        window.location.href = "/client/myshared_profile"
    };

    onSelectTeam = () => {
        const a = [
            {
                name: 'Philip LaVerne',
                number: 'VDA222',
                role: 'Male Vocalist (tenor) who Dances and Acts',
                description: 'Pop/Rock Tenor with Strong Dancing and Acting Skills and Five Years of Cruise Ship Experience',
                rate: '9.41'
            },
            {
                name: 'Nadia Romansky',
                number: 'ED180',
                role: 'Female Aerialist Who Dances',
                description: 'Experienced Aerialist in Multiple Disciplines with Extensive Ballet, Jazz and Tap Training',
                rate: '9.84'
            },
            {
                name: 'Fernando Vasquez',
                number: 'VDA144',
                role: 'Male Vocalist (tenor) who Dances and Acts',
                description: 'Bi-lingual Singer who Dances and Acts',
                rate: '9.33'
            }
        ];

        const talent_list = [...a];
        this.setState({
            talent_list: talent_list
        })
    };

    render() {
        return (
            <div>
                <div className="text-center pb-3">
                    <div className="result-title mt-4">My Shared Profiles</div>
                    <div className="result-subtitle">Talent Shared with You</div>
                    <div className="mt-4 font-weight-bold">
                        Select Team Member to View Talent You Have Shared
                    </div>
                </div>

                <div className="d-flex ml-5 mb-4">
                    {this.state.team_list.map(team => (
                        <button className="btn btn-dark btn-sm ml-3" style={this.btnStyle} onClick={this.onSelectTeam}>
                            {team}
                        </button>
                    ))}
                </div>

                {this.state.talent_list.map(talent => (
                    <div className="d-flex justify-content-between ml-5 mr-5 pb-3">
                        <div className="d-flex mt-3">
                            <div>
                                <img className="talent-img mr-3" src={face}/>
                            </div>
                            <div>
                                <div>
                                    {talent.name} ({talent.number}) - {talent.role}
                                </div>
                                <div>
                                    <b>"{talent.description}"</b>
                                </div>
                                <div>
                                    Average Rating: {talent.rate}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="d-flex justify-content-end mt-3 mr-3">
                    <button className="btn btn-dark" style={this.returnStyle} onClick={this.goBack}>
                        Back to My Shared Profile
                    </button>
                </div>
            </div>
        )
    }
}

export default TalentSharedTeam