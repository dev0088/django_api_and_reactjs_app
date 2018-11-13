import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {fullWhite} from 'material-ui/styles/colors';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import Panel from '../panel.js';

const style = {
  margin: 12,
};

const RaisedIconButtons = () => (
  <Panel title="Raised Icon Buttons">
    <div>
      <RaisedButton
        icon={<ActionAndroid />}
        style={style}
      />
      <RaisedButton
        backgroundColor="#a4c639"
        icon={<ActionAndroid color={fullWhite} />}
        style={style}
      />
      <RaisedButton
        href="https://github.com/callemall/material-ui"
        target="_blank"
        secondary={true}
        icon={<ActionAndroid/>}
        style={style}
        />
      </div>
    </Panel>
);

export default RaisedIconButtons;
