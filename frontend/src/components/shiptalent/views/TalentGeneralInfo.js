import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {
  makeTitleWithAllPositionTypes, existSkill, makeHeight, makeWeight, makeLanguages,
  getPracticVideoNumbers, getLiveVideoNumbers, checkPreviousShipMedical, checkCPR
} from 'utils/appUtils';
import styles from 'styles';


class TalentGeneralInfo extends Component {

  renderGeneralInfoName = (name) => {
    return (
      <Grid item xs={6}>
        <Typography className="profile-general-info-name">{name}</Typography>
      </Grid>
    )
  };

  renderGeneralInfoValue = (value) => {
    return (
      <Grid item xs={6}>
        <Typography className="profile-general-info-value">{value}</Typography>
      </Grid>
    )
  };

  render() {
    const {
      nationality, citizenship, have_green_card, height, weight,
      bmi, age_range, talent_visas, talent_languages, talent_medicals, worked_cruise_ship,
    } = this.props.talent;

    return (
      <div>
        <Grid container spacing={0}>
          {this.renderGeneralInfoName("Height: ")}
          {this.renderGeneralInfoValue(makeHeight(height))}
          {this.renderGeneralInfoName("Weight: ")}
          {this.renderGeneralInfoValue(makeWeight(weight))}
          {this.renderGeneralInfoName("BMI: ")}
          {this.renderGeneralInfoValue(bmi)}
          {this.renderGeneralInfoName("Age Range: ")}
          {this.renderGeneralInfoValue(age_range)}
          {this.renderGeneralInfoName("Languages: ")}
          {this.renderGeneralInfoValue(makeLanguages(talent_languages))}
          {this.renderGeneralInfoName("Nationality: ")}
          {this.renderGeneralInfoValue(nationality)}
          {this.renderGeneralInfoName("Citizenship: ")}
          {this.renderGeneralInfoValue(citizenship)}
        </Grid>

        { talent_visas.length > 0 ? (
          talent_visas.map((visa, index) => {
            return (
              <Grid container spacing={0} key={index}>
                {this.renderGeneralInfoName(`${visa.name} Visa: `)}
                {this.renderGeneralInfoValue('YES')}
              </Grid>
            )
          })
        ) : (
          <Grid container spacing={0}>
            {this.renderGeneralInfoName(`Visa: `)}
            {this.renderGeneralInfoValue('No')}
          </Grid>
        )}
        <Grid container spacing={0}>
          {this.renderGeneralInfoName(`Green Card: `)}
          {this.renderGeneralInfoValue(have_green_card ? "YES" : "NO")}
          {this.renderGeneralInfoName(`Previous Ship Experience: `)}
          {this.renderGeneralInfoValue(checkPreviousShipMedical(talent_medicals) ? "YES" : "NO")}
          {this.renderGeneralInfoName(`CPR: `)}
          {this.renderGeneralInfoValue(checkCPR(talent_medicals) ? "YES" : "NO")}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(TalentGeneralInfo);