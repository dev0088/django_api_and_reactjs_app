import React, {Component} from 'react'
import '../client.css'
import face from "../../../images/user3.jpg";

class MyRate extends Component {
    state = {
        talent_list: [
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
        ]
    };

    goWelcome = () => {
        window.location.href = "/client/home"
    };

    onRate = () => {
        window.location.href = "/client/rating_comment"
    };

    render() {
        return (
            <div>
                <div className="text-center pb-3">
                    <div className="result-title mt-4">My Ratings</div>
                    <div className="result-subtitle">
                        Please assist the Client Community <br/>
                        by submitting a rating and comments <br/>
                        for each talent who has completed his/her contract
                    </div>
                </div>

                <div>
                    <div className="row no-gutters ml-4 pb-3">
                        <div className="col-9 offset-1">
                            <b>Talent who have completed their contract but have not been rated:</b>
                        </div>
                    </div>

                    {this.state.talent_list.map(talent => (
                        <div className="row no-gutters ml-5 mr-5 pb-3">
                            <div className="col-1 mr-2 text-right my-auto">
                                <button className="btn btn-success btn-sm" onClick={this.onRate}>rate</button>
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
                </div>

                <div className="d-flex justify-content-end mt-3 mr-3">
                    <button className="btn btn-dark" style={this.btnStyle} onClick={this.goWelcome}>
                        Back to My Home Page
                    </button>
                </div>
            </div>
        )
    }
}

export default MyRate