import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import ClearRounded from '@material-ui/icons/ClearRounded';
import Panel from 'components/general/panel';
import CastingRequestTalent from './castingRequestTalent';
import ClientAPI from 'apis/clientAPIs';
import styles from 'styles';


const theme = createMuiTheme ({
  palette: {
    primary: {
      main: '#2a3134',
    },
    secondary: {
      main: '#C00'
    }
  }
});

class CastingRequestTalentsForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      castingRequest: props.castingRequest,
      castingRequestTalents: props.castingRequestTalents,
      newCastingRequestTalents: props.newCastingRequestTalents,
      error: false
    };
  }

  getInfoFromProps = (props) => {
    return {
      title: props.title,
      castingRequest: props.castingRequest,
      castingRequestTalents: props.castingRequestTalents,
      newCastingRequestTalents: props.newCastingRequestTalents
    }
  };

  componentWillMount() {
    this.setState({ ...this.getInfoFromProps(this.props) });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.getInfoFromProps(nextProps) });
  }

  removeTalent = (castingRequestTalent) => {
    ClientAPI.deleteCastingRequestTalent(castingRequestTalent.id, this.handleRemoveTalentResponse);
  };

  handleRemoveTalentResponse = (response, isFailed) => {
    console.log('===== response: ', response, isFailed);
    if (isFailed) {

    } else {
      if(this.props.handleRemoveTalent) {
        this.props.handleRemoveTalent(response.id);
      }
    }
  };

  renderCastingRequestTalentRow = (castingRequestTalent, castingRequest, isNew) => {
    const { classes } = this.props;

    return (
      <Grid item xs={12}>
        <Grid container spacing={8} justify="center" alignItems="center">
          <Grid item xs={12} >
            <div className={classes.clientTalentControlContainerDiv}>
              <MuiThemeProvider theme={theme}>
                <div style={{height:'20px'}}>
                  <Typography color="secondary" className={classNames(classes.clientTalentControlNewText)}>
                    { isNew ? "New" : "" }
                  </Typography>
                </div>
                <div>
                  <Link to={{
                    pathname: '/client/casting_request/add_wage',
                    state: {castingRequestTalent, castingRequest}
                  }}
                  >
                    <EditIcon color="primary" className={classes.clientTalentControlEditIcon}/>
                  </Link>
                </div>
                <div>
                  <Button
                    variant="contained"
                    color="secondary"
                    aria-label="Edit"
                    className={classes.clientTalentControlDeleteButton}
                    onClick={() => this.removeTalent(castingRequestTalent)}
                  >
                    <ClearRounded className={classes.clientTalentControlDeleteIcon}/>
                  </Button>
                </div>
              </MuiThemeProvider>
            </div>
            <div className={classes.clientTalentContainerDiv}>
              <CastingRequestTalent castingRequestTalent={castingRequestTalent} />
            </div>
          </Grid>
        </Grid>
      </Grid>
    )
  };

  render() {
    const { title, castingRequest, castingRequestTalents, newCastingRequestTalents } = this.state;
    let items = [];
    let __this = this;
    if (newCastingRequestTalents && newCastingRequestTalents.length > 0) {
      items.push(
        newCastingRequestTalents.map(castingRequestTalent => {
          return __this.renderCastingRequestTalentRow(castingRequestTalent, castingRequest, true);
        })
      );

    }

    if (castingRequestTalents && castingRequestTalents.length > 0) {
      items.push(
        castingRequestTalents.map(castingRequestTalent => {
          return __this.renderCastingRequestTalentRow(castingRequestTalent, castingRequest, false);
        })
      );
    }

    return (
      <Panel title={title} bold={true} center={true} key="casting-request-submit-form">
        <Grid container spacing={16} direction="row" justify="center" alignItems="center">
          { items }
        </Grid>
      </Panel>
    )
  }
}

export default (withStyles(styles)(CastingRequestTalentsForm));
