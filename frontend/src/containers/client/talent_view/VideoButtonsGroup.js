import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import ColumnButton from 'components/shiptalent/buttons/columnButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Spacer from 'components/general/spacer';
import {
  getPracticVideoNumbers,
  getLiveVideoNumbers,
  getSubSkillVideoNumbersByPositionType
} from 'utils/appUtils';
import styles from 'styles';


class VideoButtonsGroup extends Component {

  renderVideoButton(link, title, subTitle) {
    const { classes }=this.props;

    return (
      <ColumnButton
        link={link}
        itemClass={classes.clientTalentViewVideoButtonGridItem}
        buttonClass={classes.clientTalentViewVideoButton}
        title={title} titleClass={classes.clientTalentViewVideoButtonText}
        subTitle={subTitle} subTitleClass={classes.clientTalentViewVideoButtonStatusText}
        lg={6} md={6} xs={6} size={6} color="primary" fullWidth={true}
      />
    );
  }

  renderPositionButtons() {
    const { classes, allPositionTypes, allSkills, talent, loading } = this.props;
    let items = [];

    if (loading) return <CircularProgress className={classes.progress} />;

    if (talent && allPositionTypes && allPositionTypes.length > 0) {
      const { talent_video_sub_skills } = talent;
      for(let i = 0; i < allPositionTypes.length; i ++) {
        let position = allPositionTypes[i];

        if (!position.video_audition_button_title) continue;

        let title = `${position.name} Audition Videos`;
        let subTitle = getSubSkillVideoNumbersByPositionType(talent_video_sub_skills, allSkills, position)
        let link = {
          pathname: '/client/talent_view/position_videos_view',
          state: {
            talent: talent,
            position: position
          }
        };

        items.push(
          <Grid
            key={`position${i}-1`}
            item lg={6} md={6} sm={6} xs={12}
            className={classes.talentProfileGuideButtonItem}
          >
            <Link to={link}>
              <Button
                variant="contained" color={'primary'}
                fullWidth={true}
                className={classes.clientTalentViewVideoButton}
              >
                <Typography className={classes.clientTalentViewVideoButtonText}>
                  {title}
                </Typography>
                {subTitle && (
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

    return (
      <Grid container spacing={16} >
        { items }
      </Grid>
    );
  }

  render() {
    const { classes, talent } = this.props;
    const { talent_video_greetings, talent_videos } = talent;

    return (
      <div>
        <Grid container spacing={24} justify="center" alignItems="center">
          <Grid item lg={1} md={1} sm={1} xs={12}/>
          <Grid item lg={10} md={10} sm={10} xs={12}>
            <Grid container spacing={16} >
              <ColumnButton
                link = {{pathname: "/client/talent_view/video_greetings", state: {talent}}}
                itemClass = {classes.clientTalentViewVideoButtonGridItem}
                buttonClass = {classes.clientTalentViewVideoButton}
                title = {"My Video Greetings"}
                titleClass = {classes.clientTalentViewVideoButtonText}
                subTitle = {talent_video_greetings ? talent_video_greetings.length : 0}
                subTitleClass = {classes.clientTalentViewVideoButtonStatusText}
                lg={6} md={6} sm={6} xs={12} size={12} color="primary" fullWidth={true}
              />
              <ColumnButton
                link = {{
                  pathname: "/client/talent_view/talent_videos"
                }}
                itemClass = {classes.clientTalentViewVideoButtonGridItem}
                buttonClass = {classes.clientTalentViewVideoButton}
                title = {"Video Interview"}
                titleClass = {classes.clientTalentViewVideoButtonText}
                subTitle = {talent_videos ? talent_videos.length : 0}
                subTitleClass = {classes.clientTalentViewVideoButtonStatusText}
                lg={6} md={6} sm={6} xs={12} size={12} color="primary" fullWidth={true}
              />
            </Grid>
            <Spacer size={30}/>
            { this.renderPositionButtons() }
          </Grid>
          <Grid item lg={1} md={1} sm={1} xs={12}/>
        </Grid>

      </div>
    )
  }
}

export default withStyles(styles)(VideoButtonsGroup);
