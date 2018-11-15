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

const mapDispatchToProps = dispatch => {
  return {
    getOnlineData: bindActionCreators(requestView, dispatch)
  }
};

const mapStateToProps = state => {
  return {
    initState: state.requestViewReducer
  }
};

class RequestSelection extends Component {
  button_style = {
    fontWeight: 'bold',
    fontSize: '1.6rem',
    width: '22rem'
  };

  parentStyle = {
    paddingTop: '0'
  };

  btnStyles = {
    position: 'absolute',
    right: '3rem',
    bottom: '3rem'
  };

  renderContent() {
    const { classes } = this.props

    return (
      <Grid container spacing={24}>
        <Grid item xs={4} />
        <Grid item xs={4} >
          <Grid container spacing={24}>
            <ColumnButton
              link = {'/client/casting_request/new'}
              itemClass = {classes.clientTalentViewVideoButtonGridItem}
              buttonClass = {classes.clientTalentViewVideoButton}
              title = {"Create New Casting Request"}
              titleClass = {classes.clientTalentViewVideoButtonText}
              size = {12}
              fullWidth = {true}
            />
            <ColumnButton
              link = {'/client/casting_request/view'}
              itemClass = {classes.clientTalentViewVideoButtonGridItem}
              buttonClass = {classes.clientTalentViewVideoButton}
              title = {"View My Casting Requests"}
              titleClass = {classes.clientTalentViewVideoButtonText}
              size = {12}
              fullWidth = {true}
            />
          </Grid>
        </Grid>
        <Grid item xs={4} />
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
            contents={this.renderContent()}
          />
        </Grid>
      </Grid>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RequestSelection))