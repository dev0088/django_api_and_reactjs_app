import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Alert } from 'reactstrap';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Panel from 'components/general/panel';
import { generateLinkWithPosition } from 'utils/appUtils'
import styles from 'styles';

class VocalistIntroMainForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: props.position
    }
  }

  getInfoFromProps(props) {
    this.setState({
      position: props.position
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.getInfoFromProps(nextProps)
    })
  }

  renderIntroductionButton(prefixTitle, suffixTitle, link) {
    const { classes } = this.props
    let items = []
    items.push(<Grid item lg={4} md={4} sm={3} xs={1} />)
    items.push(
      <Grid item lg={4} md={4} sm={6} xs={10}
            className={classes.talentProfileGuideButtonItem}
      >
        <Link to={link}>
          <Button
            variant="contained"
            color="primary"
            className={classes.talentIntroductionButton}
            fullWidth={true}
          >
            <Typography className={classes.talentIntroductionButtonTitle}>
              {prefixTitle}
              <Typography className={classes.talentIntroductionButtonSuffixTitle}>
                {suffixTitle}
              </Typography>
            </Typography>
          </Button>
        </Link>
      </Grid>
    )
    items.push(<Grid item lg={4} md={4} sm={3} xs={1} />)

    return items
  }

  renderContents() {
    const { classes } = this.props;
    const { position } = this.state;

    return (
      <Panel>
        <Grid container spacing={16} justify="center" alignItems="center">
          {
            this.renderIntroductionButton('I am a ', 'Vocalist',
              generateLinkWithPosition(position, '/talent/video-audition/vocalist-general-intro')
            )
          }
          {
            this.renderIntroductionButton('I am a ', 'Vocalist Who Moves',
              generateLinkWithPosition(position, '/talent/video-audition/vocalist-moves-intro')
            )
          }
          {
            this.renderIntroductionButton('I am a ', 'Vocalist Who Dances',
              generateLinkWithPosition(position, '/talent/video-audition/vocalist-dances-intro')
            )
          }
          {
            this.renderIntroductionButton('I am a ', 'Vocalist Who Acts',
              generateLinkWithPosition(position, '/talent/video-audition/vocalist-acts-intro')
            )
          }
          {
            this.renderIntroductionButton('I am a ', 'Dancer Who Sings',
              generateLinkWithPosition(position, '/talent/video-audition/vocalist-dancer-sings-intro')
            )
          }
          {
            this.renderIntroductionButton('I am an ', 'Actor Who Sings',
              generateLinkWithPosition(position, '/talent/video-audition/vocalist-actor-sings-intro')
            )
          }
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

export default withStyles(styles)(VocalistIntroMainForm);
