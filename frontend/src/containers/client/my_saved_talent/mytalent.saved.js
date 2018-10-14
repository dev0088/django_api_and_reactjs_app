import React, {Component} from 'react'
import '../client.css'

class MyTalentSaved extends Component {
    btnStyle = {
        fontWeight: 'bold',
        fontSize: '1.4rem',
        width: '18rem',
        marginLeft: 'auto',
        cursor:'pointer',
        borderRadius: '10px'
    };

    goMyCallback = () => {
        window.location.href = "/client/mycallback"
    };

    goMyFavorite = () => {
        window.location.href = "/client/myfavorite"
    };

    goWelcome = () => {
        window.location.href = "/client/welcome"
    };

    render() {
        return (
            <div className="mt-5">
                <div className="text-center pt-5">
                    <button className="btn btn-dark" style={this.btnStyle} onClick={this.goMyCallback}>
                        View <br/> My Callbacks
                    </button>
                </div>

                <div className="text-center mt-5">
                    <button className="btn btn-dark" style={this.btnStyle} onClick={this.goMyFavorite}>
                        View <br/> My Favorites
                    </button>
                </div>

                <div className="d-flex justify-content-end mt-5 mr-3">
                    <button className="btn btn-dark" style={this.btn_style} onClick={this.goWelcome}>
                        Back to My Talent
                    </button>
                </div>
            </div>
        )
    }
}

export default MyTalentSaved