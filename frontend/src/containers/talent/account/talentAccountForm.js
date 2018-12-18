import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Panel from 'components/general/panel';
import Spacer from "components/general/spacer";
import styles from 'styles';


class TalentAccountForm extends Component {

  render() {
    const { classes } = this.props;

    return (
      <Panel>
        <Grid container spacing={40} direction="column" justify="center" alignItems="center">
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Spacer size={20}/>
          </Grid>

          <Grid item lg={3} md={3} sm={4} xs={6} className={classes.fullWidthButtonGridItem}>
            <Link to={'/finance-info'} >
              <Button variant="contained" color="primary" fullWidth={true}
                      className={ classes.generalAssistButton }
              >
                <Typography className={classes.generalAssistButtonTitle}>
                  {`My Finance`}
                </Typography>
              </Button>
            </Link>
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Spacer size={5}/>
          </Grid>

          <Grid item lg={3} md={3} sm={4} xs={6} className={classes.fullWidthButtonGridItem}>
            <Link to={'/change-password'} >
              <Button variant="contained" color="primary" fullWidth={true}
                      className={ classes.generalAssistButton }
              >
                <Typography className={classes.generalAssistButtonTitle}>
                  {`Change Password`}
                </Typography>
              </Button>
            </Link>
          </Grid>


          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Spacer size={50}/>
          </Grid>
        </Grid>
      </Panel>
    )
  }
}


export default withStyles(styles)(TalentAccountForm);

