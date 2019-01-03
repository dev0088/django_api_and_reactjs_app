import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ClientForm from 'components/shiptalent/forms/clientForm';
import Panel from 'components/general/panel';
import RatingTalentTable from './RatingTalentTable';
import ClientAPI from 'apis/clientAPIs';
import styles from 'styles';


class MyRate extends Component {

  state = {
    castingRequestTalents: []
  };

  componentWillMount() {
    ClientAPI.getAllCompletedCastingRequestTalent(this.handleResponse);
  }

  handleResponse = (response, isFailed) => {
    console.log('==== Completed CastingRequestTalent: response: ', response);
    if(isFailed) {

    } else {
      this.setState({castingRequestTalents: response});
    }
  };

  render() {
    const { classes } = this.props;
    return(
      <ClientForm
        formTitle="My Rating"
        formSubTitle="Please assist the Client Community by submitting a rating and comments for each talent who has completed his/her contract"
        formSubTitleClass={classes.clientRatingSubTitle}
        nextLink="/client/home"
        nextButtonTitle="Back to My Home Page"
      >
        <Grid container spacing={40} direction="column" justify="center" alignItems="center">
          <Panel title="Talent who have completed their contract but have not been rated:" bold={true}>
            <RatingTalentTable castingRequestTalents={this.state.castingRequestTalents} />
          </Panel>
        </Grid>
      </ClientForm>
    );
  }
}


export default withStyles(styles)(MyRate);