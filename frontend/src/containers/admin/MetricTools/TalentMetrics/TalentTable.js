import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "components/admin/Table/Table";
import Group from '@material-ui/icons/Group';
import TalentItem from './TalentItem';
import { adminStyles } from 'styles';


class SortConditions extends React.Component  {

  componentWillReceiveProps = (nextProps) => {

  }

  render = () => {
    const { talents, isLoading, classes } = this.props;
    let talentTags = null;
    if (talents) talentTags = talents.map((talent, key) => {return [<TalentItem talent={talent} key={key} />, '']});
    return (
      <Table 
        tableHead={[<Group className={classes.icon} color="primary" />, 'User']}
        tableData={ talents ? talentTags : null}
        isLoading={isLoading}
      />
    );
  };
}

SortConditions.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(adminStyles)(SortConditions);