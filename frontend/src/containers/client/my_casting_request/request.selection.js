import React, {Component} from 'react'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Redirect} from 'react-router'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ClientForm from 'components/shiptalent/forms/clientForm';
import ColumnButton from 'components/shiptalent/buttons/columnButton';
import {requestView} from "actions/clientActions";
import styles from 'styles';
import '../client.css'
import Spacer from "../../../components/general/spacer";

const mapDispatchToProps = dispatch => {
  return {

  }
};

const mapStateToProps = state => {
  return {
    initState: state.requestViewReducer
  }
};

class RequestSelection extends Component {

  renderContent() {
    const { classes } = this.props

    return (
      <Grid container spacing={40} direction="column" justify="center" alignItems="center">
        <Grid item xs={12} >
          <Spacer size={10} />
        </Grid>
        <ColumnButton
          link = {'/client/casting_request/new'}
          itemClass = {classes.clientTalentViewVideoButtonGridItem}
          buttonClass = {classes.clientTalentViewVideoButton}
          title = {"Create New Casting Request"}
          titleClass = {classes.clientTalentViewVideoButtonText}
          xs = {12}
          fullWidth = {true}
        />
        <ColumnButton
          link = {'/client/casting_request/list_view'}
          itemClass = {classes.clientTalentViewVideoButtonGridItem}
          buttonClass = {classes.clientTalentViewVideoButton}
          title = {"View My Casting Requests"}
          titleClass = {classes.clientTalentViewVideoButtonText}
          xs = {12}
          fullWidth = {true}
        />
        <Grid item xs={12} >
          <Spacer size={50} />
        </Grid>
      </Grid>
    )
  }

  render() {
    return(
      <Grid container spacing={24}>
        <Grid item xs={12} >
          <ClientForm
            formTitle="My Casting Requests Selection"
            nextLink="/client/home"
            nextButtonTitle="Back to My Home Page"
          >
            {this.renderContent()}
          </ClientForm>
        </Grid>
      </Grid>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RequestSelection))