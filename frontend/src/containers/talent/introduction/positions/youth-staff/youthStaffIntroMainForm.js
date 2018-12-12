import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Alert } from 'reactstrap';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Panel from 'components/general/panel';
import { generateLinkWithPosition } from 'utils/appUtils'
import YouthStaffIntroCommon from './youthStaffIntroCommon';
import styles from 'styles';

class YouthStaffIntroMainForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: props.position
    }
  }

  getInfoFromProps(props) {
    this.setState({
      position: props.position
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.getInfoFromProps(nextProps)
    })
  }

  renderContents() {
    const { classes, formTitle } = this.props;
    const { position } = this.state;

    return (
      <Panel>
        <Grid container spacing={16} justify="center" alignItems="center">
          <Grid item lg={1} md={1} sm={1} xs={1} />
          <Grid item lg={10} md={10} sm={10} xs={10}>
            <YouthStaffIntroCommon formTitle={formTitle} />
          </Grid>
          <Grid item lg={1} md={1} sm={1} xs={1} />
        </Grid>
      </Panel>
    )
  }

  render() {
    return (
      <div>
        {this.state.notification && <Alert color="info">{this.state.notification}</Alert>}
        {this.renderContents()}
      </div>
    )
  }
}

export default withStyles(styles)(YouthStaffIntroMainForm);
