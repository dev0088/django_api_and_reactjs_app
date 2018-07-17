import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import './styles.css';
import {fmtMSS} from "../../utils/helper";


export default class RecordCtl extends Component {

  constructor() {
    super();

    this.state = {
      isRecording: false,
      remaining: 120,
      total: 120,
      reset: false
    };
  }

  componentDidMount() {
    this.countDown();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.countStop) {
      this.setState({isRecording: false})
    }
  }

  onClick = () => {
    let {isRecording} = this.state;

    if (isRecording) {
      this.setState({isRecording: false});
      this.props.onStop()
    } else {
      this.setState({isRecording: true, reset:true});
      this.props.onStart();
    }
  };

  countDown = () => {
    const { total, isRecording, remaining, reset } = this.state;
    const __this = this;

    setTimeout(function () {
        if (remaining === 0) {
          if (isRecording) {
            __this.props.onStop()
            __this.setState({isRecording: false})
          } else {
            __this.setState({isRecording: true, remaining: total})
          }
        } else {
          if (reset) {
            __this.setState({remaining: total, reset: false});
          } else {
            const newRemaining = remaining - 1;
            __this.setState({remaining: newRemaining});
          }
        }

        if (!__this.props.countStop) {
          __this.countDown();
        }
    }, 1000)
  };

  render() {
    const { isRecording, remaining, total } = this.state;
    const { countStop } = this.props;

    return (<div className="record-ctl">
      <div className="countdown-label">
        { isRecording || countStop ? 'Response time' : 'Prep Countdown' } {fmtMSS(remaining)}
      </div>
      <div className="countdown-bar">
        <div id="myProgress">
          <div id="myBar" style={{width: `${remaining/total * 100}%`}}/>
        </div>
      </div>
      <div className="record-btn-wrapper">
        { !countStop &&
        <RaisedButton
          label={isRecording ? 'Stop Recording' : 'Start Recording'}
          className="btn-start-stop"
          onClick={this.onClick}
          primary={true}
        />}
      </div>
    </div>)

  }
}