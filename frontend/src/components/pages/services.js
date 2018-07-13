import React, {Component} from 'react';
import {connect} from 'react-redux';
import imageUrl from '../../images/banner.jpg';

const style = {
  backgroundImage: 'url('+ imageUrl + ')',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
}

class Services extends Component {
  serviceLoop () {
    return this.props.services.map((service) => {
      return (
        <div className="col-md-4 col-sm-6" key={service.id}>
          <div className="an-service-single">
            <i className={service.icon}></i>
            <h4>{service.name}</h4>
            <p>{service.text}</p>
          </div>
        </div>
      );
    });
  }

  render () {
    return (
      <div>
        <div className="re-page-banner" style={style}>
          <div className="overlay"></div>
          <h1>Our Services</h1>
        </div>
        <div className="row">
          {this.serviceLoop()}
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    services: state.services
  }
}

export default connect(mapStateToProps)(Services);
