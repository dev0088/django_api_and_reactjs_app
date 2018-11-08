import React, {Component} from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import { withStyles } from '@material-ui/core/styles';
import styles from 'styles';

class ProfileWizard extends Component {

  handleClickBackButton = () => {
    const { handleClickBackButton } = this.props;
    if(handleClickBackButton) {
      handleClickBackButton()
    }
  };

  handleClickNextButton = () => {
    const { handleClickNextButton } = this.props;
    if(handleClickNextButton) {
      handleClickNextButton()
    }
  };

  render() {
    const { contents, backLink, nextLink } = this.props;

    return (
      <div className="contact-info-view-container">
        {contents}
        <Row>
          <Col xs="4" md="4" className="pt-3 pt-md-3 profile-back-button-group-col">
            <Link to={backLink}>
              <RaisedButton
                label="Back"
                primary={true}
                onClick={this.handleClickBackButton}
              />
            </Link>
          </Col>
          <Col xs="4" md="4" className="pt-4 pt-md-4" />
          <Col xs="4" md="4" className="pt-3 pt-md-3 profile-save-button-group-col">
            <Link to={nextLink}>
              <RaisedButton
                label="Next"
                primary={true}
                onClick={this.handleClickNextButton}
              />
            </Link>
          </Col>
        </Row>
      </div>
    )
  }
}

export default (withStyles(styles)(ProfileWizard));
