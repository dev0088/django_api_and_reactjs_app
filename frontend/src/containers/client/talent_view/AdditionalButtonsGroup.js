import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import ColumnButton from 'components/shiptalent/buttons/columnButton';
import Grid from '@material-ui/core/Grid';
import ClientAPI from 'apis/clientAPIs';
import styles from 'styles';


class AdditionalButtonsGroup extends Component {

  onClickButton = (event) => {
    const { talentId } = this.props;
    let data = {
      talent: talentId
    };
    event.preventDefault();
    ClientAPI.addCallBacks(data, this.props.onAddCallBackConfirm)
  };

  render() {
    const { talentId, classes } = this.props;

    return(
      <Grid container spacing={24} direction="column" justify="center" alignItems="center">
        <ColumnButton
          link={{pathname: '/client/callback/confirm', state: {talentId}}}
          itemClass={classes.clientTalentViewMoreInfoButtonGridItem}
          buttonClass={classes.clientTalentViewMoreInfoButton}
          title={'Add to My Call Backs'} titleClass={classes.clientTalentViewVideoButtonText}
          subTitle={'(save for later)'} subTitleClass={classes.clientTalentViewVideoButtonStatusText}
          xs={6} color={'primary'} fullWidth={true}
          onClickButton={this.onClickButton}
        />
        <ColumnButton
          link={{pathname: '#', state: {talentId}}}
          itemClass={classes.clientTalentViewMoreInfoButtonGridItem}
          buttonClass={classes.clientTalentViewMoreInfoButton}
          title={'Add to My Casting Request'} titleClass={classes.clientTalentViewVideoButtonText}
          subTitle={null} subTitleClass={classes.clientTalentViewVideoButtonStatusText}
          xs={6} color={'secondary'} fullWidth={true}
        />
      </Grid>
    );
  }

}

export default withStyles(styles)(AdditionalButtonsGroup);