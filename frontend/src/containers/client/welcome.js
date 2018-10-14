import React, {Component} from 'react';
import {connect} from 'react-redux';
import './client.css'

class WelcomePage extends Component {
    goFindTalent = () => {
        window.location.href = '/client/talent_search'
    };

    goRequestSelection = () => {
        window.location.href = '/client/request_selection'
    };

    render() {
        return (
            <div>
                <div className="clearfix mt-3">
                    <button className="btn btn-primary float-right logout">Log Out</button>
                </div>
                <div className="text-center welcome-title">Wecome, Jonathan!</div>
                <div className="text-center welcome-subtitle mt-3 mb-4">My Home Page</div>
                <div className="d-flex justify-content-center mb-2">
                    <div className="menu-box" onClick={this.goFindTalent}>
                        <div className="menu-title noselect">Find Talent</div>
                        <div className="menu-subtitle noselect">Search for new talent</div>
                    </div>
                </div>
                <div className="d-flex justify-content-center mb-2">
                    <div className="menu-box mr-4" onClick={this.goRequestSelection}>
                        <div className="menu-title noselect">My Casting Requests</div>
                        <div className="menu-subtitle noselect">Create and view casting requests</div>
                    </div>
                    <div className="menu-box">
                        <div className="menu-title noselect">My Saved Talent</div>
                        <div className="menu-subtitle noselect">View callbacks and favorites</div>
                    </div>
                </div>
                <div className="d-flex justify-content-center align-self-center mb-2">
                    <div className="menu-box mr-4">
                        <div className="menu-title noselect">My Shared Profiles</div>
                        <div className="menu-subtitle noselect">
                            View talent that was shared with your team
                        </div>
                    </div>
                    <div className="menu-box">
                        <div className="menu-title noselect">My Blocked Profiles</div>
                        <div className="menu-subtitle noselect">
                            View and change talent that you have blocked eight temporarily or permanently
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center mb-2">
                    <div className="menu-box">
                        <div className="menu-title noselect">My Ratings</div>
                        <div className="menu-subtitle noselect">
                            Provide end of contract ratings and comments of hired talent
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center mb-5">
                    <div className="menu-box">
                        <div className="menu-title noselect">Client Community</div>
                        <div className="menu-subtitle noselect">
                            Provide feedback to customize your experience
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-around">
                    <button className="btn btn-primary welcome-menu-button">Client<br/>Terms & Conditions</button>
                    <button className="btn btn-primary welcome-menu-button">FAQ</button>
                    <button className="btn btn-primary welcome-menu-button">Contact Us</button>
                    <button className="btn btn-primary welcome-menu-button">Change Password</button>
                </div>
            </div>
        )
    }
}

export default connect(null, null)(WelcomePage)