import React, {Component} from 'react'
import {connect} from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ClientForm from 'components/shiptalent/forms/clientForm';
import Panel from 'components/general/panel';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Spacer from "components/general/spacer";
import styles from 'styles';


class SharedProfileConfirm extends Component {

  state = {
    talent: null,
    teamMembers: []
  };

  getInfoFromProps = (props) => {
    let talent = null;
    let teamMembers = [];

    if (props.location && props.location.state) {
      talent = props.location.state.talent;
      teamMembers = props.location.state.teamMembers;
    }

    return {
      talent,
      teamMembers
    }
  };

  componentWillMount() {
    this.setState({...this.getInfoFromProps(this.props)});
  }

  renderTeamMembers = () => {
    const { teamMembers } = this.state;
    const { classes } = this.props;
    let listItems = teamMembers.map(teamMember => {
      return (
        <ListItem key={teamMember.id}>
          <ListItemText primary={teamMember.member_email} />
        </ListItem>
      )
    });

    return (
      <Grid container spacing={16} justify="flex-start" alignItems="flex-start">
        <Grid item xs={12} >
          {
            listItems.length > 0 ? (
              <List className={classes.leftText}>
                {listItems}
              </List>
            ) : (
              <Typography align="center" className={[classes.descriptionText, classes.italicText]} >
                No items
              </Typography>
            )
          }
        </Grid>
      </Grid>
    );
  };

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
              This profile and your comments have been shared with:
            </Typography>
          </Grid>
          <Grid item xs={8}>
            {this.renderTeamMembers()}
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
        nextLink={{pathname: "/client/talent_view", state: {talentID: talent ? talent.id : 0}}}
        nextButtonTitle="Back to Profile"
      >
        {this.renderContents()}
      </ClientForm>
    );
  }
}

const mapStateToProps = (state) => {
  const { clientInfo } = state;

  return {
    clientInfo: clientInfo && clientInfo.value ? clientInfo.value : null
  }
};

const mapDispatchToProps = dispatch => {
  return {

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SharedProfileConfirm));
