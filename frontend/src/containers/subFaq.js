import React, {Component} from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Truncate from 'react-truncate-html';
import * as shiptalentInfoActions from  '../actions/shiptalentInfoActions'
import './subFaq.css'

class SubFaq extends Component {

  constructor(props) {
    super(props);
    this.state = {
      shiptalentInfo: props.shiptalentInfo.value,
      titleArray: {
        "what_is_shiptalent": "What is ShipTalent.com?",
        "how_does_shiptalent_work": "How Does ShipTalent.com Work?",
        "why_use_shiptalent": "Why use ShipTalent.com?",
        "the_shiptalent_difference": "The ShipTalent.com Difference",
      }
    };

  }
  componentWillMount() {
    this.props.shiptalentInfoActions.getShipTalentInfo()
    this.setState({
      shiptalentInfo: this.props.shiptalentInfo.value
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      shiptalentInfo: nextProps.shiptalentInfo.value
    })
  }

  getValueByName(name) {
    try {
      if (this.state.shiptalentInfo) {
        let info = this.state.shiptalentInfo.find(function(info) {
          return info.name === name;
        })
        return info ? info.value : ''
      }
    } catch (error) {

    }
    return '';
  }

  render() {
    const { pageId } = this.props.match.params;
    return(
      <div className="faq-container">
        <Row className="pt-5">
          <Col sm="12">
            <h3><i className="icon-map" />{ this.state.titleArray[pageId] }</h3>
            <hr />
            <Truncate
              lines={9}
              dangerouslySetInnerHTML={{
               __html: this.getValueByName(pageId)
              }}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { shiptalentInfo } = state;
  return {
    shiptalentInfo: shiptalentInfo,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    shiptalentInfoActions: bindActionCreators(shiptalentInfoActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubFaq);
