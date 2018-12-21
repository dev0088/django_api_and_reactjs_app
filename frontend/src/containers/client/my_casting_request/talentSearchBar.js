import React from 'react';
import {connect} from "react-redux";
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import * as clientActions from 'actions/clientActions';
import styles from 'styles';


class TalentSearchBar extends React.Component {

  state = {
    searchKeyword: ''
  };

  handleChangeSearchKeyword = (event) => {
    this.setState({
      searchKeyword: event.target.value,
    });
  };

  keyPress = (event) => {
    if(event.keyCode === 13) {
      event.preventDefault();
      this.handleClickSearch();
    }
  };

  handleClickSearch = () => {
    let data = {
      talent_name_or_tid: this.state.searchKeyword,
      casting_request_id: this.props.castingRequestID
    };

    this.props.clientActions.talentSearch(data);
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container spacing={16} justify="center" alignItems="center">
        <Grid item lg={11} md={10} sm={8} xs={12} >
          <TextField
            id="outlined-search"
            label="Search talent"
            type="search"
            className={classes.searchTextField}
            margin="normal"
            placeholder="Add by Name or Talent ID"
            variant="outlined"
            fullWidth
            onChange={this.handleChangeSearchKeyword}
            onKeyDown={this.keyPress}
          />
        </Grid>
        <Grid item lg={1} md={2} sm={4} xs={12} >
          <Button
            variant="contained"
            fullWidth={true}
            className={classes.clientTalentSearchButton}
            onClick={this.handleClickSearch}
          >
            <Typography className={classes.clientCastingRequestListViewButtonText}>
              {`Search`}
            </Typography>
          </Button>
        </Grid>
      </Grid>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clientActions: bindActionCreators(clientActions, dispatch)
  }
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(TalentSearchBar));
