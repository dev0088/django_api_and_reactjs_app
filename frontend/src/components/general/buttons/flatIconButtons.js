import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import {fullWhite} from 'material-ui/styles/colors';

import Panel from '../panel.js';

const style = {
  margin: 12,
};

const FlatIconButtons = () => (
  <Panel
    title="Flat Icon Buttons"
  >
    <div>
      <FlatButton
        icon={<ActionAndroid />}
        style={style}
      />
      <FlatButton
        backgroundColor="#a4c639"
        hoverColor="#8AA62F"
        icon={<ActionAndroid color={fullWhite} />}
        style={style}
      />
      <FlatButton
        icon={<ActionAndroid />}
        secondary={true}
        style={style}
      />
    </div>
  </Panel>
);

export default FlatIconButtons;
