import React, {Component} from 'react';
import {connect} from 'react-redux';
import './client.css'


class ClientLogin extends Component {
    loginFunction = (e) => {
        e.preventDefault();
        window.location.href = "/client/home";
    };

    render() {
        return (
            <div className="text-center">
                <div className="client-login-title">Client Sign In</div>

                <form onSubmit={this.loginFunction}>
                    <div className="justify-content-center">
                        <table className="client-login-table">
                            <tbody>
                            <tr>
                                <td className="client-login-label text-right pr-3">Username(email)</td>
                                <td>
                                    <input type="email" name="user_name" className="form-control"
                                           value="jsmith@cruiseline.com"/>
                                </td>
                            </tr>
                            <tr className="pb-4">
                                <td className="client-login-label text-right pr-3">Password</td>
                                <td className="pt-2 pb-2">
                                    <input type="password" name="password" className="form-control" value="123456789" />
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className="pt-3 pb-3">
                                    <input type="submit" className="btn btn-primary" value="Sign In" />
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className="pb-3">
                                    <input type="checkbox"/>Stay signed in
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2" className="text-left pl-5">
                                    <a href="javascript:void(0);">Create Account</a> <br/>
                                    <a href="javascript:void(0);">Forget Password</a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </form>
            </div>
        )
    }
}

export default connect(null, null)(ClientLogin);