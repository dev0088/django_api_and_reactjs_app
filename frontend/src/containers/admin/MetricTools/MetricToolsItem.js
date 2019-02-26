
import React from "react";
import PropTypes from "prop-types";
import classNames from 'classnames';
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import Panel from "components/general/panel";
import Card from "components/admin/Card/Card";
import Spacer from "components/general/spacer";
import { adminStyles } from 'styles';


function MetricToolsItem(props) {
  const { path, title, titleClass, subTitle, subTitleClass, classes } = props;
  return (
    <Link to={path}>
      <Card className={classes.metricToolsItemPanel}>
        <Typography className={titleClass ? titleClass : classNames(classes.metricToolsItemPanelTitle, classes.white, classes.centerText)}>
          {title}  
        </Typography>
        { subTitle &&
          <Typography className={subTitleClass ? subTitleClass : classNames(classes.metricToolsItemPanelSubTitle, classes.white, classes.centerText)}>
            {subTitle}  
          </Typography>
        }
      </Card>
    </Link>
  );
}

MetricToolsItem.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(adminStyles)(MetricToolsItem);
