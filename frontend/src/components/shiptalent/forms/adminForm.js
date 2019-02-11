import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import NavigateButtonGroup from 'components/shiptalent/buttonGroups/navigateButtonGroup';
import AdminTalentTitle from './adminTalentTitle';
import { adminStyles } from 'styles';


class AdminForm extends Component {

  handleClickBackButton = () => {
    const { handleClickBackButton } = this.props;
    if(handleClickBackButton) {
      handleClickBackButton()
    }
  };

  handleClickNextButton = () => {
    const { handleClickNextButton } = this.props;
    if(handleClickNextButton) {
      handleClickNextButton()
    }
  };

  render() {
    const {
      formTitle,
      formSubTitle, formSubTitleClass,
      children,
      backLink, backButtonTitle, handleClickBackButton,
      nextLink, nextButtonTitle, handleClickNextButton,
      talent, showName, showGender, showPosition,
      allPositionTypes, allSkills, loading,
      formClassName, classes
    } = this.props;
    let formStyle = formClassName ? {className: formClassName} : {}

    return (
      <div {...formStyle}>
        <Grid container spacing={16}>
          { talent && 
            <Grid item xs={12} >
              <AdminTalentTitle talent={talent} showName={showName} showGender={showGender} showPosition={showPosition} 
                allPositionTypes={allPositionTypes} allSkills={allSkills} loading={loading}
              />
            </Grid>
          }
          <Grid item xs={12} >
            { formTitle &&
              <Typography
                align="center"
                className={[classes.h4SmallMargin, classes.bold]}
              >
                {formTitle}
              </Typography>
            }
            { formSubTitle &&
              <Typography
                align="center"
                className={
                  formSubTitleClass
                    ? [classes.adminFormSubTitle, formSubTitleClass]
                    : classes.adminFormSubTitle
                }
              >
                {formSubTitle}
              </Typography>
            }
          </Grid>

          <Grid item xs={12} >
            {children}
          </Grid>

          <Grid item xs={12} >
            <NavigateButtonGroup
              backLink={backLink}
              backButtonTitle={backButtonTitle}
              backButtonClass={classes.adminFormBackButton}
              handleClickBackButton={handleClickBackButton}
              nextLink={nextLink}
              nextButtonTitle={nextButtonTitle}
              nextButtonClass={classes.adminFormNextButton}
              handleClickNextButton={handleClickNextButton}
              direction="column"
            />
          </Grid>
        </Grid>

      </div>
    )
  }
}

export default (withStyles(adminStyles)(AdminForm));
