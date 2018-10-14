import React, {Component} from 'react'
import '../client.css'

class CastingRequestView extends Component {
    state = {
        submitted: [
            {
                id: 1,
                name: "VIS Cast B 2/2/19-8/13/19",
                venue: "Carnival Vista",
                date: "From: 02/02/2019 To: 08/13/2019",
                status: "Requested",
                request_date: "05/19/2018"
            },
            {
                id: 2,
                name: "VIC Light Tech 6/12/18-1/15/19",
                venue: "Carnival Victory",
                date: "From: 06/12/2018 To: 01/15/2019",
                status: "In Progress",
                request_date: "05/03/2018"
            },
            {
                id: 3,
                name: "LIB Youth Staff Summer",
                venue: "Carnival Liberty",
                date: "From: 05/15/2018 To: 09/12/2018",
                status: "In Progress",
                request_date: "04/22/2018"
            }
        ],
        saved: [
            {
                id: 1,
                name: "VIS Cast B 2/2/19-8/13/19",
                venue: "Carnival Vista",
                date: "From: 02/02/2019 To: 08/13/2019",
                status: "Not Yet Submitted"
            },
            {
                id: 2,
                name: "VIC Light Tech 6/12/18-1/15/19",
                venue: "Carnival Victory",
                date: "From: 06/12/2018 To: 01/15/2019",
                status: "Not Yet Submitted"
            },
            {
                id: 3,
                name: "LIB Youth Staff Summer",
                venue: "Carnival Liberty",
                date: "From: 05/15/2018 To: 09/12/2018",
                status: "Not Yet Submitted"
            }
        ],
        completed: [
            {
                id: 1,
                name: "VIS Cast B 2/2/19-8/13/19",
                venue: "Carnival Vista",
                date: "From: 02/02/2019 To: 08/13/2019",
                status: "Completed",
                completion_date: "05/19/2018"
            },
            {
                id: 2,
                name: "VIC Light Tech 6/12/18-1/15/19",
                venue: "Carnival Victory",
                date: "From: 06/12/2018 To: 01/15/2019",
                status: "Completed",
                completion_date: "05/03/2018"
            },
            {
                id: 3,
                name: "LIB Youth Staff Summer",
                venue: "Carnival Liberty",
                date: "From: 05/15/2018 To: 09/12/2018",
                status: "Completed",
                completion_date: "04/22/2018"
            }
        ]
    };

    btnStyle = {
        width: '18rem'
    };

    onCreateNew = () => {
        window.location.href = "/client/casting_request/new"
    };

    goWelcomeScreen = () => {
        window.location.href = "/client/welcome"
    };

    render() {
        return (
            <div className="ml-3">
                <div className="title text-center mt-3">My Casting Requests</div>

                <div>
                    <div className="master-title ml-3">My Submitted Casting Requests</div>
                    <table width="100%">
                        <thead>
                            <tr>
                                <th width="5%"></th>
                                <th width="30%"><u>Casting Request Name</u></th>
                                <th width="15%"><u>Venue</u></th>
                                <th width="20%"><u>Dates</u></th>
                                <th width="15"><u>Status</u></th>
                                <th width="15"><u>Request Date</u></th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.submitted.map(each => (
                            <tr>
                                <td className="text-right pr-2">
                                    <button className="btn btn-dark btn-sm">view</button>
                                </td>
                                <td>{each.name}</td>
                                <td>{each.venue}</td>
                                <td>{each.date}</td>
                                <td>{each.status}</td>
                                <td>{each.request_date}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-5">
                    <div className="master-title ml-3">My Saved Casting Requests</div>
                    <table width="100%">
                        <thead>
                            <tr>
                                <th width="5%"></th>
                                <th width="30%"><u>Casting Request Name</u></th>
                                <th width="15%"><u>Venue</u></th>
                                <th width="20%"><u>Dates</u></th>
                                <th width="15%"><u>Status</u></th>
                                <th width="15%">&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.saved.map(each => (
                            <tr>
                                <td className="text-right pr-2">
                                    <button className="btn btn-dark btn-sm">view</button>
                                </td>
                                <td>{each.name}</td>
                                <td>{each.venue}</td>
                                <td>{each.date}</td>
                                <td>{each.status}</td>
                                <td>&nbsp;</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-5">
                    <div className="master-title ml-3">My Completed Casting Requests</div>
                    <table width="100%">
                        <thead>
                            <tr>
                                <th width="5%"></th>
                                <th width="30%"><u>Casting Request Name</u></th>
                                <th width="15%"><u>Venue</u></th>
                                <th width="20%"><u>Dates</u></th>
                                <th width="15%"><u>Status</u></th>
                                <th width="15%"><u>Completion Date</u></th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.completed.map(each => (
                            <tr>
                                <td className="text-right pr-2">
                                    <button className="btn btn-dark btn-sm">view</button>
                                </td>
                                <td>{each.name}</td>
                                <td>{each.venue}</td>
                                <td>{each.date}</td>
                                <td>{each.status}</td>
                                <td>{each.completion_date}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-5 pb-4">
                    <div className="d-flex justify-content-end mr-3">
                        <button className="btn btn-dark" style={this.btnStyle} onClick={this.onCreateNew}>
                            Create New Casting Request
                        </button>
                    </div>
                    <div className="mt-2 d-flex justify-content-end mr-3">
                        <button className="btn btn-dark" style={this.btnStyle} onClick={this.goWelcomeScreen}>
                            Back to My Home Page
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default CastingRequestView