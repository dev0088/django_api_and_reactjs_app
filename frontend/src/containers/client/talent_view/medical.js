import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Panel from 'components/general/panel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import ClientForm from 'components/shiptalent/forms/clientForm';
import Spacer from 'components/general/spacer';
import styles from 'styles';


class Medical extends Component {

  state = {
    talent: {},
    medicals: []
  };

  getInfoFromProps = (props) => {
    if(props.location && props.location.state)
      return {
        talent: props.location.state.talent,
        medicals: props.location.state.talent.talent_medicals
      };
    else return {};
  };

  componentWillMount() {
    this.setState({ ...this.getInfoFromProps(this.props)});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.getInfoFromProps(nextProps)});
  }

  isCheckedMedical = name => {
    const { medicals } = this.state;
    let key = this.getKeyOfCheckedMedicalByName(name);
    return key ? medicals[key].condition_value : false;
  };

  getKeyOfCheckedMedicalByName = (name) => {
    const { medicals } = this.state;
    let res = null;

    for (let i = 0; i < medicals.length; i ++) {
      if (medicals[i].condition_title === name) {
        res = i;
      }
    }

    return res
  };

  renderMedicalItem(name) {
    return (
      <Grid container spacing={16} justify="flex-start" alignItems="center">
        <Grid item xl={12} lg={12} md={12} xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.isCheckedMedical(name)}
                value={name}
                
                color="primary"
              />
            }
            label={name}
          />
        </Grid>
      </Grid>
    )
  }

  renderContent() {
    return (
      <Panel>
        <Spacer size={30} />
        <Grid container spacing={16} justify="flex-start" alignItems="center">
          <Grid item xl={6} lg={6} md={6} xs={12}>
            { this.renderMedicalItem('Pregnancy') }
            { this.renderMedicalItem('Epilepsy') }
            { this.renderMedicalItem('Insulin dependent diabetes') }
            { this.renderMedicalItem('Anxiety, mental or mood disorders') }
            { this.renderMedicalItem('Alcohol or drug addiction problems') }
            { this.renderMedicalItem('Eating disorders') }
            { this.renderMedicalItem('Body Mass Index greater than 30 or less than 18') }
            { this.renderMedicalItem('Diseases of the heart or arteries') }
            { this.renderMedicalItem('Hypertension') }
          </Grid>
          <Grid item xl={6} lg={6} md={6} xs={12}>
            { this.renderMedicalItem('Irregular heart rhythm') }
            { this.renderMedicalItem('Use of a pacemaker') }
            { this.renderMedicalItem('Diseases of the lungs') }
            { this.renderMedicalItem('Unexplained loss of consciousness') }
            { this.renderMedicalItem('Severe head injury or major brain surgery') }
            { this.renderMedicalItem('Severe deafness') }
            { this.renderMedicalItem('Joint replacements') }
            { this.renderMedicalItem('Limb prostheses') }
            { this.renderMedicalItem('Organ transplants') }
          </Grid>
          <Grid item xl={12} lg={12} md={12} xs={12}>
            { this.renderMedicalItem('Coronary bypass surgery or angioplasty') }
            { this.renderMedicalItem('Other conditions which can lead to sudden incapacity') }
            { this.renderMedicalItem('Conditions which limit mobility and stamina both under normal and emergency conditions') }
            { this.renderMedicalItem('Medication with side effects which reduce performance or alertness') }
          </Grid>
        </Grid>

        <Divider />

        <Grid container spacing={16} justify="flex-start" alignItems="center">
          <Grid item xl={12} lg={12} md={12} xs={12}>
            { this.renderMedicalItem('No pre-existing medical conditions to report.') }
            { this.renderMedicalItem('Certified in CPR.') }
            { this.renderMedicalItem('Has successfully completed a cruise line pre-employment physical in the past.') }
          </Grid>
        </Grid>
      </Panel>
    )
  }

  render() {
    const { talent } = this.state;
    return (
      <ClientForm
        nextLink={{pathname: '/client/talent_view', state: {talentId: talent && talent.id}}}
        nextButtonTitle="Back to Profile"
        talent={talent}
      >
        {talent && this.renderContent()}
      </ClientForm>
    );
  }
}

export default withStyles(styles)(Medical);
