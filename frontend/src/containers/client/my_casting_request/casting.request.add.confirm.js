import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import '../client.css';
import Spacer from "components/general/spacer";

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
          <Spacer size={50}/>
          <div>
            Casting Request has been added to <br/> My Saved Casting Requests
          </div>
          <Spacer size={330}/>
        </div>
        <div>
          <Link to="/client/casting_request/list_view">
            <button className="btn btn-dark font-weight-bold" style={this.btnStyle}>
              Go to My Casting Requests
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default CastingRequestAddConfirm