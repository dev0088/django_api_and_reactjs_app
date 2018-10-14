import React, {Component} from 'react'
import '../client.css'
import face from "../../../images/user3.jpg";

class MyFavorite extends Component {
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

    star_style = {
        fontSize: '2rem',
        color: '#eef222',
        textShadow: '0 0 3px #123123'
    };

    btn_style = {
        position: 'absolute',
        width: '12rem',
        fontWeight: 'bold',
        borderRadius: '5px'
    };

    goMyTalentSaved = () => {
        window.location.href = "/client/mytalent/saved"
    };

    render() {
        return (
            <div>
                <div className="title text-center mt-4">
                    My Callbacks
                    <i className="fa fa-star ml-3" style={this.star_style}></i>
                </div>
                <div className="text-center pb-4" style={this.small_subtitle}>
                    (Save for Later – Automatically Removed if Added to Casting Request)
                </div>

                {this.state.talent_list.map(talent => (
                    <div className="d-flex ml-5 mt-3">
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
                ))}

                <div className="d-flex justify-content-end mr-3">
                    <button className="btn btn-dark" style={this.btn_style} onClick={this.goMyTalentSaved}>
                        Back to My Talent
                    </button>
                </div>
            </div>
        );
    }
}

export default MyFavorite