import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import ImageLoader from 'react-loading-image';
import { getAvatarFromTalentInfo } from 'utils/appUtils';
import { adminStyles } from 'styles';


class TalentImage extends Component {

  render() {
    const { talent, classes } = this.props;
    const talent_picture = getAvatarFromTalentInfo(talent);

    if (talent) {
      return (
        <Link
          to={{
            pathname: '/admin/edit-profiles/edit-profile',
            state: { profileId: talent.id }
          }}
          className={classes.pictureContainer}
        >
          <ImageLoader
            src={talent_picture}
            className={classes.adminTalentMetricTalentPciture}
            loading={() => <div className={classNames(classes.adminTalentMetricTalentPciture)}>Loading...</div>}
            error={
              () => <img src={require('images/missing.png')} className={classes.adminTalentMetricTalentPciture} />
            }
          />
        </Link>
      )
    }

    return <div/>
  }
}

export default withStyles(adminStyles)(TalentImage);