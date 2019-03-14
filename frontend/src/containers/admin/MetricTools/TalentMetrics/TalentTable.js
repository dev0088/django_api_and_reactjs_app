import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "components/admin/Table/Table";
import Group from '@material-ui/icons/Group';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import TalentImage from './TalentImage';
import TalentItem from './TalentItem';
import { adminStyles } from 'styles';


class SortConditions extends React.Component  {
  render = () => {
    const { talents, isLoading, classes } = this.props;
    let talentTags = null;
    if (talents) talentTags = talents.map((talent, key) => {return [<TalentImage talent={talent}/>, <TalentItem talent={talent} key={key} />]});
    return (
      <Table 
        tableHead={[<Group className={classes.icon} color="primary" />, 'User']}
        tableData={ isLoading ?
          [['', <CircularProgress className={classes.progress} />]] : 
          ((talents && (talents.length > 0)) ? 
            talentTags  : 
            [[
              <Typography className={classes.adminTalentMatricTableNoItemText}>
                No item
              </Typography>
              , ''
            ]]
          )
        }
      />
    );
  };
}

SortConditions.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(adminStyles)(SortConditions);