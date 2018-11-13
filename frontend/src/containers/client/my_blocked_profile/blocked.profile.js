import React, {Component} from 'react'
import '../client.css'
import face from "../../../images/user3.jpg";
import pencil from "../../../images/pencil.svg"
import delete_icon from "../../../images/delete.png"

class BlockedProfile extends Component {
    state = {
        talent_list: [
            {
                name: 'Philip LaVerne',
                number: 'VDA222',
                role: 'Male Vocalist (tenor) who Dances and Acts',
                description: 'Pop/Rock Tenor with Strong Dancing and Acting Skills and Five Years of Cruise Ship Experience',
                rate: '9.41',
                block_period: 'month'
            },
            {
                name: 'Nadia Romansky',
                number: 'ED180',
                role: 'Female Aerialist Who Dances',
                description: 'Experienced Aerialist in Multiple Disciplines with Extensive Ballet, Jazz and Tap Training',
                rate: '9.84',
                block_period: 'today'
            },
            {
                name: 'Fernando Vasquez',
                number: 'VDA144',
                role: 'Male Vocalist (tenor) who Dances and Acts',
                description: 'Bi-lingual Singer who Dances and Acts',
                rate: '9.33',
                block_period: 'forever'
            }
        ]
    };

    imgButton = {
        cursor: 'pointer'
    };

    goWelcome = () => {
        window.location.href = "/client/home"
    };

    render() {
        return (
            <div>
                <div className="text-center pb-3">
                    <div className="result-title mt-4">My Blocked Profiles</div>
                    <div className="result-subtitle">
                        Talent currently blocked from your Search Results
                    </div>
                </div>

                {this.state.talent_list.map(talent => (
                    <div className="row no-gutters ml-5 mr-5 pb-3">
                        <div className="col-1 mr-2 text-right my-auto">
                            <div>
                                <small>{talent.block_period}</small>
                            </div>
                            <div><img src={pencil} width="16px" height="16px" style={this.imgButton} /></div>
                            <div><img src={delete_icon} width="16px" height="16px" style={this.imgButton} /></div>
                        </div>
                        <div className="col-9 d-flex my-auto">
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
                    <button className="btn btn-dark" style={this.btnStyle} onClick={this.goWelcome}>
                        Back to My Home Page
                    </button>
                </div>
            </div>
        )
    }
}

export default BlockedProfile