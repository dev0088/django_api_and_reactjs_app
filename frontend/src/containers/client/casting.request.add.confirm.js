import React, {Component} from 'react'
import './client.css'

class CastingRequestAddConfirm extends Component {
    btnStyle = {
        position: 'absolute',
        bottom: '1rem',
        right: '1rem'
    };

    render() {
        return (
            <div>
                <div className="save-title my-auto font-weight-bold text-center">
                    <div>
                        Casting Request has been added to <br/> My Saved Casting Requests
                    </div>
                </div>
                <div>
                    <button className="btn btn-dark font-weight-bold" style={this.btnStyle}>
                        Go to My Casting Requests
                    </button>
                </div>
            </div>
        )
    }
}

export default CastingRequestAddConfirm