import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './multiRangeCalendar.css';

import moment from 'moment';
import styles from 'styles';

class MultiRangeCalendar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      year: '2018',
      month: '1',
      minDate: new Date(`2018-1-1 9:00:00 EST`),
      maxDate: new Date(`2018-1-31 18:00:00 EST`),
      ranges: [],
      selections: 0,
      focusedRange: [0],
      defaultFocusRangeKey: null
    }
  }

  generateDefaultFocusRange = (year, month, defaultFocusRangeKey, focusDate) => {
    return {
      startDate: focusDate,
      endDate: focusDate,
      key: defaultFocusRangeKey,
      autoFocus: true,
      disabled: false
    }
  };

  removeDefaultFocusRange = (ranges, defaultFocusRangeKey) => {
    return ranges.filter(function(range) {
      return range.key !== defaultFocusRangeKey
    })
  };

  convertStr2Date = (ranges, year, month, defaultFocusRangeKey, minDate) => {
    let res = [];

    for(let i = 0; i < ranges.length; i++) {
      let range = ranges[i];
      let newRange = {
          startDate: new Date(range.start_date),
          endDate: new Date(range.end_date),
          key: `selection-${year}-${month}-${i}`,
          color: '#3d91ff'
      };
      res.push(newRange);
    }

    if (res.length > 0) {
      res = this.removeDefaultFocusRange(res, defaultFocusRangeKey);
    } else {
      res.push(this.generateDefaultFocusRange(year, month, defaultFocusRangeKey, minDate));
    }

    if (year === "2018" && month === 5) {
      console.log('=== convertStr2Date: ', res);
    }

    return res;
  };

  convertDate2Str(ranges) {
    let res = [];
    const { defaultFocusRangeKey } = this.state;
    let newRanges = this.removeDefaultFocusRange(ranges, defaultFocusRangeKey);

    for(let i = 0; i < newRanges.length; i++) {
      let range = newRanges[i];
      let strRange = {
        start_date: moment(range.startDate).format('YYYY-MM-DD HH:mm ZZ'),
        end_date: moment(range.endDate).format('YYYY-MM-DD HH:mm ZZ')
      };

      res.push(strRange);
    }

    return res;
  }

  getInfoFromProps(props) {
    const { year, month, ranges } = props;
    const minDate = new Date(parseInt(year), parseInt(month) - 1, 1);
    const maxDate = new Date(parseInt(year), parseInt(month), 0);
    const defaultFocusRangeKey = `selection-${year}-${month}-focus`;
    const newRanges = this.convertStr2Date(ranges, year, month, defaultFocusRangeKey, minDate);

    return {
      year: year,
      month: month,
      minDate: minDate ? minDate : new Date(`${year}-${parseInt(month)}-${1} 09:00 EST`),
      maxDate: maxDate ? maxDate : new Date(`${year}-${parseInt(month)}-${31} 18:00 EST`),
      ranges: newRanges,
      selections: newRanges.length - 1,
      defaultFocusRangeKey: defaultFocusRangeKey
    }
  }

  componentWillMount() {
    this.setState({
      ...this.getInfoFromProps(this.state)
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.getInfoFromProps(nextProps)
    })
  }

  handleRangeSelect = (range, year, month) => {
    const { ranges, selections } = this.state;
    let newSelections = selections + 1;
    let newRanges = ranges;
    console.log(`===== handleRangeSelect: range: `, range);
    console.log(`===== key: `, `selection-${year}-${month}-${selections}`);
    let firstRange = range[Object.keys(range)[0]];
    let newRange = {
      startDate: firstRange.startDate,
      endDate: firstRange.endDate,
      key: `selection-${year}-${month}-${selections + 1}`,
      color: '#3d91ff'
    };

    newRanges.push(newRange);

    if(newRanges.length > 1) {
      newRanges = this.removeDefaultFocusRange(newRanges, this.state.defaultFocusRangeKey);
    }

    this.setState({ ranges: newRanges, selections: newSelections }, () => {
      const { onChange } = this.props;
      const { ranges } = this.state;
      if (onChange) {
        let strRanges = this.convertDate2Str(ranges);
        onChange(strRanges, year, month);
      }
    });
  };

  handleRangeFocusChange = (focusedRange) => {
    this.setState({
      ranges: this.removeDefaultFocusRange(this.state.ranges, this.state.defaultFocusRangeKey)
    });
  };

  render() {
    const { year, month, minDate, maxDate, ranges, focusedRange } = this.state

    return (
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <DateRange
            showMonthAndYearPickers={false}
            showDateDisplay={false}
            date={null}
            preview={{startDate: minDate, endDate: minDate}}
            moveRangeOnFirstSelection={false}
            minDate={minDate}
            maxDate={maxDate}
            focusedRange={focusedRange}
            ranges={ranges}
            onChange={range => this.handleRangeSelect(range, year, month)}
            onRangeFocusChange={this.handleRangeFocusChange}
          />
        </Grid>
      </Grid>
    );
  }
}


export default (withStyles(styles)(MultiRangeCalendar));