import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import * as talentActions from 'actions/talentActions';
import * as clientActions from 'actions/talentActions';
import {
  makeTalentNameWithTid
} from 'utils/appUtils';
import { adminStyles } from 'styles';


class ProfileItem extends Component {

  onClick = () => {
    const { profile, link } = this.props;
    this.props.talentActions.getTalentInfo(profile.id);
    console.log('===== props: ', this.props)
    this.props.history.push(link.pathname, link.state);
  };

  render() {
    const { profile, link, className, classes } = this.props;
    let defaultClassName = className ? className : classes.adminTalentViewButton;

    if (profile) {
      return (
        <Button variant="contained" size="large" fullWidth 
          className={classNames(classes.button, defaultClassName)} 
          onClick={this.onClick}
        >
          <Typography className={classNames(classes.bold, classes.adminTalentViewButtonText)}>
            { makeTalentNameWithTid(profile)}
          </Typography>
        </Button>
      )
    }

    return <div/>
  }
}


const mapDispatchToProps = dispatch => {
  return {
    clientActions: bindActionCreators(clientActions, dispatch),
    talentActions: bindActionCreators(talentActions, dispatch),
  }
};

const mapStateToProps = state => {
  const { talentSearchResult } = state;
  return {
    talentSearchResult: talentSearchResult.value,
    isLoading: talentSearchResult.isFetching
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(adminStyles)(withRouter(ProfileItem)));