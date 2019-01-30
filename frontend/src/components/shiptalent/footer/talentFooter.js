import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import './footer.css'
import { styles } from 'styles'
import Spacer from "components/general/spacer";


const ClientFooter = (props) => (
  <footer className={props.classes.footerLayout} style={props.position ? {position: props.position} : {}}>
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Spacer size={20} />
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Link to="/terms">
          <Typography className={props.classes.footerMenuItemText}>
            {"Client Terms & Conditions"}
          </Typography>
        </Link>
        <Typography className={props.classes.footerItemSeparator}>
          {" | "}
        </Typography>
        <Link to="/faq">
          <Typography className={props.classes.footerMenuItemText}>
            {"FAQ"}
          </Typography>
        </Link>
        <Typography className={props.classes.footerItemSeparator}>
          {" | "}
        </Typography>
        <Link to="/contact-us">
          <Typography className={props.classes.footerMenuItemText}>
            {"Contact Us"}
          </Typography>
        </Link>
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Spacer size={5} />
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Typography className={props.classes.footerDescriptionText}>
          ShipTalent.com
        </Typography>
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Spacer size={10} />
      </Grid>
    </Grid>
  </footer>
);

export default withStyles(styles)(ClientFooter);