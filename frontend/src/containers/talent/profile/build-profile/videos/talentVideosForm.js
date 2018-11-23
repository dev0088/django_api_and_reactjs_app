import React, {Component} from 'react';
import { Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Panel from 'components/general/panel';
import ColumnButton from 'components/shiptalent/buttons/columnButton';
import * as talentActions from 'actions/talentActions';
import { styles } from 'styles';
import Spacer from "components/general/spacer";


class TalentVideosForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  getInfoFromProps(props) {
    const {talentInfo} = props

  }

  componentWillMount() {
    this.props.talentActions.getAllPositionTypes()
    this.props.talentActions.getCurrentTalentInfo()
  }

  renderPositionButtons() {
    const { classes, allPositionTypes, fromWizard } = this.props
    let items = []
    if (allPositionTypes && allPositionTypes.length > 0) {
      for(let i = 0; i < allPositionTypes.length; i +=2) {
        let position = allPositionTypes[i]
        let title = `My ${position.name} Audition Videos`
        let subTitle = 'in progress'
        let link = {
          pathname: '/video-positions',
          state: {
            position: position,
            fromWizard: fromWizard
          }
        }

        items.push(<Grid item lg={3} md={2} sm={1} xs={0} />)
        items.push(
          <Grid
            item lg={3} md={4} sm={5} xs={12}
            className={classes.talentProfileGuideButtonItem}
          >
            <Link to={link}>
              <Button
                variant="contained" color={'primary'}
                fullWidth={true}
                className={classes.talentProfileGuideButton}
              >
                <Typography className={classes.talentProfileGuideButtonTitle}>
                  {title}
                </Typography>
                {subTitle && (
                  <Typography className={classes.talentProfileGuideButtonSubTitle}>
                    {subTitle}
                  </Typography>
                )}
              </Button>
            </Link>
          </Grid>
        )

        if (allPositionTypes[i + 1]) {
          position = allPositionTypes[i + 1]
          title = `My ${position.name} Audition Videos`
          subTitle = 'in progress'
          link = {
            pathname: '/video-positions',
            state: {
              position: position,
              fromWizard: fromWizard
            }
          }

          items.push(
            <Grid
              item lg={3} md={4} sm={5} xs={12}
              className={classes.talentProfileGuideButtonItem}
            >
              <Link to={link}>
                <Button
                  variant="contained" color={'primary'}
                  fullWidth={true}
                  className={classes.talentProfileGuideButton}
                >
                  <Typography className={classes.talentProfileGuideButtonTitle}>
                    {title}
                  </Typography>
                  {subTitle && (
                    <Typography className={classes.talentProfileGuideButtonSubTitle}>
                      {subTitle}
                    </Typography>
                  )}
                </Button>
              </Link>
            </Grid>
          )
        } else {
          items.push(<Grid item lg={3} md={4} sm={5} xs={12}/>)
        }
        items.push(<Grid item lg={3} md={2} sm={1} xs={0} />)
      }
      return items
    }

    return (<div/>)

  }

  renderContents() {
    const { classes, contentTitle, allPositionTypes, fromWizard } = this.props

    return (
      <Panel title={contentTitle}>
        <Grid container spacing={24} direction="column" justify="center" alignItems="center">
          <ColumnButton
            link = {{
              pathname: "/video-greetings",
              state: { fromWizard: fromWizard }
            }}
            color="primary"
            itemClass = {classes.talentProfileGuideButtonItem}
            buttonClass = {classes.talentProfileGuideButton}
            title = {"My Video Greetings"}
            titleClass = {classes.talentProfileGuideButtonTitle}
            subTitle = {"completed"}
            subTitleClass = {classes.talentProfileGuideButtonSubTitle}
            size = {12}
            fullWidth = {false}
          />
        </Grid>
        <Spacer size={30}/>
        <Grid container spacing={16} justify="center" alignItems="center">
          { this.renderPositionButtons(allPositionTypes) }
        </Grid>
        <Spacer size={40}/>
        <Grid container spacing={24} justify="center" alignItems="center">
          <Grid item lg={12}/>
            <Typography gutterBottom variant='Subheading'>
              <b>{"Video Interviews (required)"}</b>
              {` are located within the section of your primary discripline
                (vocalist, dancer, musician, techinician, cruise staff or youth staff).`}
            </Typography>
        </Grid>
      </Panel>
    )
  }

  render() {
    return (
      <div>
        {this.state.notification && <Alert color="info">{this.state.notification}</Alert>}
        {this.renderContents()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { allPositionTypes } = state;
  return {
    allPositionTypes: allPositionTypes.value,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    talentActions: bindActionCreators(talentActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TalentVideosForm));
