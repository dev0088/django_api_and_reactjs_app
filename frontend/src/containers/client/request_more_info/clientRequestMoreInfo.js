import React, {Component} from 'react';
import {connect} from "react-redux";
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ColumnButton from 'components/shiptalent/buttons/columnButton';
import TextField from '@material-ui/core/TextField';
import Panel from 'components/general/panel';
import ClientForm from 'components/shiptalent/forms/clientForm';
import Spacer from 'components/general/spacer';
import ClientAPI from 'apis/clientAPIs';
import * as globalNotificationActions from 'actions/globalNotificationActions';
import styles from 'styles';


class ClientRequestMoreInfo extends Component {

  state = {
    talent: null,
    request: '',
  };

  getInfoFromProps = (props) => {
    if(props.location && props.location.state) return {talent: props.location.state.talent}
    else return {}
  };

  componentWillMount() {
    this.setState({ ...this.getInfoFromProps(this.props)});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.getInfoFromProps(nextProps)});
  }

  onChangeComment = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    const { request } = this.state;
    const { talent } = this.props.location.state;
    let data = {
      talent: talent.id,
      request
    };

    // event.preventDefault();

    ClientAPI.addRequestMoreInfo(data, this.handleSubmitResponse);
  };

  handleSubmitResponse = (response, isFailed) => {
    const { talent } = this.state;
    if(isFailed) {
      this.props.globalNotificationActions.notify(
        true, 'error', response['request'] ? response['request'][0] : 'Failed to sent. Please try later.'
      );
    } else {
      this.props.globalNotificationActions.notify(true, 'success', 'sent your request successfully.');
      this.props.history.push({pathname: '/client/request/confirm', state: {talent}});
    }
  };

  renderContent = () => {
    const { classes } = this.props;
    const { request } = this.state;

    return (
      <Panel>
        <Grid container spacing={16} direction="column" justify="center" alignItems="center">
          <Grid item lg={8} md={8} sm={10} xs={10}>
            <Typography className={[classes.clientFormSubTitle, classes.centerText]} >
              {`You have requested more information on this talent. Please tell us below what you need.`}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={16} justify="center" alignItems="center">
          <Grid item lg={10} md={10} sm={10} xs={10}>
            <TextField
              id="outlined-name"
              label=""
              value={request}
              type="text"
              onChange={this.onChangeComment('request')}
              margin="normal"
              variant="outlined"
              placeholder="Type request here..."
              multiline
              rows={5}
              rowsMax={2}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Spacer size={30} />
          </Grid>

          <ColumnButton

            itemClass={classes.clientTalentViewMoreInfoButtonGridItem}
            buttonClass={[classes.clientTalentViewMoreInfoButton, classes.centerText]}
            title={'Submit Request'}
            titleClass={classes.clientTalentViewVideoButtonText}
            xl={5} lg={5} md={7} sm={8} xs={8} color={'secondary'} fullWidth={true}
            onClickButton={this.handleSubmit}
          />

        </Grid>
      </Panel>
    );
  };

  render() {
    const { talent } = this.state;
    return (
      <ClientForm
        formTitle="Client Community"
        nextLink={{pathname: '/client/talent_view', state: {talentId: talent && talent.id}}}
        nextButtonTitle="Back to Profile"
        talent={talent}
      >
        {this.renderContent()}
      </ClientForm>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    globalNotificationActions: bindActionCreators(globalNotificationActions, dispatch)
  }
};


export default connect(null, mapDispatchToProps)(withStyles(styles)(ClientRequestMoreInfo));
