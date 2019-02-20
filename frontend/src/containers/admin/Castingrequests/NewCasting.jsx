import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Panel from "components/general/panel";
import AdminForm from 'components/shiptalent/forms/adminForm';
import CastingRequestTableWithFilterCondition from './CastingRequestTableWithFilterCondition';
import { adminStyles } from 'styles';


class NewCasting extends React.Component  {

  renderContent = () => {
    const { location } = this.props;
    let filterCondition = (location && location.state && location.state.filterCondition) ? location.state.filterCondition : null;
    return (
      <Panel>
        <CastingRequestTableWithFilterCondition filterCondition={filterCondition} />
      </Panel>
    );
  };

  render() {
    const { location } = this.props;
    let title = (location && location.state && location.state.title) ? location.state.title : 'NEW CASTING REQUESTS';
    
    return (
      <AdminForm
        formTitle={title}
        backLink={"/admin/casting-requests"}
        backButtonTitle="Casting Requests"
        nextLink={"/admin"}
        nextButtonTitle="Agent Dashboard"
      >
        {this.renderContent()}
      </AdminForm>
    );
  }
}

export default withStyles(adminStyles)(NewCasting);
