import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SwipeableViews from 'react-swipeable-views';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import moment from 'moment';
import MultiRangeCalendar from 'components/shiptalent/calendars/multiRangeCalendar';
import ClientForm from 'components/shiptalent/forms/clientForm';
import { styles } from 'styles';


const FIRST_YEAR = (new Date().getFullYear()).toString();
const SECOND_YEAR = (parseInt(FIRST_YEAR) + 1).toString();
const THIRD_YEAR = (parseInt(FIRST_YEAR) + 2).toString();
const YEARS = [ FIRST_YEAR, SECOND_YEAR, THIRD_YEAR ];

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

class Availability extends Component {
  constructor(props) {
    super(props);
    this.state = {
      talent: null,
      availabilities: [],
      yearIndex: 0,
    };
  }

  filterAvailabilitiesByYearAndMonth = (availabilities, year, month) => {
    let res = [];

    for(let i = 0; i < availabilities.length; i ++) {
      let availability = availabilities[i];
      let start_year = moment(availability.start_date).format('YYYY');
      let start_month = moment(availability.start_date).format('M');
      if (start_year === year && parseInt(start_month) === month ) {
        res.push(availability);
      }
    }

    return res;
  };

  initializeSelectionRange = () => {
    let res = {
      [FIRST_YEAR]: [],
      [SECOND_YEAR]: [],
      [THIRD_YEAR]: []
    };

    Object.keys(res).map(key => {
      for (let i = 0; i < 12; i ++) {
        res[key].push({
          startDate: new Date(`${key}-${i + 1}-1`),
          endDate: new Date(`${key}-${i + 1}-1`),
          key: `selection${i}`
        });
      }
    });

    return res;
  };

  convertAvailabilities2SelectionRange = (availabilities) => {
    let selectionRange = this.initializeSelectionRange()

    Object.keys(availabilities).map(key => {
      for (let i = 0; i < availabilities[key].length; i++) {
        let availability = availabilities[key][i];
        let year = moment(availability.start_date).format('YYYY');
        let month = parseInt(moment(availability.start_date).format('M')) - 1;

        selectionRange[year][month].startDate = new Date(availability.start_date);
        selectionRange[year][month].endDate = new Date(availability.end_date);
      }
    });

    return selectionRange
  };

  convertSelectionRange2Availabilities = (selectionRange) => {
    let res = [];
    let result = Object.keys(selectionRange).map(yearKey => {
      let yearRanges = selectionRange[yearKey];
      let result = Object.keys(yearRanges).map(monthKey => {
        let monthRange = yearRanges[monthKey];
        let start_date = moment(monthRange.startDate).format('YYYY-MM-DD HH:mm ZZ');
        let end_date = moment(monthRange.endDate).format('YYYY-MM-DD HH:mm ZZ');

        if (start_date !== end_date) {
          // Add updated date range
          res.push({ start_date, end_date })
        }
        return ''
      });
      return ''
    });

    return res
  };

  getInfoFromProps = (props) => {
    let talent = null;
    let availabilities = [];
    let yearIndex = 0;
    let currentYear = FIRST_YEAR;
    let selectionRange = null;

    if(props.location && props.location.state) talent = props.location.state.talent;

    if (talent) {
      availabilities = talent.talent_availabilities;
    }


    return {
      talent,
      availabilities,
      yearIndex,
      currentYear
    }
  };

  componentWillMount() {
    this.setState({ ...this.getInfoFromProps(this.props)});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.getInfoFromProps(nextProps)});
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

  renderYearButton = () => {
    const { classes } = this.props;
    const { yearIndex } = this.state;

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
  };

  renderContents = () => {
    const { classes } = this.props;
    const { yearIndex } = this.state;

    return (
      <Paper className={classes.paperContent} elevation={1}>
        <Grid container spacing={24}>
          <Grid item xs={12} />
          <Grid item xs={12} >
            <Typography align="center" component="h4" variant="h4" gutterBottom>
              Availability Calendar
            </Typography>
          </Grid>

          <Grid item xs={12} />

          <Grid item xs={12} md={12} sm={12}>
            <Grid container spacing={40}>
              <Grid item xs={12} md={12} sm={12}>
                { this.renderYearButton() }
              </Grid>
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
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  };

  renderMultiRangeCalendars = (year) => {
    const { availabilities } = this.state;
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
            disabled={true}
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


  render = () => {
    const { talent } = this.state;

    return (
      <ClientForm
        nextLink={{pathname: '/client/talent_view', state: {talentId: talent && talent.id}}}
        nextButtonTitle="Back to Profile"
        talent={talent}
      >
        {this.renderContents()}
      </ClientForm>
    );
  };
}

export default withStyles(styles, { withTheme: true })(Availability);
