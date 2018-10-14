import React, {Component} from 'react'
import '../client.css'

import face from '../../../images/faces/a.jpg'

class RatingAndComment extends Component {
    state = {
        rating: 0,
        big_mark: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        point_mark: ['0.25', '0.50', '0.75']
    };

    textStyle = {
        lineHeight: '1.2'
    };

    markStyle = {
        borderRadius: '5rem',
        backgroundColor: '#acd9ff',
        border: '3px solid #3442A8',
        width: '2.5rem',
        height: '2.5rem',
        cursor: 'pointer'
    };

    markContainerStyle = {
        marginLeft: 'auto',
        marginRight: 'auto'
    };

    goBack = () => {
        window.location.href = "/client/my_rate"
    };

    onSubmit = () => {
        window.location.href = "/client/rating_comment/submitted"
    };

    render() {
        return (
            <div className="ml-5 mr-5">
                <div className="text-center pb-3">
                    <div className="result-subtitle mt-4">
                        <div style={this.textStyle}>
                            Jonathan Lockhart <br/>
                            <small>Experienced Musical Theater Triple Threat</small>
                        </div>
                    </div>
                    <div className="result-title">Rating and Comments</div>
                </div>

                <div className="mt-2">
                    <div className="text-center">
                        <img src={face} width="200px" height="200px"/>

                        <div className="mt-1" style={this.textStyle}>
                            <b>Average Rating:</b> 9.37 <br/>
                            <b>Casting Request:</b> SEN Full Cast 3/14/17-9/25/17 <br/>
                            <b>Contract Dates:</b> From 03/14/2017 To: 09/25/2017 <br/>
                        </div>
                    </div>

                    <div>
                        <b>Rating: {this.state.rating}</b>
                    </div>

                    <div className="w-75" style={this.markContainerStyle}>
                        <div className="d-flex justify-content-around">
                            {this.state.big_mark.map(bigMark => (
                                <div key={bigMark} className="text-center">
                                    <div style={this.markStyle}>&nbsp;</div>
                                    <div>{bigMark}</div>
                                </div>
                            ))}
                        </div>

                        <div className="d-flex justify-content-around">
                            {this.state.point_mark.map(pointMark => (
                                <div key={pointMark} className="text-center">
                                    <div style={this.markStyle}>&nbsp;</div>
                                    <div>+{pointMark}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <b>Comments:</b>
                        <textarea className="form-control" rows="4" placeholder="Type comments here…"></textarea>
                    </div>
                </div>

                <div className="mt-4 text-center">
                    <button className="btn btn-success" onClick={this.onSubmit}>
                        Submit
                    </button>
                </div>

                <div className="d-flex justify-content-end mt-3 mr-3 pb-5">
                    <button className="btn btn-dark" style={this.btnStyle} onClick={this.goBack}>
                        Back to My Rating
                    </button>
                </div>
            </div>
        )
    }
}

export default RatingAndComment