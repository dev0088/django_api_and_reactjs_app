
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


function DashboardItem(props) {
  const { path, title, subTitle, titleClass, subTitleClass, classes } = props;
  return (
    <Link to={path}>
      <Card className={classes.dashboardItemPanel}>
        <Typography className={titleClass ? titleClass : classNames(classes.adminCastingRequestGroupButtonTitle, classes.centerText)}>
          {title}
        </Typography>
        <Spacer size={10} />
        <Typography className={subTitleClass ? subTitleClass : classNames(classes.adminCastingRequestGroupButtonSubTitle, classes.red, classes.bold, classes.centerText)}>
          {subTitle ? subTitle : <Spacer size={24} />}
        </Typography>
      </Card>
    </Link>
  );
}

DashboardItem.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(adminStyles)(DashboardItem);
