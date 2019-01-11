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
import {getAvatarFromTalentInfo} from 'utils/appUtils';
import styles from 'styles';


class ClientCommunity extends Component {

  state = {
    feedback: '',
  };

  getInfoFromProps = (props) => {

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
    const { feedback } = this.state;
    let data = {
      feedback
    };

    event.preventDefault();

    ClientAPI.addClientFeedback(data, this.handleSubmitResponse);
  };

  handleSubmitResponse = (response, isFailed) => {
    if(isFailed) {
      this.props.globalNotificationActions.notify(
        true, 'error', response['feedback'] ? response['feedback'][0] : 'Failed to sent. Please try later.'
      );
    } else {
      this.props.globalNotificationActions.notify(true, 'success', 'sent your feedback successfully.');
      this.props.history.push('/client/community/confirm');
    }
  };

  renderContent = () => {
    const { classes } = this.props;
    const { feedback } = this.state;

    return (
      <Panel>
        <Grid container spacing={16} direction="column" justify="center" alignItems="center">
          <Grid item lg={8} md={8} sm={10} xs={10}>
            <Typography className={[classes.clientFormSubTitle, classes.centerText]} >
              {`Client feedback is critical to the success of ShipTalent.com. Help us better customize your experience by sharing any feedback, concerns and/or suggestions you may have, as well as reporting any bugs and/or glitches that you come across while using the system.`}
            </Typography>
          </Grid>

          <Grid item lg={8} md={8} sm={10} xs={10}>
            <Typography className={classes.clientFormSubTitle}>
              {'Your candid feedback is very much appreciated.'}
            </Typography>
          </Grid>
          <Grid item lg={8} md={8} sm={10} xs={10}>
            <Typography className={classes.clientFormSubTitle}>
              {'Thank you!'}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={16} justify="center" alignItems="center">
          <Grid item lg={10} md={10} sm={10} xs={10}>
            <TextField
              id="outlined-name"
              label=""
              value={feedback}
              type="text"
              onChange={this.onChangeComment('feedback')}
              margin="normal"
              variant="outlined"
              placeholder="Share your feedback here..."
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
            link='/client/rating_feedback/submitted'
            itemClass={classes.clientTalentViewMoreInfoButtonGridItem}
            buttonClass={[classes.clientTalentViewMoreInfoButton, classes.centerText]}
            title={'Submit Feedback'}
            titleClass={classes.clientTalentViewVideoButtonText}
            xl={5} lg={5} md={7} sm={8} xs={8} color={'secondary'} fullWidth={true}
            onClickButton={this.handleSubmit}
          />

        </Grid>
      </Panel>
    );
  };

  render() {
    return (
      <ClientForm
        formTitle="Client Community"
        nextLink={'/client/home'}
        nextButtonTitle="Back to My Home Page"
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


export default connect(null, mapDispatchToProps)(withStyles(styles)(ClientCommunity));
