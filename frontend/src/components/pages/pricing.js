import React from 'react';
import imageUrl from '../../images/banner.jpg';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  backgroundImage: 'url('+ imageUrl + ')',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
}

const PricingTables = () => (
  <div>
    <div className="re-page-banner" style={style}>
      <div className="overlay"></div>
      <h1>Pricing Table</h1>
    </div>
    <div className="row">
      <div className="col-md-4 col-sm-6">
        <div className="an-pricing-table-single with-shadow-dark wow fadeIn" data-wow-delay=".1s">
          <div className="price-header">
            <h3 className="plan-name">Basic</h3>
            <h1 className="plan-price"><span>$</span>17.69</h1>
            <p>Per Month</p>
          </div>
          <div className="helper-text">
            <p>It is a long established fact that a reader will be dist racted by the readable.</p>
          </div>
          <ul className="feature-lists">
            <li>10 Members</li>
            <li>2GB Downloads</li>
            <li>Unlimited browsing</li>
          </ul>
          <div className="price-footer">
            <RaisedButton label="Choose Plan" primary={true} />
          </div>
        </div>

      </div>

      <div className="col-md-4 col-sm-6">
        <div className="an-pricing-table-single with-shadow-dark wow fadeIn" data-wow-delay=".1s">
          <div className="price-header">
            <h3 className="plan-name">Standard</h3>
            <h1 className="plan-price"><span>$</span>20.69</h1>
            <p>Per Month</p>
          </div>
          <div className="helper-text">
            <p>It is a long established fact that a reader will be dist racted by the readable.</p>
          </div>
          <ul className="feature-lists">
            <li>10 Members</li>
            <li>2GB Downloads</li>
            <li>Unlimited browsing</li>
          </ul>
          <div className="price-footer">
            <RaisedButton label="Choose Plan" primary={true} />
          </div>
        </div>
      </div>

      <div className="col-md-4 col-sm-6">
        <div className="an-pricing-table-single with-shadow-dark wow fadeIn" data-wow-delay=".1s">
          <div className="price-header">
            <h3 className="plan-name">Platinum</h3>
            <h1 className="plan-price"><span>$</span>300</h1>
            <p>Per Month</p>
          </div>
          <div className="helper-text">
            <p>It is a long established fact that a reader will be dist racted by the readable.</p>
          </div>
          <ul className="feature-lists">
            <li>10 Members</li>
            <li>2GB Downloads</li>
            <li>Unlimited browsing</li>
          </ul>
          <div className="price-footer">
            <RaisedButton label="Choose Plan" primary={true} />
          </div>
        </div>
      </div>
    </div>

  </div>
)

export default PricingTables;
