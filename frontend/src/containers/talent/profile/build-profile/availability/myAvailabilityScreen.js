import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import RaisedButton from 'material-ui/RaisedButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import Spacer from "components/spacer";
import ConfirmChangesDialog from 'components/confirmChangesDialog';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import * as talentActions from 'actions/talentActions';
import TalentAPI from 'apis/talentAPIs'
import styles from 'styles';
import 'react-datepicker/dist/react-datepicker.css';


function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

class MyAvailability extends Component {
  constructor(props) {
    super(props);
    this.state = {
      availability: [],
      yearIndex: 0,
      isChanged: false,
      showConfirmChanges: false
    }
  }

  getInfoFromProps(props) {
    const { talentInfo } = props
    if (talentInfo) {
      this.setState({
        availability: talentInfo.availability
      })
    }
  }

  componentWillMount() {
    this.props.talentActions.getCurrentTalentInfo()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.getInfoFromProps(nextProps)
    })
  }

  handleYearChange = (event, value) => {
    this.setState({ yearIndex: value });
  };

  handleChangeYearIndex = index => {
    this.setState({ yearIndex: index });
  };



  handleCancel = () => {
    const {
      contactInfo,
      emergencyInfo
    } = this.getContactInfoFromProps(this.props)

    this.setState({
      contactInfo,
      emergencyInfo,
      isChanged: false
    })
  }

  handleSave = () => {
    const { availability } = this.state
    const { auth } = this.props

    let data = {
      user: {
        availability
      },
     
    }
    console.log('==== data: ', data)
    TalentAPI.saveTalentInfo(auth.access.user_id, data, this.handleSaveResponse)
  }


  handleSaveResponse = (response, isFailed) => {
    const { auth } = this.props
    console.log('==== response: ', response, isFailed)
    this.props.talentActions.getCurrentTalentInfo(auth.access.user_id)
    this.setState({
      isChanged: false
    })
  }

  checkChanges = (event) => {
    const { isChanged } = this.state
    if (isChanged) {
      event.preventDefault()
      this.setState({
        showConfirmChanges: true
      })
    }
  }

  handleCloseConfirm = () => {
    this.setState({
      showConfirmChanges: false
    })
  }

  renderCalendars = (year) => {
    return (
      <DatePicker
        inline
        selected={this.state.startDate}
        selectsStart
        startDate={this.state.startDate}
        endDate={this.state.endDate}
        onChange={this.handleChangeStart}
      />
    )
  }

  renderContents() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root} elevation={1}>
          <Grid container spacing={40}>
            <Grid item xs={12} >
              <Typography align="center" component="h3" variant="h3" gutterBottom>
                My Availability Calendar
              </Typography>
            </Grid>

            <Grid item xs={1} />
            <Grid item xs={10} >
              <Typography align="left" variant="body1">
                On the calendar below, click on the dates when you are NOT available.  These dates will then grey-out.  To select multiple dates, click on the first date, press and hold CONTROL and click on the second date.  All dates within this range will be selected.
              </Typography>
              <br/>
              <Typography align="left" variant="body1">
                It is advisable to select only those dates for which you have zero flexibility with availability.  When the cruise line casting director or hiring manager searches the dates of the job, if you have selected any dates within that search range, you will not appear in their search.  Solution: if you would be able to cancel any current or upcoming commitments or engagements should you be hired by a cruise line, do not show those dates as being unavailable in your Availability Calendar.
              </Typography>
              <br/>
              <Typography align="left" variant="body1">
                <b>SPECIAL NOTE:</b> if you are currently on board a cruise ship or already are contracted to join a cruise ship, DO show these dates as unavailable.  Cruise lines do not like to “steal” talent from other lines while the talent is contracted.
              </Typography>
              <br/>
              <Typography align="left" variant="body1">
                <b>MOST IMPORTANTLY:</b> Availability must always be up to date.  The only thing worse than not appearing in a cruise line’s search is appearing in the search and then not being available.  You don’t want  to be remembered for the wrong reasons.
              </Typography>
            </Grid>
            <Grid item xs={1} />

            <Grid item xs={1} />
            <Grid item xs={10} >
              <SwipeableViews
                axis={'x'}
                index={this.state.yearIndex}
                onChangeIndex={this.handleChangeYearIndex}
              >
                <TabContainer dir={'x'}>Item One</TabContainer>
                <TabContainer dir={'x'}>Item Two</TabContainer>
                <TabContainer dir={'x'}>Item Three</TabContainer>
              </SwipeableViews>
            </Grid>
            <Grid item xs={1} />

            <Grid item xs={10} >

            </Grid>
          </Grid>
        </Paper>
      </div>
    )
  }

  render() {
    const { classes } = this.props;
    const { showConfirmChanges } = this.state;

    return (
      <div className={"contact-info-view-container"}>
        {this.renderContents()}
        <Row >
          <Col xs="12" md="8" className="pt-4 pt-md-4"> </Col>
          <Col xs="12" md="4" className="pt-3 pt-md-3 profile-save-button-group-col">
            <Link to="/edit-profile" onClick={this.checkChanges} >
              <RaisedButton label="Back to Build/Edit My Profile" primary={true}/>
            </Link>
          </Col>
        </Row>

        <ConfirmChangesDialog
          open={showConfirmChanges}
          onClose={this.handleCloseConfirm}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { auth, talentInfo } = state;
  return {
    auth: auth.access,
    talentInfo: talentInfo.value,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    talentActions: bindActionCreators(talentActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(MyAvailability));
