import React from 'react';
import Divider from 'material-ui/Divider';

const OrderReviewComponent = () => (
  <div>
    <div className="row">
      <div className="col-sm-6">
        <div className="review-item">
          <h6>Order Details</h6>
          <Divider />
          <ul className="list-unstyled">
            <li><span>Order id:</span> <strong>244566</strong></li>
            <li><span>Order Date &amp; Time:</span> <strong>Jun 27, 2017 7:16:25 PM</strong></li>
            <li><span>Order Status:</span> <strong>Closed</strong></li>
            <li><span>Grand Total:</span> <strong>$135.86</strong></li>
            <li><span>Payment Information:</span> <strong>American Express</strong></li>
          </ul>
        </div>
      </div>

      <div className="col-sm-6">
        <div className="review-item">
          <h6>Customer Details</h6>
          <Divider />
          <ul className="list-unstyled">
            <li><span>Name:</span> <strong>John Smith</strong></li>
            <li><span>Email:</span> <strong>johnsmith@example.com</strong></li>
            <li><span>State:</span> <strong>Las Vegas</strong></li>
            <li><span>Phone:</span> <strong>+0023 456 6789</strong></li>
          </ul>
        </div>
      </div>

      <div className="col-sm-6">
        <div className="review-item">
          <h6>Billing Address</h6>
          <Divider />
          <ul className="list-unstyled">
            <li><strong>
                John Smith <br/>3131 S Las Vegas Blvd,<br /> Las Vegas, <br /> NV 89109
            </strong></li>
          </ul>
        </div>
      </div>
      <div className="col-sm-6">
        <div className="review-item">
          <h6>Shipping Address</h6>
          <Divider />
          <ul className="list-unstyled">
            <li><strong>
                John Smith <br/>3131 S Las Vegas Blvd,<br /> Las Vegas, <br /> NV 89109
            </strong></li>
          </ul>
        </div>
      </div>
      <div className="col-sm-6"></div>
      <div className="col-sm-6">
        <div className="review-item totals">
          <ul className="list-unstyled">
            <li><span>Sub Total:</span> <strong>$145.89</strong></li>
            <li><span>Shipping:</span> <strong>$10.58</strong></li>
            <li><span>Grand total:</span> <strong>$156.12</strong></li>
            <li><span>Total Paid:</span> <strong>$80.00</strong></li>
            <li><span>Total Due:</span> <strong>$76.12</strong></li>
          </ul>
        </div>
      </div>
    </div>
  </div>

)

export default OrderReviewComponent;
