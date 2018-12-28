import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import styles from 'styles';

class ColumnButton extends Component {

  onClickButton = (event) => {
    const { onClickButton } = this.props;
    if(onClickButton) {
      onClickButton(event)
    }
  };

  render() {
    const {
      link, itemClass, buttonClass,
      title, titleClass, subTitle, subTitleClass,
      color, fullWidth, size, xl, lg, md, sm, xs
    } = this.props;

    let sizeProps = {};
    if (xl) sizeProps = {...sizeProps, xl};
    if (lg) sizeProps = {...sizeProps, lg};
    if (md) sizeProps = {...sizeProps, md};
    if (sm) sizeProps = {...sizeProps, sm};
    if (size) sizeProps = {...sizeProps, xs: size};
    else if (xs) sizeProps = {...sizeProps, xs};

    return (
      <Grid item {...sizeProps} className={itemClass}>
        <Link to={link ? link : "#"} onClick={event => this.onClickButton(event)}>
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
