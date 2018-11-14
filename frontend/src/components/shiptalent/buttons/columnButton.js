import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import styles from 'styles';

class ColumnButton extends Component {

  onClickButton = () => {
    const { onClickButton } = this.props;
    if(onClickButton) {
      onClickButton()
    }
  };

  render() {
    const {
      link,
      itemClass,
      buttonClass,
      title,
      titleClass,
      subTitle,
      subTitleClass,
      size,
      color,
      fullWidth,
    } = this.props;

    return (
      <Grid item xs={size} className={itemClass}>
        <Link to={link}>
          <Button variant="contained" color={color} fullWidth={fullWidth} className={buttonClass}>
            <Typography className={titleClass}>{title}</Typography>
            {subTitle && (<Typography className={subTitleClass}>{subTitle}</Typography>)}
          </Button>
        </Link>
      </Grid>
    )
  }
}

export default (withStyles(styles)(ColumnButton));
