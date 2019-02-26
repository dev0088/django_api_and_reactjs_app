import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import defaultValues from 'constants/defaultValues';
import { adminStyles } from 'styles';


class SortConditions extends React.Component  {

  render = () => {
    const { sortConditions, onChange, classes } = this.props;
    const { ADMIN_TALENT_SORT_CONDITION } = defaultValues;

    return (
      <FormControl component="fieldset" className={classes.formControl}>
        <FormGroup>
          { Object.keys(ADMIN_TALENT_SORT_CONDITION).map(key => {
              let sortName = ADMIN_TALENT_SORT_CONDITION[key].name;
              let sortTitle = ADMIN_TALENT_SORT_CONDITION[key].title;
              return (
                <FormControlLabel
                  control={
                    <Checkbox checked={sortConditions[sortName]} onChange={onChange(sortName)} value={sortName} color="primary" />
                  }
                  label={sortTitle}
                />
              );
            })
          }
        </FormGroup>
      </FormControl>
    )
      
      
    
  };
}

SortConditions.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(adminStyles)(SortConditions);