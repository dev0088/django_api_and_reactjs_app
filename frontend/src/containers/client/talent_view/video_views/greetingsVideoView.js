import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Panel from 'components/general/panel';
import ClientForm from 'components/shiptalent/forms/clientForm';
import Spacer from 'components/general/spacer';
import VideoPlayer from 'components/shiptalent/videos/videoPlayer';
import styles from 'styles';


class GreetingsVideoView extends Component {

  state = {
    talent: null,
  };

  getInfoFromProps = (props) => {
    if(props.location && props.location.state)
      return {
        talent: props.location.state.talent,
      };
    else return {};
  };

  componentWillMount() {
    this.setState({ ...this.getInfoFromProps(this.props)}, () => {

    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.getInfoFromProps(nextProps)});
  }

  renderContent() {
    const { classes } = this.props;
    const { talent } = this.state;

    if (!talent) return <div />;

    const { talent_video_greetings } = talent;

    let item = [];
    for (let i = 0; i < 4; i ++ ) {
      let video = talent_video_greetings[i];
      item.push(
        <Grid item xl={6} lg={6} md={6} xs={12} key={`video-player-grid-item-${i}`}>
          <VideoPlayer
            key={`video-player-${i}`}
            title={video ? video.language : "Other Language (if applicable)"}
            url={video ? video.url : '' }
          />
        </Grid>
      );
    }

    return (
      <Panel>
        <Spacer size={30} />
        <Grid container spacing={32} justify="center" alignItems="flex-start">
          { item }
        </Grid>
        <Spacer size={30} />
      </Panel>
    )
  }

  render() {
    const { talent } = this.state;
    return (
      <ClientForm
        formTitle={"Video Greetings"}
        nextLink={{pathname: '/client/talent_view', state: {talentId: talent && talent.id}}}
        nextButtonTitle="Back to Profile"
        talent={talent}
      >
        {talent && this.renderContent()}
      </ClientForm>
    );
  }
}

export default withStyles(styles)(GreetingsVideoView);
