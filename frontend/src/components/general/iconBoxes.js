/**
 * filename: iconBoxes.js
 * Home page top samll icon boxex
 */

import React from 'react';
import TinyBarChart from '../charts/tinyBarChart.js';
import TinyAreaChart from '../charts/tinyAreaChart.js';
import TinyLineChart from '../charts/tinyLineChart.js';

export const BoxSingle = (props) => {
  // Used a style const for changing icon box
  // color using props.
  const style = {
    backgroundColor: props.iconbg
  }

  return (
    <div className="iconbox-single">
      <div className="box-title">
        <div className="circle-icon" style={style}>
          <i className="material-icons">{props.icon}</i>
        </div>
        <div>
          <h5>{props.title}</h5>
          <p>{props.subtitle}</p>
        </div>
      </div>
      <div className="chart">
        {props.children}
      </div>
    </div>
  );
}

const IconBoxes = () => {
  return (
    <div className="iconbox-wrapper">
      <div className="row">
        <div className="col-md-4">
          <BoxSingle
            iconbg="#258df2"
            icon="supervisor_account"
            title="2, 324"
            subtitle="Visitors"
          >
            <TinyBarChart />
          </BoxSingle>
        </div>

        <div className="col-md-4">
          <BoxSingle
            iconbg="#40c741"
            icon="monetization_on"
            title="9, 693"
            subtitle="Revenues"
          >
            <TinyAreaChart />
          </BoxSingle>
        </div>

        <div className="col-md-4">
          <BoxSingle
            iconbg="#fdba2c"
            icon="shopping_basket"
            title="1, 250"
            subtitle="Orders"
          >
            <TinyLineChart />
          </BoxSingle>
        </div>
      </div>
    </div>
  );
}

export default IconBoxes;
