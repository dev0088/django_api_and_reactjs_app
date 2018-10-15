import React, {Component} from 'react'
import '../client.css'
import face from "../../../images/user3.jpg";

class TalentSharedWith extends Component {
    state = {
        talent_list: [
            {
                name: 'Philip LaVerne',
                number: 'VDA222',
                role: 'Male Vocalist (tenor) who Dances and Acts',
                description: 'Pop/Rock Tenor with Strong Dancing and Acting Skills and Five Years of Cruise Ship Experience',
                rate: '9.41',
                mails: ['adkcns@dsjof.com', 'vpodf@ihjdow.com', 'covjjv@doid.com']
            },
            {
                name: 'Nadia Romansky',
                number: 'ED180',
                role: 'Female Aerialist Who Dances',
                description: 'Experienced Aerialist in Multiple Disciplines with Extensive Ballet, Jazz and Tap Training',
                rate: '9.84',
                mails: ['casck@fof.com', 'vlklfe@ddo.com']
            },
            {
                name: 'Fernando Vasquez',
                number: 'VDA144',
                role: 'Male Vocalist (tenor) who Dances and Acts',
                description: 'Bi-lingual Singer who Dances and Acts',
                rate: '9.33',
                mails: ['dwocj@vjdbwk.com']
            }
        ]
    };

    btnStyle = {
        width: '15rem'
    };

    goBack = () => {
        window.location.href = "/client/myshared_profile"
    };

    render() {
        return (
            <div>
                <div className="text-center pb-3">
                    <div className="result-title mt-4">My Shared Profiles</div>
                    <div className="result-subtitle">Talent You Have Shared</div>
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
                        <div className="text-center">
                            <small>
                                <div><u>Shared With</u></div>
                                {talent.mails.map(mail => (
                                    <div>
                                        {mail}
                                    </div>
                                ))}
                            </small>
                        </div>
                    </div>
                ))}

                <div className="d-flex justify-content-end mt-3 mr-3">
                    <button className="btn btn-dark" style={this.btnStyle} onClick={this.goBack}>
                        Back to My Shared Profile
                    </button>
                </div>
            </div>
        )
    }
}

export default TalentSharedWith