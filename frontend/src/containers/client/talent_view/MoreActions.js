import React, {Component} from 'react'
import { withStyles, createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import ColumnButton from 'components/shiptalent/buttons/columnButton';
import Grid from '@material-ui/core/Grid';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';
import styles from 'styles';

const theme = createMuiTheme ({
  palette: {
    primary: {
      main: '#007bff',
    },
    secondary: {
      main: '#40c741'
    },
    green: {
      main: '#28a745'
    },
    teal: {
      main: '#20c997'
    },
    white: {
      main: '#FFFFFF',
      light: grey[100],
      dark: grey[300],
      thin: '#d6d7d8',
      contrastText: '#fff'
    },
    black: {
      main: grey[900],
      dark: grey[800],
      thin: grey[700],
      light: grey[600],
    },
    grey: {
      main: grey[900],
      dark: grey[800],
      light: grey[400],
      thin: grey[200],
    },
    darkGrey: {
      main: grey[800]
    },
    lightGrey: {
      main: grey[400]
    },
    red: {
      main: '#C00',
      thin: red[400],
      light: red[400],
      dark: red[900]
    },
    blue: {
      main: blue[700],
      light: blue[400],
      dark: blue[900]
    }
  }
});

class MoreActions extends Component {

  renderButton(link, title, subTitle) {
    const { classes } = this.props;
    return (
      <ColumnButton
        itemClass={classes.clientTalentViewMoreInfoButtonGridItem}
        link={link}
        buttonClass={classes.clientTalentViewMoreInfoButton}
        title={title} titleClass={classes.clientTalentViewMoreInfoButtonText}
        subTitle={subTitle} subTitleClass={classes.clientTalentViewMoreInfoButtonStatusText}
        lg={12} md={12} xs={12} size={12} color="primary" fullWidth={true}
      />
    );
  }

  render() {
    const { talent } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <Grid container spacing={16} direction="column" justify="center" alignItems="center">
          {this.renderButton({pathname: '/client/request', state: {talent}}, "Request More Info")}
          {this.renderButton({pathname: '/client/select_team_members', state: {talent}}, "Shared Profile")}
          {this.renderButton(
            {pathname: '/client/block_profile/edit', state: {talent}},
            "Block Profile", "Temporarily or permanently"
          )}
        </Grid>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(MoreActions);