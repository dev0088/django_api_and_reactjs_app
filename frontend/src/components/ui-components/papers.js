import React from 'react';
import Paper from 'material-ui/Paper';

const style = {
  height: 60,
  width: 60,
  margin: 10,
  textAlign: 'center',
  display: 'inline-block',
};

export const PaperRounded = () => (
  <div>
    <Paper style={style} zDepth={1} />
    <Paper style={style} zDepth={2} />
    <Paper style={style} zDepth={3} />
    <Paper style={style} zDepth={4} />
    <Paper style={style} zDepth={5} />
  </div>
);

export const PaperNoRounded = () => (
  <div>
    <Paper style={style} zDepth={1} rounded={false} />
    <Paper style={style} zDepth={2} rounded={false} />
    <Paper style={style} zDepth={3} rounded={false} />
    <Paper style={style} zDepth={4} rounded={false} />
    <Paper style={style} zDepth={5} rounded={false} />
  </div>
);

export const PaperCircle = () => (
  <div>
    <Paper style={style} zDepth={1} circle={true} />
    <Paper style={style} zDepth={2} circle={true} />
    <Paper style={style} zDepth={3} circle={true} />
    <Paper style={style} zDepth={4} circle={true} />
    <Paper style={style} zDepth={5} circle={true} />
  </div>
);
