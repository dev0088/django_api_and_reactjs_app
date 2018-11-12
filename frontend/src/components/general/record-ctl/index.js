import React, {Component} from 'react';
import './styles.css';

export default class RecordCtl extends Component {

  render() {
    const { total, remaining } = this.props;

    return (<div className="record-ctl">
              <div className="countdown-bar">
                <div id="myProgress">
                  <div id="myBar" style={{width: `${remaining/total * 100}%`}}/>
                </div>
              </div>
            </div>);
  }
}