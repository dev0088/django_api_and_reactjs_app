import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Alert } from 'reactstrap';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Panel from 'components/general/panel';
import ImportantRegardingButton from 'components/shiptalent/buttons/importantRegardingButton';
import { generateLinkWithPosition } from 'utils/appUtils'
import styles from 'styles';
import Spacer from "../../../../../components/general/spacer";

class DancerIntroMainForm extends Component {
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

  renderIntroductionButton(prefixTitle, suffixTitle, link, subTitle) {
    const { classes } = this.props
    let items = []

    items.push(<Grid item lg={3} md={3} sm={3} xs={1} />)
    items.push(
      <Grid item lg={6} md={6} sm={6} xs={10}
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
            { subTitle && (
              <Typography className={classes.talentIntroductionButtonTitle}>
                {subTitle}
              </Typography>
            )}
          </Button>
        </Link>
      </Grid>
    )
    items.push(<Grid item lg={3} md={3} sm={3} xs={1} />)

    return items
  }

  renderContents() {
    const { classes } = this.props;
    const { position } = this.state;

    return (
      <Panel>
        <Grid container spacing={16} justify="center" alignItems="center">
          {
            this.renderIntroductionButton('I am a ', 'Dancer',
              generateLinkWithPosition(position, '/talent/video-audition/dancer-intro')
            )
          }
          {
            this.renderIntroductionButton('I am a ', 'Dancer Who Sings',
              generateLinkWithPosition(position, '/talent/video-audition/dancer-sings-intro')
            )
          }
          {
            this.renderIntroductionButton('I am a ', 'Dancer Who Acts',
              generateLinkWithPosition(position, '/talent/video-audition/dancer-acts-intro')
            )
          }
          <Grid item lg={12} md={12} sm={12} xs={12} >
            <Spacer size={20}/>
          </Grid>
          {
            this.renderIntroductionButton('', 'Dance Combination Video Instructions',
              generateLinkWithPosition(position, '/talent/video-audition/dancer-dance-combination-intro'),
              'For Vocalists, Actors & Aerialists'
            )
          }
          {
            this.renderIntroductionButton('', 'Movement Combination Video Instructions',
              generateLinkWithPosition(position, '/talent/video-audition/dancer-movement-combination-intro'),
              'For Vocalists, Actors & Aerialists'
            )
          }
        </Grid>

        <Spacer size={50} />

        <Grid container spacing={16} direction="column" justify="center" alignItems="center">
          <Grid item lg={6} md={6} sm={6} xs={10} className={classes.talentProfileGuideButtonItem} >
            <ImportantRegardingButton formTitle={this.props.formTitle} />
          </Grid>
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

export default withStyles(styles)(DancerIntroMainForm);
