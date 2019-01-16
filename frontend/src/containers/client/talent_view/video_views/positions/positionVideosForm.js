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
import Spacer from "components/general/spacer";
import * as talentActions from 'actions/talentActions';
import { findRelatedSkillByPositionName, getSubSkillVideoCount } from 'utils/appUtils';
import { styles } from 'styles';


class positionVideosForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      position: {},
      related_skill: {},
    };
  }

  getInfoFromProps(props) {
    const { allSkills, position, talent } = props;
    let related_skill = {};

    if (position && allSkills) {
      related_skill = findRelatedSkillByPositionName(allSkills, position.name)
    }

    return {
      talent,
      position,
      related_skill
    }
  }

  componentWillMount() {
    this.props.talentActions.getAllSkills();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.getInfoFromProps(nextProps)
    });
  }

  renderAdditionButtons = () => {
    return (<div/>)
  };

  renderVideoContentType = (contentType, columns = 2) => {

    const { classes } = this.props;
    const { position, related_skill, talent } = this.state;
    let items = [];
    let columnSize = Math.round(12 / columns);

    if (related_skill && related_skill.sub_skills && related_skill.sub_skills.length > 0) {
      const sub_skills = related_skill.sub_skills;

      for(let i = 0; i < sub_skills.length; i ++) {
        let subSkill = sub_skills[i];

        if (subSkill.video_audition_button_title === '' ||
            subSkill.is_video_interview_button ||
            subSkill.video_audition_view_content_type !== contentType) {
          continue;
        }

        let title = subSkill.name;
        let subTitle = `(${getSubSkillVideoCount(talent.talent_video_sub_skills, subSkill.id)})`;
        let link = {
          pathname: '/client/talent_view/sub_skill_videos_view',
          state: {
            talent: talent,
            position: position,
            subSkill: subSkill
          }
        };

        items.push(
          <Grid
            item lg={columnSize} md={columnSize} sm={columnSize} xs={12} key={`subPosition${i}`}
            className={classes.clientTalentViewVideoButtonGridItem}
          >
            <Link to={link}>
              <Button
                variant="contained" color={'primary'}
                fullWidth
                className={classes.clientTalentViewVideoButton}
              >
                <Typography className={classes.clientTalentViewVideoButtonText}>{title}</Typography>
                { subTitle && (
                  <Typography className={classes.clientTalentViewVideoButtonStatusText}>
                    {subTitle}
                  </Typography>
                )}
              </Button>
            </Link>
          </Grid>
        );
      }
    }

    if (items.length === 0) return <div/>;

    return (
      <Grid container spacing={16} >
        <Grid item lg={12} md={12} sm={12} xs={12} className={classes.centerText}>
          <Typography className={classes.clientFormSubTitle}>
            {contentType}
          </Typography>
        </Grid>
        { items }
      </Grid>
    )
  };

  render() {
    const { contentTitle } = this.props;

    return (
      <Panel title={contentTitle}>
        <Grid container spacing={16} direction="row" justify="center" alignItems="center">
          <Grid item lg={3} md={2} sm={1} xs={2} />
          <Grid item lg={6} md={8} sm={10} xs={8} >
            { this.renderVideoContentType('Site Content', 2) }
          </Grid>
          <Grid item lg={3} md={2} sm={1} xs={2} />
        </Grid>

        <Spacer size={40} />

        <Grid container spacing={16} direction="row" justify="center" alignItems="center">
          <Grid item lg={2} md={1} sm={1} xs={2} />
          <Grid item lg={8} md={10} sm={10} xs={8} >
            { this.renderVideoContentType('Talent Content', 3) }
          </Grid>
          <Grid item lg={2} md={1} sm={1} xs={2} />
        </Grid>
      </Panel>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(positionVideosForm));
