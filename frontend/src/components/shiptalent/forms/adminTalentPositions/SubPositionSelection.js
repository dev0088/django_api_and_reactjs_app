import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import SubPropertyButton from './SubPropertyButton';
import { adminStyles } from 'styles';


class SubPositionSelection extends Component {
  render() {
    const {subPosition, selected, titleItem } = this.props;
    return(
      <SubPropertyButton title={subPosition[titleItem][0] } selected={selected} />
    );
  }
}

export default withStyles(adminStyles)(SubPositionSelection);