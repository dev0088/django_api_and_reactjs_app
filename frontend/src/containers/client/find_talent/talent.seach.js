import React, {Component} from 'react'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import {Redirect} from 'react-router';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import ClientForm from 'components/shiptalent/forms/clientForm';
import Constant from 'constants/talent.search';
import * as clientActions from 'actions/clientActions';
import * as talentActions from 'actions/talentActions';
import Panel from "components/general/panel";
import Spacer from "components/general/spacer";
import GenderSelection from './GenderSelection';
import PositionsSelection from './PositionsSelection';
import SkillsSelection from './SkillsSelection';
import defaultValues from 'constants/defaultValues';
import {
  makeRatingSearchConditionTitle,
  makeHeightSearchConditionTitle
} from 'utils/appUtils';
import styles from 'styles';
import '../client.css';


class TalentSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allPositionTypes: props.allPositionTypes,
      allSkills: props.allSkills,
      talent_name: '',
      talent_tid: '',
      talent_id: '',
      talent_name_or_tid: '',
      sexes: [],
      position_ids: [],
      position_sub_type_ids: [],
      skill_ids: [],
      sub_skill_ids: [],
      availability: {},
      ages: [],
      heights: [],
      languages: [],
      ratings: []
    }
  }

  componentWillMount = () => {
    this.props.talentActions.getAllPositionTypes();
    this.props.talentActions.getAllSkills();
  }

  componentWillReceiveProps = (nextProps) => {
    const { allPositionTypes, allSkills } = nextProps;
    this.setState({ allPositionTypes, allSkills });
  };

  handleChangeStartDate = (date) => {
    this.setState({
      startDate: date
    });
  };

  handleChangeEndDate = (date) => {
    this.setState({
      endDate: date
    })
  };

  onSearch = (e) => {
    e.preventDefault();
    console.log('==== onSearch: state: ', this.state);
    this.props.clientActions.talentSearch(this.state);
    this.props.history.push('/client/talent_search_result');
  };

  goClientHomeScreen = () => {
    window.location.href = "/client/home"
  };

  onChangeGender = (genders) => this.setState({sexes: genders});

  onChangeName = (e) => {
    this.state.talent_name = e.target.value;
  };

  onChangeId = (e) => {
    this.state.talent_tid = e.target.value;
  };

  onChangeNameOrId = name => event => this.setState({ [name]: event.target.value });

  onChangeSearCondition = (stateName, value) => {
    let newItems = this.state[stateName];

    if (!newItems) return;

    let index = newItems.indexOf(value);

    if ( index > -1) newItems.splice(index, 1);
    else newItems.push(value);

    this.setState({ [stateName]: newItems });
  };

  renderNeed = () => {
    const { classes } = this.props;
    const { allPositionTypes } = this.state;

    return (
      <Grid container spacing={16} justify="flex-start" alignItems="center">
        <Grid item lg={12} md={12} sm={12} xs={12} >
          <Typography className={classes.clientFormSubTitle}>
            {`I need a...`}
          </Typography>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12} >
          <GenderSelection onChange={(genders) => this.onChangeGender(genders)} />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12} >
          <PositionsSelection
            loading={!allPositionTypes.isFetched}
            positions={allPositionTypes && allPositionTypes.value}
            onChangePosition={(position) => this.onChangeSearCondition('position_ids', position)}
            onChangeSubPosition={(subPosition) => this.onChangeSearCondition('sub_position_ids', subPosition)}
          />
        </Grid>
      </Grid>
    );
  };

  renderWhoAlso = () => {
    const { classes } = this.props;
    const { allSkills } = this.state;

    return (
      <Grid container spacing={16} justify="flex-start" alignItems="center">
        <Grid item lg={12} md={12} sm={12} xs={12} >
          <Typography className={classes.clientFormSubTitle}>
            {`Who also...`}
          </Typography>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12} >
          <SkillsSelection
            loading={!allSkills.isFetched}
            skills={allSkills && allSkills.value}
            onChangeSkill={(skill) => this.onChangeSearCondition('skill_ids', skill)}
            onChangeSubSkill={(subSkill) => this.onChangeSearCondition('sub_skill_ids', subSkill)}
          />
        </Grid>
      </Grid>
    );
  };

  renderAvailable = () => {
    const { classes } = this.props;

    return (
      <Grid container spacing={16} justify="flex-start" alignItems="center">
        <Grid item lg={12} md={12} sm={12} xs={12} >
          <Typography className={classes.clientFormSubTitle}>
            {`And is available...`}
          </Typography>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12} >
          <Grid container spacing={16} direction="row" justify="flex-start" alignItems="flex-start">
            <Grid item >
              <Grid container spacing={16} direction="row" justify="flex-start" alignItems="flex-start">
                <Grid item >
                  <Typography className={[classes.descriptionText, classes.inlineText]}>
                    Between:
                  </Typography>
                </Grid>
                <Grid item >
                  <DatePicker
                    className="mr-4" selected={this.state.startDate}
                    onChange={this.handleChangeStartDate}
                    dropdownMode="scroll"
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item >
              <Grid container spacing={16} direction="row" justify="flex-start" alignItems="flex-start">
                <Grid item >
                  <Typography className={[classes.descriptionText, classes.inlineText]}>
                    And:
                  </Typography>
                </Grid>
                <Grid item >
                  <DatePicker
                    selected={this.state.endDate}
                    onChange={this.handleChangeEndDate}
                    dropdownMode="scroll"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  renderAgeRange = () => {
    const { classes } = this.props;
    const { ages } = this.state;

    return (
      <Grid container spacing={16} justify="flex-start" alignItems="center">
        <Grid item lg={12} md={12} sm={12} xs={12} >
          <Typography className={classes.clientFormSubTitle}>
            {`Age Range (select all that apply)`}
          </Typography>

          <FormGroup row>
            { defaultValues.AGES.map((age, index) => {
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={ages && (ages.indexOf(index) > -1)}
                      onChange={(event) => this.onChangeSearCondition('ages', index)}
                      value={index}
                      color="primary"
                    />
                  }
                  label={age}
                />
              );
            })
            }
          </FormGroup>
        </Grid>
      </Grid>
    );
  };

  renderHeight = () => {
    const { classes } = this.props;
    const { heights } = this.state;

    return (
      <Grid container spacing={16} justify="flex-start" alignItems="center">
        <Grid item lg={12} md={12} sm={12} xs={12} >
          <Typography className={classes.clientFormSubTitle}>
            {`Height (select all that apply)`}
          </Typography>

          <FormGroup row>
            { defaultValues.HEIGHT_RANGES.map((heightRange, index) => {
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={heights && (heights.indexOf(index) > -1)}
                      onChange={(event) => this.onChangeSearCondition('heights', index)}
                      value={index}
                      color="primary"
                    />
                  }
                  label={makeHeightSearchConditionTitle(heightRange)}
                />
              );
            })
            }
          </FormGroup>
        </Grid>
      </Grid>
    );
  };

  renderLanguage = () => {
    const { classes } = this.props;
    const { languages } = this.state;

    return (
      <Grid container spacing={16} justify="flex-start" alignItems="center">
        <Grid item lg={12} md={12} sm={12} xs={12} >
          <Typography className={classes.clientFormSubTitle}>
            {`Languages Spoken (select all that apply)`}
          </Typography>

          <FormGroup row>
            { defaultValues.LANGUAGES.map((language, index) => {
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={languages && (languages.indexOf(index) > -1)}
                      onChange={(event) => this.onChangeSearCondition('languages', index)}
                      value={index}
                      color="primary"
                    />
                  }
                  label={language}
                />
              );
            })
            }
          </FormGroup>
        </Grid>
      </Grid>
    );
  };

  renderRatingRange = () => {
    const { classes } = this.props;
    const { ratings } = this.state;

    return (
      <Grid container spacing={16} justify="flex-start" alignItems="center">
        <Grid item lg={12} md={12} sm={12} xs={12} >
          <Typography className={classes.clientFormSubTitle}>
            {`Average Cruise Line Rating (select all that apply)`}
          </Typography>

          <FormGroup row>
            { defaultValues.RATING_RANGES.map((ratingRange, index) => {
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={ratings && (ratings.indexOf(index) > -1)}
                      onChange={(event) => this.onChangeSearCondition('ratings', index)}
                      value={index}
                      color="primary"
                    />
                  }
                  label={makeRatingSearchConditionTitle(ratingRange)}
                />
              );
            })
            }
          </FormGroup>
        </Grid>
      </Grid>
    );
  };

  renderTextCondition = (label, placeHolderText, stateName) => {
    const { classes } = this.props;
    return (
      <Grid container spacing={16} direction="row" justify="flex-start" alignItems="center">
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <Typography className={classes.descriptionText}>
            {label}
          </Typography>
        </Grid>
        <Grid item lg={8} md={8} sm={12} xs={12}>
          <TextField
            id={stateName}
            label=""
            value={this.state[stateName]}
            type="text"
            onChange={this.onChangeNameOrId(stateName)}
            margin="normal"
            variant="outlined"
            placeholder={placeHolderText}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>
    );
  };

  renderSearchByNameAndID = () => {
    const { classes } = this.props;

    return (
      <Grid container spacing={16} justify="flex-start" alignItems="center">
        <Grid item lg={12} md={12} sm={12} xs={12} >
          <Typography className={classes.clientFormSubTitle}>
            {`Already know who you're looking for?`}
          </Typography>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12} >
          <Grid container spacing={16} direction="row" justify="flex-start" alignItems="center">
            <Grid item lg={5} md={6} sm={12} xs={12}>
              { this.renderTextCondition('SEARCH BY NAME: ', "Enter Name...", 'talent_name') }
              { this.renderTextCondition('SEARCH BY TALENT ID: ', "Enter Talent ID...", 'talent_id') }
            </Grid>
            <Grid item lg={1} md={1} sm={12} xs={12}/>
            <Grid item lg={6} md={5} sm={12} xs={12}>
              <Button variant="contained" color="secondary" className={classes.button}>
                <Typography className={classes.clientTalentViewVideoButtonText} onClick={this.onSearch}>
                  Search
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  renderContent = () => {
    const { classes } = this.props;
    const { allPositionTypes, allSkills, ranges } = this.state;

    return (
      <Panel>
        { this.renderNeed() }
        <Spacer size={30} />
        { this.renderWhoAlso() }
        <Spacer size={30} />
        { this.renderAvailable() }
        <Spacer size={10} />
        { this.renderAgeRange() }
        <Spacer size={10} />
        { this.renderHeight() }
        <Spacer size={10} />
        { this.renderLanguage() }
        <Spacer size={10} />
        { this.renderRatingRange() }
        <Spacer size={20} />
        { this.renderSearchByNameAndID() }
      </Panel>
    )
  };

  render() {
    return (
      <ClientForm
        formTitle="Talent Search"
        backLink="/client/home"
        backButtonTitle="Back to My Home Page"
      >
        {this.renderContent()}
      </ClientForm>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    clientActions: bindActionCreators(clientActions, dispatch),
    talentActions: bindActionCreators(talentActions, dispatch)
  }
};

const mapStateToProps = state => {
  const { talentSearchResult, allPositionTypes, allSkills } = state;
  return {
    talentSearchResult: talentSearchResult && talentSearchResult.value ? talentSearchResult.value : null,
    allPositionTypes,
    allSkills
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TalentSearch))