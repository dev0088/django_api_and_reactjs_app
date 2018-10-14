import React, {Component} from 'react'
import '../client.css'

class MyrateSubmitted extends Component {
    textStyle = {
        fontWeight: 'bold',
        fontSize: '2rem'
    };

    goBack = () => {
        window.location.href = "/client/my_rate"
    };

    render() {
        return (
            <div className="text-center">
                <div style={this.textStyle}>
                    <div className="mt-5 pb-4">Thank you</div>

                    <div>The ShipTalent.com Client Community</div>
                    <div>appreciates you taking the time to rate talent.</div>
                </div>

                <div className="mt-5">
                    <button className="btn btn-dark" onClick={this.goBack}>
                        Back to My Ratings
                    </button>
                </div>
            </div>
        )
    }
}

export default MyrateSubmitted