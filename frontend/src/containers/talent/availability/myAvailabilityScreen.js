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
import SwipeableViews from 'react-swipeable-views';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Spacer from "components/general/spacer";
import ConfirmChangesDialog from 'components/shiptalent/dialogs/confirmChangesDialog';
import { DateRange } from 'react-date-range';
import moment from 'moment';
import * as talentActions from 'actions/talentActions';
import TalentAPI from 'apis/talentAPIs'
import SaveCancelButtonGroup from 'components/shiptalent/buttonGroups/saveCancelButtonGroup';
import MultiRangeCalendar from 'components/shiptalent/calendars/multiRangeCalendar';
import { styles } from 'styles';

const FIRST_YEAR = (new Date().getFullYear()).toString()
const SECOND_YEAR = (parseInt(FIRST_YEAR) + 1).toString()
const THIRD_YEAR = (parseInt(FIRST_YEAR) + 2).toString()
const YEARS = [ FIRST_YEAR, SECOND_YEAR, THIRD_YEAR ]

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
      availabilities: [],
      yearIndex: 0,
      showConfirmChanges: false,
      selectionRange: null,
      isChanged: false,
    }
  }

  filterAvailabiilities(availabilities) {
    let res = {
      [FIRST_YEAR]: [],
      [SECOND_YEAR]: [],
      [THIRD_YEAR]: []
    }

    for(let i = 0; i < availabilities.length; i ++) {
      let availability = availabilities[i];
      let year = moment(availability.start_date).format('YYYY');

      if ( year === FIRST_YEAR) {
        res[FIRST_YEAR].push(availability)
      } else if ( year === SECOND_YEAR) {
        res[SECOND_YEAR].push(availability)
      } else if ( year === THIRD_YEAR) {
        res[THIRD_YEAR].push(availability)
      }
    }

    return res
  }

  filterAvailabilitiesByYearAndMonth(availabilities, year, month) {
    let res = []

    for(let i = 0; i < availabilities.length; i ++) {
      let availability = availabilities[i];
      let start_year = moment(availability.start_date).format('YYYY');
      let start_month = moment(availability.start_date).format('M');
      if (start_year === year && parseInt(start_month) === month ) {
        res.push(availability);
      }
    }

    return res
  }

  initializeSelectionRange() {
    let res = {
      [FIRST_YEAR]: [],
      [SECOND_YEAR]: [],
      [THIRD_YEAR]: []
    }

    Object.keys(res).map(key => {
      for (let i = 0; i < 12; i ++) {
        res[key].push({
          startDate: new Date(`${key}-${i + 1}-1`),
          endDate: new Date(`${key}-${i + 1}-1`),
          key: `selection${i}`
        })
      }
    })

    return res
  }


  convertAvailabilities2SelectionRange(availabilities) {
    let selectionRange = this.initializeSelectionRange()

    Object.keys(availabilities).map(key => {
      for (let i = 0; i < availabilities[key].length; i++) {
        let availability = availabilities[key][i]
        let year = moment(availability.start_date).format('YYYY')
        let month = parseInt(moment(availability.start_date).format('M')) - 1
        selectionRange[year][month].startDate = new Date(availability.start_date)
        selectionRange[year][month].endDate = new Date(availability.end_date)
      }
    });

    return selectionRange
  }

  convertSelectionRange2Availabilities(selectionRange) {
    let res = []
    let result = Object.keys(selectionRange).map(yearKey => {
      let yearRanges = selectionRange[yearKey]
      let result = Object.keys(yearRanges).map(monthKey => {
        let monthRange = yearRanges[monthKey]
        let start_date = moment(monthRange.startDate).format('YYYY-MM-DD HH:mm ZZ')
        let end_date = moment(monthRange.endDate).format('YYYY-MM-DD HH:mm ZZ')
        if (start_date !== end_date) {
          // Add updated date range
          res.push({ start_date, end_date })
        }
        return ''
      })
      return ''
    })

    return res
  }

  getInfoFromProps(props) {
    const { talentInfo } = props
    let availabilities = []
    let yearIndex = 0
    let currentYear = FIRST_YEAR
    let selectionRange = null

    if (talentInfo) {
      availabilities = talentInfo.talent_availabilities;
    }

    return {
      availabilities,
      yearIndex,
      currentYear,
      selectionRange,
      isChanged: false,
      showConfirmChanges: false
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

  handleClickPreviousYear = (yearIndex) => {
    this.setState({ yearIndex: (yearIndex - 1) });
  };

  handleClickNextYear = (yearIndex) => {
    this.setState({ yearIndex: (yearIndex + 1) });
  };

  handleChangeYearIndex = (index, value) => {
    this.setState({ yearIndex: index });
  };

  handleCancel = () => {
    this.setState({
      ...this.getInfoFromProps(this.props),
      isChanged: false
    })
  };

  handleSave = () => {
    const { availabilities } = this.state
    let data = {
      talent_availabilities: availabilities,
    };

    TalentAPI.saveAvailabilityWithToken(data, this.handleSaveResponse)
  };


  handleSaveResponse = (response, isFailed) => {
    this.props.talentActions.getCurrentTalentInfo();
    this.setState({
      isChanged: false
    })
  };

  checkChanges = (event) => {
    const { isChanged } = this.state;
    if (isChanged) {
      event.preventDefault();
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

  handleCalendarSelect = (range, year, month) => {
    const { selectionRange } = this.state
    let updatedSelectionRange = selectionRange

    updatedSelectionRange[year][month].startDate = range[`selection${month}`].startDate
    updatedSelectionRange[year][month].endDate = range[`selection${month}`].endDate

    this.setState({
      selectionRange: updatedSelectionRange
    })
  }

  renderYearButton = () => {
    const { classes } = this.props
    const { yearIndex } = this.state

    return (
      <Grid container spacing={40}>
        <Grid item xs={6} sm>
          <Grid container direction="column" justify="center" alignItems="flex-start" spacing={24}>
            <Grid item xs={12} sm >
              {
                (yearIndex >= 1) ? (
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => this.handleClickPreviousYear(yearIndex)}
                  >
                    <NavigateBeforeIcon className={classes.buttonIcon}/>
                    {YEARS[yearIndex - 1]}
                  </Button>
                ) : (
                  <div />
                )
              }
            </Grid>
          </Grid>
        </Grid>


        <Grid item xs={6} sm>
          <Grid container direction="column" justify="center" alignItems="flex-end" spacing={24}>
            <Grid item xs={12} sm>
              {
                (yearIndex <= 1) ? (
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => this.handleClickNextYear(yearIndex)}
                  >
                    {YEARS[yearIndex + 1]}
                    <NavigateNextIcon className={classes.buttonIcon}/>
                  </Button>
                ) : (
                  <div />
                )
              }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  renderCalendars = (yearIndex) => {
    const { selectionRange } = this.state
    const year = YEARS[yearIndex]

    if (selectionRange) {
      return (
        <Grid container spacing={24}>
          {
            Object.keys(selectionRange[year]).map(key => {
              let monthRange = selectionRange[year][key]
              let minDate = new Date(`${year}-${parseInt(key) + 1}-1`)
              let maxDate = new Date(`${year}-${parseInt(key) + 1}-${31}`)
              let ranges = monthRange.startDate ? [monthRange] : []

              return (
                <Grid item xl={3} md={4} sm={6} xs={12} key={key}>
                  <DateRange
                    showMonthAndYearPickers={false}
                    showDateDisplay={false}
                    shownDate={''}
                    date={''}
                    moveRangeOnFirstSelection={false}
                    minDate={minDate}
                    maxDate={maxDate}
                    ranges={ranges}
                    onChange={range => this.handleCalendarSelect(range, year, key)}
                    className={'PreviewArea'}
                  />
                </Grid>
              )
            })
          }
        </Grid>
      )
    }

    return (
      <div/>
    )
  }

  renderContents() {
    const { classes } = this.props
    const { yearIndex } = this.state
    return (
      <div>
        <Paper className={classes.paperContent} elevation={1}>
          <Grid container spacing={24}>
            <Grid item xs={12} />
            <Grid item xs={12} >
              <Typography align="center" component="h4" variant="h4" gutterBottom>
                My Availability Calendar
              </Typography>
            </Grid>

            <Grid item xs={12} />
            <Grid item xs={12} >
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

            <Grid item xs={12} md={12} sm={12}>
              <Grid container spacing={40}>
                <Grid item xs={12} md={12} sm={12}>
                  <SwipeableViews
                    axis={'x'}
                    index={yearIndex}
                    onChangeIndex={(index) => this.handleChangeYearIndex(index, yearIndex)}
                  >
                    <TabContainer dir={'x'}>{this.renderMultiRangeCalendars(YEARS[0])}</TabContainer>
                    {<TabContainer dir={'x'}>{this.renderMultiRangeCalendars(YEARS[1])}</TabContainer>}
                    {<TabContainer dir={'x'}>{this.renderMultiRangeCalendars(YEARS[0])}</TabContainer>}
                  </SwipeableViews>
                </Grid>
                <Grid item xs={12} md={12} sm={12}>
                  { this.renderYearButton() }
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={12} sm={12}>
              <SaveCancelButtonGroup
                onSave={this.handleSave}
                onCancel={this.handleCancel}
              />
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
  }

  renderMultiRangeCalendars = (year) => {
    const { availabilities } = this.state

    let calendars = [];

      for(let i = 1; i <= 12; i ++) {
        let filteredAvailabilities = this.filterAvailabilitiesByYearAndMonth(availabilities, year, i);
        calendars.push(
          <Grid item xl={3} md={4} sm={6} xs={12} key={`multiRangeCalendar${i}`}>
            <MultiRangeCalendar
              ranges={filteredAvailabilities}
              year={year}
              month={i.toString()}
              moveRangeOnFirstSelection={false}
              className={'PreviewArea'}
              onChange={this.onChangeCallback}
            />
          </Grid>
        )
      }

    return (
      <Grid container spacing={24}>
        { calendars }
      </Grid>
    );
  };

  onChangeCallback = (ranges, year, month) => {
    const { availabilities } = this.state;
    // Remove availabilities matching to year and month
    let filteredAvailabilities = availabilities.filter(function(availability) {
      return !(new RegExp(`${year}-${((month.length === 1) ? "0" + month : month)}-[0-3][0-9]`, "g"))
              .test(availability.start_date);
    });
    // Add ranges parameter
    let mergedAvailabilities = filteredAvailabilities.concat(ranges);

    this.setState({
      availabilities: mergedAvailabilities
    });
  };


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
