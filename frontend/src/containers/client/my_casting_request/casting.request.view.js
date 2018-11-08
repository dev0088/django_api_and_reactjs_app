import React, {Component} from 'react'
import Constant from '../../../constants/casting.request'
import '../client.css'

class CastingRequestView extends Component {

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
    const {fetchData} = this.props.location.state;
    console.log("fetch:", fetchData);

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
            {fetchData.value.on_submitted.map(each => (
              <tr key={each.pk}>
                <td className="text-right pr-2">
                  <button className="btn btn-dark btn-sm">view</button>
                </td>
                <td>{each.name}</td>
                <td>{each.venue}</td>
                <td>From: {each.start_date} To: {each.end_date}</td>
                <td>{Constant[each.status]}</td>
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
            {fetchData.value.not_submitted.map(each => (
              <tr>
                <td className="text-right pr-2">
                  <button className="btn btn-dark btn-sm">view</button>
                </td>
                <td>{each.name}</td>
                <td>{each.venue}</td>
                <td>From: {each.start_date} To: {each.end_date}</td>
                <td>{Constant[each.status]}</td>
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
            {fetchData.value.completed.map(each => (
              <tr>
                <td className="text-right pr-2">
                  <button className="btn btn-dark btn-sm">view</button>
                </td>
                <td>{each.name}</td>
                <td>{each.venue}</td>
                <td>From: {each.start_date} To: {each.end_date}</td>
                <td>{Constant[each.status]}</td>
                <td>{each.request_date}</td>
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