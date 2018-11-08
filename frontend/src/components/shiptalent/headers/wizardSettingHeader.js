import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { styles } from 'styles';

class WizardSettingHeader extends Component {

  render() {
    const { talentInfo, classes,
      showSex, showPositionType, showSkill
    } = this.props;

    return (
      <Grid container spacing={24}>
        { showSex && (
          <Grid item md={12}>
            <Grid container spacing={24}>
              <Grid item md={1} sm={2} xs={3} >
                <Typography variant="subtitle1" className={classes.wizardSettingHeaders}>
                  {"I am a: "}
                </Typography>
              </Grid>
              <Grid  item md={11} sm={10} xs={9} >
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className={classes.wizardSettingHeaderButton}
                  fullWidth={false}
                >
                  <Typography className={classes.wizardSettingHeaderText}>
                    {talentInfo && talentInfo.sex === 'm' ? 'Male' : 'Fomel'}
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}
        { showPositionType && (
          <Grid item md={12}>
            <Grid container spacing={24}>
              <Grid item md={1} sm={2} xs={3} >
                <Typography variant="subtitle1" className={classes.wizardSettingHeaderTitle}>
                  {"Who is a: "}
                </Typography>
              </Grid>
              <Grid item wrap-xs-nowrap md={11} sm={10} xs={9} >
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className={classes.wizardSettingHeaderButton}
                  fullWidth={false}
                >
                  <Typography className={classes.wizardSettingHeaderText}>
                    {talentInfo && talentInfo.sex === 'm' ? 'Male' : 'Fomel'}
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}
        { showSkill && (
          <Grid item md={12}>
            <Grid container spacing={24}>
              <Grid item wrap-xs-nowrap md={1} sm={2} xs={3} >
                <Typography variant="subtitle1" className={classes.wizardSettingHeaders}>
                  {"Who is a: "}
                </Typography>
              </Grid>
              <Grid item md={11} sm={10} xs={9} >
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className={classes.wizardSettingHeaderButton}
                  fullWidth={false}
                >
                  <Typography className={classes.wizardSettingHeaderText}>
                    {talentInfo && talentInfo.sex === 'm' ? 'Male' : 'Fomel'}
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    )
  }
}

export default withStyles(styles, { withTheme: true })(WizardSettingHeader);