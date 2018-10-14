import React, {Component} from 'react'
import './client.css'

class RequestSelection extends Component {
    button_style = {
        fontWeight: 'bold',
        fontSize: '1.8rem',
        width: '22rem'
    };

    parentStyle = {
        paddingTop: '0'
    };

    onCreateNewRequest = () => {
        window.location.href = "/client/casting_request/new"
    };

    render () {
        return (
            <div className="text-center">
                <div className="title mt-5 pb-5" style={this.parentStyle}>My Casting Requests Selection</div>

                <div className="mt-5">
                    <button className="btn btn-outline-primary" style={this.button_style} onClick={this.onCreateNewRequest}>
                        Create <br /> New Casting Request
                    </button>
                </div>
                <div className="mt-3">
                    <button className="btn btn-outline-primary" style={this.button_style}>View <br /> My Casting Requests</button>
                </div>
            </div>
        )
    }
}

export default RequestSelection