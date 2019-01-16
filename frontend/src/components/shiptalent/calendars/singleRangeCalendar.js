import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { DateRange } from 'react-date-range';
import moment from 'moment';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './multiRangeCalendar.css';
import styles from 'styles';

class SingleRangeCalendar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      year: '2018',
      month: '1',
      minDate: new Date(`2018-1-1 01:00:00`),
      maxDate: new Date(`2018-1-31 23:59:00`),
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

    return res;
  };

  getInfoFromProps(props) {
    const { year, month, ranges } = props;
    const minDate = new Date(parseInt(year), parseInt(month) - 1, 1);
    const maxDate = new Date(parseInt(year), parseInt(month), 0);
    const defaultFocusRangeKey = `selection-${year}-${month}-focus`;
    const newRanges = this.convertStr2Date(ranges, year, month, defaultFocusRangeKey, minDate);

    return {
      year: year,
      month: month,
      minDate: minDate ? minDate : new Date(`${year}-${parseInt(month)}-${1}`),
      maxDate: maxDate ? maxDate : new Date(`${year}-${parseInt(month)}-${31}`),
      ranges: newRanges,
      // selections: newRanges.length - 1,
      defaultFocusRangeKey: defaultFocusRangeKey
    }
  }

  componentWillMount() {
    this.setState({
      ...this.getInfoFromProps(this.props)
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.getInfoFromProps(nextProps)
    })
  }

  handleCalendarSelect = (range, year, month) => {
    const { ranges, selections } = this.state;
    let newSelections = selections + 1;
    let newRanges = ranges;
    console.log(`===== handleCalendarSelect: range: `, range);
    console.log(`===== key: `, `selection-${year}-${month}-${selections}`);
    let firstRange = range[Object.keys(range)[0]];
    let newRange = {
      startDate: firstRange.startDate,
      endDate: firstRange.endDate,
      key: `selection-${year}-${month}-${selections}`,
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
        onChange(ranges, year, month);
      }
    });
  };


  handleRangeChange = (payload) => {
    console.log(`===== handleRangeChange: payload: `, payload);
    this.setState({
      ...this.state.ranges,
      ...payload,
    });
  };

  handleRangeFocusChange = (focusedRange) => {
    console.log('==== focusedRange: ', focusedRange)
    this.setState({
      ranges: this.removeDefaultFocusRange(this.state.ranges, this.state.defaultFocusRangeKey)
    });
  };

  render() {
    const { year, month, minDate, maxDate, ranges, focusedRange } = this.state
    console.log('====== state: ', this.state);


    return (
      <DateRange
        showMonthAndYearPickers={false}
        showDateDisplay={false}
        date={null}
        preview={{startDate: new Date(parseInt(year), parseInt(month) - 1, 15), endDate: new Date(parseInt(year), parseInt(month) - 1, 15)}}
        moveRangeOnFirstSelection={false}
        minDate={minDate}
        maxDate={maxDate}
        focusedRange={focusedRange}
        ranges={ranges}
        onChange={range => this.handleCalendarSelect(range, year, month)}
        onRangeFocusChange={this.handleRangeFocusChange}
      />
    );
  }
}


export default (withStyles(styles)(SingleRangeCalendar));