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
import Spacer from "components/general/spacer";
import * as talentActions from 'actions/talentActions';
import { getPathByPositionName } from 'utils/appUtils';
import defaultValues from 'constants/defaultValues';
import { styles } from 'styles';


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
    const { classes, allPositionTypes } = this.props
    let items = []

    if (allPositionTypes && allPositionTypes.length > 0) {

      for(let i = 0; i < allPositionTypes.length; i ++) {
        let position = allPositionTypes[i]

        if (!position.video_audition_button_title) {
          continue;
        }

        let title = position.video_audition_button_title
        let subTitle = 'in progress'
        let link = {
          pathname: '/video-positions', // getPathByPositionName(position.name),
          state: {
            position: position
          }
        }

        if (position.name === defaultValues.DEFAULT_PRACTICE_POSITION_TYPE) {
          continue
        }

        items.push(
          <Grid key={`position${i}-2`}
                item lg={6} md={6} sm={6} xs={12}
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
      }
    }

    return (
      <Grid container spacing={16} >
        { items }
      </Grid>
    )

  }

  renderContents() {
    const { classes, contentTitle, allPositionTypes } = this.props

    return (
      <Panel title={contentTitle}>
        <Grid container spacing={24} direction="column" justify="center" alignItems="center">
          <ColumnButton
            link = {{
              pathname: "/video-greetings"
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
        <Grid container spacing={16} direction="row" justify="center" alignItems="center">
          <Grid item lg={3} md={2} sm={1} xs={2} />
          <Grid item lg={6} md={8} sm={10} xs={8} >
            { this.renderPositionButtons(allPositionTypes) }
          </Grid>
          <Grid item lg={3} md={2} sm={1} xs={2} />
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
