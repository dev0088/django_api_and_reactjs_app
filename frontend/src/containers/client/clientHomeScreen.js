import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ColumnButton from 'components/shiptalent/buttons/columnButton';
import * as clientActions from 'actions/clientActions';
import { styles } from 'styles';
import { Row, Col, Jumbotron } from 'reactstrap';
import './client.css';
import Spacer from "../../components/general/spacer";

class ClientHomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clientInfo: null
    }
  }

  componentWillMount() {
    this.props.clientActions.getCurrentClientInfo()
  }

  render() {
    const {clientInfo, classes} = this.props
    let userName = ''
    if (clientInfo) {
      userName = `${clientInfo.user.first_name} ${clientInfo.user.last_name}`
    }

    return (
      <div className={classes.clientHomeContainer}>
        <Jumbotron className={[classes.centerText, classes.clientHomeButtonsContainer]}>
          <Grid container spacing={16} direction="column" justify="center" alignItems="center">
            <Grid item md={12} xs={12}>
              <Typography className={[classes.h4SmallMargin, classes.bold]}>
                {`Welcome, ${userName}!`}
              </Typography>
              <Typography className={[classes.h4SmallMargin, classes.bold, classes.centerText]}>
                {`My Home Page`}
              </Typography>
            </Grid>

            <Grid item md={12} xs={12}>
              <Spacer size={10}/>
            </Grid>

            <ColumnButton
              link={{
                pathname: "/client/talent_search"
              }}
              color="primary"
              itemClass={classes.talentProfileGuideButtonItem}
              buttonClass={classes.clientHomeButton}
              title={"Fine Talent"}
              titleClass={classes.clientHomeButtonTitle}
              subTitle={"Search for new talent"}
              subTitleClass={classes.clientHomeButtonSubTitle}
              xs={12}
              fullWidth={false}
            />
            <Grid item md={7} sm={12} xs={12}>
              <Grid container spacing={16} direction="row" justify="center" alignItems="center">
                <Grid item lg={6} md={6} sm={6} xs={12} className={classes.talentProfileGuideButtonItem}>
                  <Link to='/client/request_selection'>
                    <Button
                      variant="contained" color={'primary'}
                      fullWidth={true}
                      className={classes.clientHomeButton}
                    >
                      <Typography className={classes.clientHomeButtonTitle}>
                        {"My Casting Requests"}
                      </Typography>
                      <Typography className={classes.clientHomeButtonSubTitle}>
                        {"Create and view casting requests"}
                      </Typography>
                    </Button>
                  </Link>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12} className={classes.talentProfileGuideButtonItem}>
                  <Link to='/client/mytalent/saved'>
                    <Button
                      variant="contained" color={'primary'}
                      fullWidth={true}
                      className={classes.clientHomeButton}
                    >
                      <Typography className={classes.clientHomeButtonTitle}>
                        {"My Saved Talent"}
                      </Typography>
                      <Typography className={classes.clientHomeButtonSubTitle}>
                        {"View callbacks and favorites"}
                      </Typography>
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Grid>

            <Grid item md={7} sm={12} xs={12}>
              <Grid container spacing={16} direction="row" justify="center" alignItems="center">
                <Grid item lg={6} md={6} sm={6} xs={12} className={classes.talentProfileGuideButtonItem}>
                  <Link to='/client/myshared_profile'>
                    <Button
                      variant="contained" color={'primary'}
                      fullWidth={true}
                      className={classes.clientHomeButton}
                    >
                      <Typography className={classes.clientHomeButtonTitle}>
                        {"My Shared Profiles"}
                      </Typography>
                      <Typography className={classes.clientHomeButtonSubTitle}>
                        {"View talent that was shared with your team"}
                      </Typography>
                    </Button>
                  </Link>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12} className={classes.talentProfileGuideButtonItem}>
                  <Link to='/client/blocked_profile'>
                    <Button
                      variant="contained" color={'primary'}
                      fullWidth={true}
                      className={classes.clientHomeButton}
                    >
                      <Typography className={classes.clientHomeButtonTitle}>
                        {"My Blocked Profiles"}
                      </Typography>
                      <Typography className={classes.clientHomeButtonSubTitle}>
                        {"View and change talent that you have blocked either temporarily or permanently"}
                      </Typography>
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Grid>

            <ColumnButton
              link={{
                pathname: "/client/my_rate"
              }}
              color="primary"
              itemClass={classes.talentProfileGuideButtonItem}
              buttonClass={classes.clientHomeButton}
              title={"My Rating"}
              titleClass={classes.clientHomeButtonTitle}
              subTitle={"Provide end of contract ratings and comments of hired talent"}
              subTitleClass={classes.clientHomeButtonSubTitle}
              xs={12}
              fullWidth={false}
            />
            <ColumnButton
              link={{
                pathname: "#"
              }}
              color="primary"
              itemClass={classes.talentProfileGuideButtonItem}
              buttonClass={classes.clientHomeButton}
              title={"Client Community"}
              titleClass={classes.clientHomeButtonTitle}
              subTitle={"Provide feedback to customize your experience"}
              subTitleClass={classes.clientHomeButtonSubTitle}
              xs={12}
              fullWidth={false}
            />
            <Grid item md={12} xs={12}>
              <Spacer size={50}/>
            </Grid>
          </Grid>
        </Jumbotron>
        <img src={require('images/backgrounds/sunrise-on-sea-view-from-moving-cruise-ship.png')}
             alt="home background" className={classes.homeBackgroundImage}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { clientInfo } = state
  return {
    clientInfo: clientInfo && clientInfo.value ? clientInfo.value : null
  }
}

function mapDispatchToProps(dispatch) {
  return {
    clientActions: bindActionCreators(clientActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ClientHomeScreen));