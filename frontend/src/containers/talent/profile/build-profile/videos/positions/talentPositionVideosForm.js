import React, {Component} from 'react';
import { Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Panel from 'components/general/panel';
import Spacer from "components/general/spacer";
import ColumnButton from 'components/shiptalent/buttons/columnButton';
import * as talentActions from 'actions/talentActions';
import { findRelatedSkillByPositionName } from 'utils/appUtils';
import { styles } from 'styles';


class TalentPositionVideosForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      position: {},
      related_skill: {},
      checkedOptOut: false
    }
  }

  getInfoFromProps(props) {
    const { allSkills, position } = props
    let related_skill = {}
    if (position && allSkills) {
      related_skill = findRelatedSkillByPositionName(allSkills, position.name)
    }
    return {
      position,
      related_skill
    }
  }

  componentWillMount() {
    this.props.talentActions.getAllSkills()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.getInfoFromProps(nextProps)
    })
  }

  handleChangeOptOut = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleClickLink = event => {
    const { checkedOptOut } = this.state
    if (checkedOptOut) {
      event.preventDefault()
    }
  }

  renderSubPositionButtons() {
    const { classes } = this.props
    const { position, related_skill, checkedOptOut } = this.state
    let items = []

    if (related_skill && related_skill.sub_skills && related_skill.sub_skills.length > 0) {
      const sub_skills = related_skill.sub_skills
      for(let i = 0; i < sub_skills.length; i +=2) {
        let title = `My ${sub_skills[i].name} Videos`
        let subTitle = 'in progress'
        let link = {
          pathname: '/video-sub-skill',
          state: {
            position: position,
            subSkill: sub_skills[i]
          }
        }

        items.push(<Grid item lg={3} md={2} sm={1} xs={0} />)
        items.push(
          <Grid item lg={3} md={4} sm={5} xs={12}
                className={classes.talentProfileGuideButtonItem}>
            <Link to={link} onClick={this.handleClickLink}>
              <Button
                variant="contained" color={'primary'}
                fullWidth={true} disabled={checkedOptOut}
                className={classes.talentProfileGuideButton}
              >
                <Typography className={classes.talentProfileGuideButtonTitle}>{title}</Typography>
                {subTitle && (<Typography className={classes.talentProfileGuideButtonSubTitle}>{subTitle}</Typography>)}
              </Button>
            </Link>
          </Grid>
        )

        if (sub_skills[i + 1]) {
          title = `My ${sub_skills[i + 1].name} Videos`
          subTitle = 'in progress'
          link = {
            pathname: '/video-sub-skill',
            state: {
              position: position,
              subSkill: sub_skills[i + 1]
            }
          }

          items.push(
            <Grid item lg={3} md={4} sm={5} xs={12}
                  className={classes.talentProfileGuideButtonItem}>
              <Link to={link} onClick={this.handleClickLink}>
                <Button
                  variant="contained" color={'primary'}
                  fullWidth={true} disabled={checkedOptOut}
                  className={classes.talentProfileGuideButton}
                >
                  <Typography className={classes.talentProfileGuideButtonTitle}>{title}</Typography>
                  {subTitle && (
                    <Typography className={classes.talentProfileGuideButtonSubTitle}>{subTitle}</Typography>
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
    const { classes, contentTitle } = this.props
    const { position, checkedOptOut} = this.state

    return (
      <Panel title={contentTitle}>
        <Grid container spacing={24} direction="column" justify="center" alignItems="center">
          <ColumnButton
            link = {'/talent/video/position/introduction'}
            color="primary"
            itemClass = {classes.talentProfileGuideButtonItem}
            buttonClass = {classes.talentProfileGuideButton}
            title = {"INSTRUCTIONS"}
            titleClass = {classes.talentProfileGuideButtonTitle}
            size = {12}
            fullWidth = {false}
          />
          <ColumnButton
            link = {'#'}
            color="primary"
            itemClass = {classes.talentProfileGuideButtonItem}
            buttonClass = {classes.talentProfileGuideButton}
            title = {"Sample Videos"}
            titleClass = {classes.talentProfileGuideButtonSubTitle}
            size = {12}
            fullWidth = {false}
          />
        </Grid>

        <Spacer size={40}/>

        <Grid container spacing={16} justify="center" alignItems="center">
          { this.renderSubPositionButtons() }
        </Grid>
        <Spacer size={40}/>
        <Grid container spacing={24} justify="center" alignItems="center">
          <Grid item lg={1} md={1} xs={0}/>
          <Grid item lg={10} md={10} xs={12}>
            <Typography
              gutterBottom
              variant='Subheading'
              className={classes.talentProfileVideoAuditionDescriptionText}
            >
              {`NOTE: You will see your uploaded ${position ? position.name : ''} Audition Videos in your Profile immediately. However, before casing directors can see the uploaded ${position ? position.name : ''} Audition Videos in your Profile, they must be reviewed and approved by ShipTalent.com.`}
              <br/>
              {`(usually within 24 hours)`}
            </Typography>
          </Grid>
          <Grid item lg={1} md={1} xs={0}/>
          <Grid item lg={2} md={1} sm={0} xs={0}/>
          <Grid item lg={8} md={10} sm={12} xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedOptOut}
                  value="checkedOptOut"
                  color="primary"
                  onChange={this.handleChangeOptOut('checkedOptOut')}
                />
              }
              label={`I am not an actor and choose to opt out of this category.
              I'll not be uploading any ${position ? position.name : ''} Audition Videos (you may opt back in at any time by unchecking the box)`}
            />
          </Grid>
          <Grid item lg={2} md={1} sm={0} xs={0}/>
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
  const { allPositionTypes, allSkills } = state;
  return {
    allSkills: allSkills.value,
    allPositionTypes: allPositionTypes.value,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    talentActions: bindActionCreators(talentActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TalentPositionVideosForm));
