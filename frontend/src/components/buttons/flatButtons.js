import React from 'react';
import FlatButton from 'material-ui/FlatButton';

import Panel from '../panel.js';

const FlatButtons = () => {
  return (
    <Panel
      title="Flat Buttons"
    >
      <div>
        <FlatButton label="Default" />
        <FlatButton label="Primary" primary={true} />
        <FlatButton label="Secondary" secondary={true} />
        <FlatButton label="Disabled" disabled={true} />
        <br />
        <br />
        <FlatButton label="Full width" fullWidth={true} />
      </div>
    </Panel>
  );
}

export default FlatButtons;
