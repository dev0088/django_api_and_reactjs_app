import React, {Component} from 'react'
import '../client.css'

class MySharedProfile extends Component {

    btnStyle = {
        fontSize: '1.4rem',
        width: '25rem',
        borderRadius: '7px'
    };

    btn_style = {
        width: '15rem',
        fontWeight: 'bold',
        borderRadius: '5px'
    };

    goWelcome = () => {
        window.location.href = "/client/home"
    };

    goTalentShared = () => {
        window.location.href = "/client/talent_shared"
    };

    goTalentSharedBy = () => {
        window.location.href = "/client/talent_shared_by"
    };

    goTalentSharedTeam = () => {
        window.location.href = "/client/talent_shared_team"
    };

    render() {
        return (
            <div className="text-center">
                <div className="title mt-4">My Shared Profiles</div>

                <div className="mt-5">
                    <button className="btn btn-dark" style={this.btnStyle} onClick={this.goTalentShared}>
                        View Talent You Have Shared
                    </button>
                </div>
                <div className="mt-3">
                    <button className="btn btn-dark" style={this.btnStyle} onClick={this.goTalentSharedBy}>
                        View Talent Shared with You
                    </button>
                </div>
                <div className="mt-3 pb-5">
                    <button className="btn btn-dark" style={this.btnStyle} onClick={this.goTalentSharedTeam}>
                        View Shared Talent <br /> by Team Member
                    </button>
                </div>

                <div className="mt-5">
                    <button className="btn btn-dark" style={this.btn_style} onClick={this.goWelcome}>
                        Back to My Home Page
                    </button>
                </div>
            </div>
        )
    }
}

export default MySharedProfile