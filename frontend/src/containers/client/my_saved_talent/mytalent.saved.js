import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ClientForm from 'components/shiptalent/forms/clientForm';
import ColumnButton from 'components/shiptalent/buttons/columnButton';
import Spacer from "components/general/spacer";
import {requestView} from "actions/clientActions";
import styles from 'styles';


class MyTalentSaved extends Component {

  render() {
    const { classes } = this.props;

    return(
      <ClientForm
        formTitle="My Saved Talent"
        nextLink="/client/home"
        nextButtonTitle="Back to My Home Page"
      >
        <Grid container spacing={40} direction="column" justify="center" alignItems="center">
          <Grid item xs={12} >
            <Spacer size={10} />
          </Grid>
          <ColumnButton
            link = {'/client/mycallback'}
            itemClass = {classes.clientTalentViewVideoButtonGridItem}
            buttonClass = {classes.clientTalentViewVideoButton}
            title = {"View My Callbacks"}
            titleClass = {classes.clientTalentViewVideoButtonText}
            xs = {12}
            fullWidth = {true}
          />
          <ColumnButton
            link = {'/client/myfavorite'}
            itemClass = {classes.clientTalentViewVideoButtonGridItem}
            buttonClass = {classes.clientTalentViewVideoButton}
            title = {"View My Favorites"}
            titleClass = {classes.clientTalentViewVideoButtonText}
            xs = {12}
            fullWidth = {true}
          />
          <Grid item xs={12} >
            <Spacer size={50} />
          </Grid>
        </Grid>
      </ClientForm>
    );
  }
}


export default withStyles(styles)(MyTalentSaved);