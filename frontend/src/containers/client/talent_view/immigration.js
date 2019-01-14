import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Panel from 'components/general/panel';
import ClientForm from 'components/shiptalent/forms/clientForm';
import Spacer from 'components/general/spacer';
import styles from 'styles';


class Immigration extends Component {

  state = {
    talent: null,
  };

  getInfoFromProps = (props) => {
    if(props.location && props.location.state) return {talent: props.location.state.talent};
    else return {};
  };

  componentWillMount() {
    this.setState({ ...this.getInfoFromProps(this.props)});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.getInfoFromProps(nextProps)});
  }

  renderItem = (name, value) => {
    const { classes } = this.props;
    return (
      <Grid item xs={12}>
        <Grid container spacing={16} direction="row" justify="flex-start" alignItems="center">
          <Grid item>
            <Typography className={classes.financeTableTitle} >
              {name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.descriptionText} >
              {value}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  renderNationalityContent = (talent) => {
    return (
      <Panel title="Nationality & Immigration Information" bold center>
        <Grid container spacing={16} justify="flex-start" alignItems="center">
          {this.renderItem("Nationality: ", talent.nationality)}
          {this.renderItem("Citizenship: ", talent.citizenship)}
          {this.renderItem("Passport Expiration Date: ", talent.passport_expiration_date)}
          {this.renderItem("Passport Number: ",
            talent.passport_number ? talent.passport_number : "will be advised when contracted")}
          {this.renderItem("Country of Current Residence: ", talent.country_of_current_residence)}
        </Grid>
      </Panel>
    );
  };

  renderVisasContent = (talent) => {
    return (
      <Panel title="Current Visas" bold center>
        <Grid container spacing={16} justify="flex-start" alignItems="center">
          {this.renderItem("Current U.S. Permanent Resident Card (Green Card)? ",
            talent.have_green_card ? "YES" : "NO")}
          {this.renderItem("C1/D Visa: ", talent.expiration_date)}
          {this.renderItem("Schengen Visa: ", talent.green_card_expiration_date)}
        </Grid>
      </Panel>
    );
  };

  render() {
    const { talent } = this.state;
    return (
      <ClientForm
        nextLink={{pathname: '/client/talent_view', state: {talentId: talent && talent.id}}}
        nextButtonTitle="Back to Profile"
        talent={talent}
      >
        {this.renderNationalityContent(talent)}
        {this.renderVisasContent(talent)}
      </ClientForm>
    );
  }
}

export default withStyles(styles)(Immigration);
