import React, {Component} from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import './faq.css'

class Faq extends Component {

  render() {
    return(
      <div className="faq-container">
        <Row className="pt-5">
          <Col sm="12">
            <h3><i className="icon-map" />Frequently Asked Questions</h3>
            <hr />
            <p>
              Read carefully.  This is your contract with ShipTalent.com
              Commission agreement
              No guarantee of employment
              Medical disclosure responsibility and lack of liability
              If not 100% as represented and cruise line decides to not proceed after you have arrived, you will have to fly yourself home at your expense and will be permanently removed from ShipTalent.com.
              All profiles must be approved by ST
              We reserve the right to edit or remove any profiles at our sole discretion
              Both ShipTalent.com and the cruise line reserve the right to conduct a telephone, video or in-person interview, if required
              There are no fees to join the ShipTalent.com community.  Talent Profiles may be created Free of Charge.
              While profiles of qualified Talent will be viewed by executives and casting bookers at multiple cruise lines around the world, there is no guarantee of employment.  Ultimately, it is the employer (cruise line) who makes the final hire/no-hire decision
              Employment on a cruise ship requires a clean background check and alcohol/drug screening.  If you are unable to pass these checks for any reason, do not join the ShipTalent.com community.
              While there are no fees to join the ShipTalent.com community, when hired by a cruise line, Talent agrees to pay ShipTalent.com a 10% commission of Talent's monthly wage for 18 months of onboard service with same cruise line, then 5% of Talent's monthly wage in perpetuity while working with the same cruise line.
              The commission timeline resets to 10%/18-months when Talent moves to a different cruise line.
              All payments must be made by Talent or Talent's designee electronically on a monthly basis.  Delinquent payments will be reported to the employer/cruise line.
            </p>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    
  }
}

function mapDispatchToProps(dispatch) {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Faq);
