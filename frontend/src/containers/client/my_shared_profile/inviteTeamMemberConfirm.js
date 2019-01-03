import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ClientForm from 'components/shiptalent/forms/clientForm';
import Panel from 'components/general/panel';
import Spacer from "components/general/spacer";
import styles from 'styles/clientStyles';


class InviteTeamMembersConfirm extends Component {

  state = {
    talent: null,
  };

  getInfoFromProps = (props) => {
    let talent = null;

    if (props.location && props.location.state) {
      talent = props.location.state.talent;
    }

    return {
      talent,
    }
  };

  componentWillMount() {
    this.setState({...this.getInfoFromProps(this.props)});
  }

  renderContents = () => {
    const { classes } = this.props;

    return (
      <Panel>
        <Grid container spacing={24} direction="column" justify="center" alignItems="center">
          <Grid item xs={12} >
            <Spacer size={10} />
          </Grid>
          <Grid item xs={12} >
            <Typography align="center" className={classes.clientFromTalentName} >
              Your invitation has been sent.
            </Typography>
          </Grid>
        </Grid>
      </Panel>
    );
  };


  render() {
    const { talent } = this.state;

    return(
      <ClientForm
        formTitle=""
        nextLink={{pathname: "/client/select_team_members", state: {talent}}}
        nextButtonTitle="Back to Share Profile"
      >
        {this.renderContents()}
      </ClientForm>
    );
  }
}

export default withStyles(styles)(InviteTeamMembersConfirm);
