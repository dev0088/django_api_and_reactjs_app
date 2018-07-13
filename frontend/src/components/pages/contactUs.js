import React, {Component} from 'react';
import imageUrl from '../../images/banner.jpg';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


const style = {
  backgroundImage: 'url('+ imageUrl + ')',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
}

class ContactUs extends Component {
  render() {
    return (
      <div>
        <div className="re-page-banner" style={style}>
          <div className="overlay"></div>
          <h1>Contact Us</h1>
        </div>
        <div className="row">
          <div className="col-md-6">
            <h4 className="inner-box-title full">Address</h4>
            <div className="an-address-single">
              <p><i className="fa fa-phone"></i>+012345 6789</p>
              <p><i className="fa fa-envelope"></i>example@example.com</p>
              <p><i className="fa fa-map-marker"></i>West end 41str, San Francisco,<br/> 0123456 California, US</p>
            </div>
          </div>
          <div className="col-md-6 contact-form">
            <h4 className="inner-box-title full">Send Us Message</h4>
            <div>
              <TextField
                id="name"
                hintText="Name"
                fullWidth={true}
              />
            </div>
            <div>
              <TextField
                id="email"
                hintText="Email"
                type="email"
                fullWidth={true}
              />
            </div>
            <div>
              <TextField id="message" multiLine={true} fullWidth={true} />
            </div>

            <RaisedButton label="Send" primary={true} />
          </div>
        </div>
      </div>
    );
  }
}

export default ContactUs;
