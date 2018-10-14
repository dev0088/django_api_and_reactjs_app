import React, {Component} from 'react'
import '../client.css'

class RequestSelection extends Component {
    button_style = {
        fontWeight: 'bold',
        fontSize: '1.8rem',
        width: '22rem'
    };

    parentStyle = {
        paddingTop: '0'
    };

    btnStyles = {
        position: 'absolute',
        right: '3rem',
        bottom: '3rem'
    };

    onCreateNewRequest = () => {
        window.location.href = "/client/casting_request/new"
    };

    onRequestView = () => {
        window.location.href = "/client/casting_request/view"
    };

    goWelcomeScreen = () => {
        window.location.href = "/client/welcome"
    };

    render() {
        return (
            <div className="text-center">
                <div className="title mt-5 pb-5" style={this.parentStyle}>My Casting Requests Selection</div>

                <div className="mt-5">
                    <button className="btn btn-outline-primary" style={this.button_style}
                            onClick={this.onCreateNewRequest}>
                        Create <br/> New Casting Request
                    </button>
                </div>
                <div className="mt-3">
                    <button className="btn btn-outline-primary" style={this.button_style} onClick={this.onRequestView}>
                        View <br/> My Casting Requests
                    </button>
                </div>

                <div>
                    <button className="btn btn-dark" style={this.btnStyles} onClick={this.goWelcomeScreen}>
                        Back to My Home Page
                    </button>
                </div>
            </div>
        )
    }
}

export default RequestSelection