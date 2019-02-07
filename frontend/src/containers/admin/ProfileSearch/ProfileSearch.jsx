import React, {Component} from 'react'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import { CountryDropdown } from 'react-country-region-selector';
import AdminForm from 'components/shiptalent/forms/adminForm';
import Panel from "components/general/panel";
import Spacer from "components/general/spacer";
import GenderSelection from 'containers/client/find_talent/GenderSelection';
import PositionsSelection from 'containers/client/find_talent/PositionsSelection';
import SkillsSelection from 'containers/client/find_talent/SkillsSelection';
import * as clientActions from 'actions/clientActions';
import * as talentActions from 'actions/talentActions';
import defaultValues from 'constants/defaultValues';
import {
  makeRatingSearchConditionTitle,
  makeHeightSearchConditionTitle,
  convertIndexes2Values,
  convertSexTitle2Values
} from 'utils/appUtils';
import { adminStyles } from 'styles';


class ProfileSearch extends Component {
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
      availability: {
        start_date: "",
        end_date: ""
      },
      ages: [],
      heights: [],
      languages: [],
      ratings: [],
      isAvailable: false,
      notAvailable: false,
      isActiveCastingRequest: false,
      isContracted: false,
      isCurrentDeployed: false,
      citizenship: ''
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

  onChangeAvailability = (name, date) => {
    let availability = this.state.availability;
    availability[name] = date;
    this.setState({ availability });
  };

  onChangeAvailabilityStartDate = (date) => this.onChangeAvailability('start_date', date);

  onChangeAvailabilityEndDate = (date) => this.onChangeAvailability('end_date', date);

  addSearchCondition = (conditions, name, value) => {
    let newConditions = conditions;
    newConditions = {
      ...newConditions,
      [name]: value ? value : this.state[name]
    };
    return newConditions;
  };
  onSearch = (e) => {
    e.preventDefault();

    const {
      talent_name, talent_tid, talent_id, talent_name_or_tid,
      sexes, position_ids, position_sub_type_ids, skill_ids, sub_skill_ids,
      availability, ages, heights, languages, ratings,       
      isAvailable, notAvailable, isActiveCastingRequest, isContracted, isCurrentDeployed,
      citizenship
    } = this.state;

    let data = {
      talent_name,
      talent_tid,
      talent_id,
      talent_name_or_tid,
      sexes: convertSexTitle2Values(sexes),
      position_ids,
      position_sub_type_ids,
      skill_ids,
      sub_skill_ids,
      availability: {
        start_date: availability.start_date ? moment(availability.start_date).format(defaultValues.AVAILABILITY_FORMAT) : null,
        end_date: availability.end_date ? moment(availability.end_date).format(defaultValues.AVAILABILITY_FORMAT) : null
      },
      ages,
      heights: convertIndexes2Values(defaultValues.HEIGHT_RANGES, heights),
      languages,
      ratings: convertIndexes2Values(defaultValues.RATING_RANGES, ratings),
      is_available: isAvailable,
      not_available: notAvailable,
      is_active_casting_request: isActiveCastingRequest,
      is_contracted: isContracted,
      is_current_deployed: isCurrentDeployed,
      citizenship
    };

    console.log('==== onSearch: data: ', data);

    this.props.clientActions.setSearchCondition(data);
    this.props.clientActions.talentSearch(data);
    this.props.history.push('/admin/profile-search-results');
  };

  onChangeGender = (genders) => this.setState({sexes: genders});

  onChangeNameOrId = name => event => this.setState({ [name]: event.target.value });

  onChangeCheckbox = name => event => this.setState({ [name]: event.target.checked });

  onChangeSearCondition = (stateName, value) => {
    let newItems = this.state[stateName];

    if (!newItems) return;

    let index = newItems.indexOf(value);

    if ( index > -1) newItems.splice(index, 1);
    else newItems.push(value);

    this.setState({ [stateName]: newItems });
  };

  handleCitizenShipChange = (value) => {
    this.setState({ citizenship: value });
  };

  renderPositions = () => {
    const { classes } = this.props;
    const { allPositionTypes } = this.state;

    return (
      <Grid container spacing={16} justify="flex-start" alignItems="center">
        <Grid item lg={12} md={12} sm={12} xs={12} >
          <Typography className={classes.adminFormSubTitle}>
            {`Gender`}
          </Typography>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12} >
          <GenderSelection onChange={(genders) => this.onChangeGender(genders)} />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12} >
          <Typography className={classes.adminFormSubTitle}>
            {`Position Types`}
          </Typography>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12} >
          <PositionsSelection
            loading={!allPositionTypes.isFetched}
            positions={allPositionTypes && allPositionTypes.value}
            titleItem={'agent_title'}
            onChangePosition={(position) => this.onChangeSearCondition('position_ids', position)}
            onChangeSubPosition={(subPosition) => this.onChangeSearCondition('position_sub_type_ids', subPosition)}
          />
        </Grid>
      </Grid>
    );
  };

  renderSkills = () => {
    const { classes } = this.props;
    const { allSkills } = this.state;

    return (
      <Grid container spacing={16} justify="flex-start" alignItems="center">
        <Grid item lg={12} md={12} sm={12} xs={12} >
          <Typography className={classes.adminFormSubTitle}>
            {`Skills`}
          </Typography>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12} >
          <SkillsSelection
            loading={!allSkills.isFetched}
            skills={allSkills && allSkills.value}
            titleItem={'agent_title'}
            onChangeSkill={(skill) => this.onChangeSearCondition('skill_ids', skill)}
            onChangeSubSkill={(subSkill) => this.onChangeSearCondition('sub_skill_ids', subSkill)}
          />
        </Grid>
      </Grid>
    );
  };

  renderAvailable = () => {
    const { classes } = this.props;
    const { availability } = this.state;

    return (
      <Grid container spacing={16} justify="flex-start" alignItems="center">
        <Grid item lg={12} md={12} sm={12} xs={12} >
          <Typography className={classes.adminFormSubTitle}>
            {`Search by Available`}
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
                    className="mr-4" selected={availability.start_date}
                    onChange={this.onChangeAvailabilityStartDate}
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
                    selected={availability.end_date}
                    onChange={this.onChangeAvailabilityEndDate}
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
          <Typography className={classes.adminFormSubTitle}>
            {`Search by age range`}
          </Typography>

          <FormGroup row>
            { defaultValues.AGES.map((age) => {
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={ages && (ages.indexOf(age) > -1)}
                      onChange={(event) => this.onChangeSearCondition('ages', age)}
                      value={age}
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
          <Typography className={classes.adminFormSubTitle}>
            {`Search by height`}
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

  renderCheckbox = (name, title) => {
      return (
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state[name]}
              onChange={this.onChangeCheckbox(name)}
              value={name}
              color="primary"
            />
          }
          label={title}
        />
      );
  };

  renderEtc = () => {
    return (
      <Grid container spacing={0} justify="flex-start" alignItems="center">
        <Grid item lg={12} md={12} sm={12} xs={12} >
          <FormGroup column>
            { this.renderCheckbox('isAvailable', 'Available') }
            { this.renderCheckbox('notAvailable', 'Not Available (Talent Calendar)') }
            { this.renderCheckbox('isActiveCastingRequest', 'Active Casting Request') }
            { this.renderCheckbox('isContracted', 'Contracted') }
            { this.renderCheckbox('isCurrentDeployed', 'Current Deployed') }
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
          <Typography className={classes.adminFormSubTitle}>
            {`Search by language`}
          </Typography>

          <FormGroup row>
            { defaultValues.LANGUAGES.map((language) => {
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={languages && (languages.indexOf(language) > -1)}
                      onChange={(event) => this.onChangeSearCondition('languages', language)}
                      value={language}
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
          <Typography className={classes.adminFormSubTitle}>
            {`Search by rating`}
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
          <Typography className={classes.adminFormSubTitle}>
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

  renderCitizenShipCondition = () => {
    const { classes } = this.props;
    const { citizenship } = this.state;

    return (
      <Grid container spacing={16} direction="row" justify="flex-start" alignItems="center">
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <Typography className={classes.adminFormSubTitle}>
            {'SEARCH BY CITIZENSHIP: '}
          </Typography>
        </Grid>
        <Grid item lg={8} md={8} sm={12} xs={12}>
          <CountryDropdown
            defaultOptionLabel="Select a country"
            value={citizenship}
            onChange={this.handleCitizenShipChange}
            classes={classes.adminSearchCitizenShip}
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
          <Grid container spacing={16} direction="row" justify="flex-start" alignItems="center">
            <Grid item lg={6} md={6} sm={12} xs={12}>
              { this.renderTextCondition('SEARCH BY NAME: ', "Enter Name...", 'talent_name') }
            </Grid>
            <Grid item lg={1} md={1} sm={12} xs={12}/>
            <Grid item lg={5} md={5} sm={12} xs={12}>
              { this.renderCitizenShipCondition() }
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              { this.renderTextCondition('SEARCH BY TALENT ID: ', "Enter Talent ID...", 'talent_tid') }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  renderSearchButton = () => {
    const { classes } = this.props;

    return (
      <Grid container spacing={16} direction="column" justify="flex-start" alignItems="center">
        <Grid item lg={12} md={12} sm={12} xs={12} >
          <Button variant="contained" color="secondary" className={classes.button}>
            <Typography className={classes.adminTalentViewVideoButtonText} onClick={this.onSearch}>
              Search
            </Typography>
          </Button>
        </Grid>
      </Grid>
    );
  };

  renderContent = () => {
    return (
      <Panel>
        { this.renderSearchByNameAndID() }
        <Spacer size={20} />
        { this.renderPositions() }
        <Spacer size={30} />
        { this.renderSkills() }
        <Spacer size={30} />
        { this.renderEtc() }
        <Spacer size={10} />
        { this.renderAvailable() }
        <Spacer size={10} />
        { this.renderLanguage() }
        <Spacer size={10} />
        { this.renderRatingRange() }
        <Spacer size={10} />
        { this.renderAgeRange() }
        <Spacer size={10} />
        { this.renderHeight() }
        <Spacer size={10} />
        { this.renderSearchButton() }
      </Panel>
    )
  };

  render() {
    return (
      <AdminForm
        formTitle="PROFILE SEARCH"
        backLink="/admin/dashboard"
        backButtonTitle="Agent Dashboard"
      >
        {this.renderContent()}
      </AdminForm>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(adminStyles)(ProfileSearch))