import React, {Component} from 'react';
import { Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Panel from 'components/general/panel';
import { styles } from 'styles';


class IntroductionForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  getInfoFromProps(props) {
    const {talentInfo} = props

  }
  componentWillMount() {

  }

  renderContents() {
    const { classes, contentTitle } = this.props
    let landscapeOrientationLink = {
      pathname: '/talent/video-audition/landscape-orientation',
      state: {
        position: null,
        previousFormTitle: this.props.formTitle
      }
    };

    return (
      <Panel title={contentTitle}>
        <Grid container spacing={16}  justify="center" alignItems="center">
          <Grid item xl={1} lg={1} md={1} xs={1} />
          <Grid item xl={10} lg={10} md={10} xs={10}>
            <Typography className={classes.descriptionText}>
              {`The Video Greeting and Introduction is a 90- to 120-second presentation on camera
                in which you tell cruise line casting directors and hiring managers the following
                (at a minimum, be certain to include all of these topics):`}
              <ul className={classes.descriptionUl}>
                <li>
                  {"Your name, age and nationality"}
                </li>
                <li>
                  {`Your position (vocalist, dancer who sings, technician, musician, cruise staff,
                      youth staff, etc.)`}
                </li>
                <li>
                  {`Some general background information about yourself, your motivation,
                    your professional experience and your training`}
                </li>
                <li>
                  {`The reasons why you want to work at sea on a cruise ship`}
                </li>
              </ul>
            </Typography>
            <br/>
            <Typography className={classes.descriptionText}>
              {`Personality is a big part of working on a cruise ship, so let your personality
                shine through in the video.`}
            </Typography>
            <br/>
            <Typography className={classes.descriptionText}>
              {`Dress sharp and look your best, including make-up for the ladies.
                No sunglasses, hats or anything else that “hides” you in any way.`}
            </Typography>
            <br/>
            <Typography className={classes.descriptionText}>
              {`Your video should be shot from the waist up so that casting directors and
                hiring managers can see your face clearly.  Speak directly to the camera.`}
            </Typography>
            <br/>
            <Typography className={classes.descriptionText}>
              {`Your video should be in English only.  However, if you are fluent or conversant
                in another language, you should create a separate Video Greeting and Introduction
                for each additional language.  Speaking two or more languages can give you a
                significant competitive advantage in the auditioning and hiring process.`}
            </Typography>
            <br/>
            <Typography className={classes.descriptionText}>
              {`Your video should be between 1.5- and 2-minutes in length.  No shorter; no longer.`}
            </Typography>
            <br/>
            <Typography className={classes.descriptionText}>
              {`In general, your Video Greeting and Introduction should be an accurate representation
                of how you will interact with cruise guests on a daily basis.`}
            </Typography>
            <br/>
            <Typography className={classes.descriptionText}>
              {`Be sure to trim the beginning and ending of your video so that there is no
                “dead space” before or after you speak.  If you’re using your smartphone camera,
                 always remember to shoot in `}
              <Typography className={classes.boldUnderlineText}>
                {`Landscape Orientation.`}
              </Typography>
            </Typography>
            <Typography color="primary" className={classes.descriptionText}>
              <Link to={landscapeOrientationLink}>
                <Typography color="primary" className={classes.boldUnderlineText}>
                  {`What is Landscape Orientation?`}
                </Typography>
              </Link>
            </Typography>
          </Grid>
          <Grid item xl={1} lg={1} md={1} xs={1} />
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

  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(IntroductionForm));
