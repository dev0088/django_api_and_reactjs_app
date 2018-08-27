import React, {Component} from 'react';
import { Row, Col, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Panel from '../components/panel'
import * as talentActions from  '../actions/talentActions';
import TalentAPI from '../apis/talentAPIs'
import './myLanguages.css'


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  slide: {
    padding: 10,
  },
});

const theme = createMuiTheme ({
  palette: {
    primary: {
      main: '#007bff',
    },
    secondary: {
      main: '#C00'
    }
  }
})

const LANGUAGES = [
  'English',
  'Spanish',
  'Portuguese',
  'German',
  'French',
  'Italian',
  'Japanese',
  'Mandarin',
  'Cantonese',
  'Russian',
]

const FLUENCY_TYPES = [
  'Fluent',
  'Conversational',
  'Basic'
]

const OTHER_LANGUAGES_COUNT = 2

class MyLanguage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      languages: [],
      checkedLanguages: []
    }
  }

  getInfoFromProps(props) {
    const { 
      auth,
      talentInfo
    } = props

    let languages = []
    let checkedLanguages = []

    if (talentInfo && talentInfo.talent_languages) {
      // Get contact info
      languages = talentInfo.talent_languages

      for (let i = 0; i < LANGUAGES.length; i ++) {
        let language = this.getLanguageByName(LANGUAGES[i], languages)
        checkedLanguages.push({
          language: LANGUAGES[i], 
          checked: language ? true : false, 
          fluency: language ? language.fluency : 'Basic' 
        })
      }

    }

    return {
      languages,
      checkedLanguages
    }
  }

  componentWillMount() {
    this.setState({
      ...this.getInfoFromProps(this.props)
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.getInfoFromProps(nextProps)
    })
  }

  handleFluencyChange = (event) => {
    const { checkedLanguages } = this.state;
    let key = this.getKeyOfCheckedLanguageByName(event.target.name)
    checkedLanguages[key].fluency = event.target.value

    this.setState({
      checkedLanguages
    })
  }

  handleChange = name => event => {
    const { talentInfo } = this.props
    const { checkedLanguages } = this.state;
    let key = this.getKeyOfCheckedLanguageByName(name)
    checkedLanguages[key].checked = event.target.checked

    this.setState({
      checkedLanguages
    })
  }


  handleCancel = () => {
    this.setState({
      ...this.getInfoFromProps(this.props)
    })
  }

  handleSave = () => {
    const { auth, talentInfo } = this.props
    const {
      languages,
      checkedLanguages
    } = this.state

    let talent_languages = []
    Object.keys(checkedLanguages).map((key) => {
      let checkedLanguage = checkedLanguages[key]
      if (checkedLanguage.checked) {
        talent_languages.push({
          talent: talentInfo.id,
          language: checkedLanguage.language,
          fluency: checkedLanguage.fluency
        })
      }
    })
    let data = {
      talent_languages: talent_languages
    }
    console.log('==== talent_languages: ', talent_languages)
    TalentAPI.saveLanguages(auth.access.user_id, data, this.handleSaveResponse)
  }

  handleSaveResponse = (response, isFailed) => {
    const { auth } = this.props
    console.log('==== response: ', response, isFailed)
    this.props.talentActions.getTalentInfo(auth.access.user_id)
  }

  isCheckedLanguage = name => {
    const { checkedLanguages } = this.state
    let key = this.getKeyOfCheckedLanguageByName(name)
    return key ? checkedLanguages[key].checked : false
  }

  getKeyOfCheckedLanguageByName = (name) => {
    const { checkedLanguages } = this.state
    let res = null
    Object.keys(checkedLanguages).map((key) => {
      if (checkedLanguages[key].language === name) {
        res = key
      }
    })
    return res
  }

  getCheckedLanguageByName = (name) => {
    const { checkedLanguages } = this.state
    let res = null
    Object.keys(checkedLanguages).map((key) => {
      if (checkedLanguages[key].language === name) {
        res = checkedLanguages[key]
      }
    })
    return res
  }

  getLanguageByName = (name, languageList) => {
    const { languages } = this.state
    let res = null
    let searchLanguages = languageList ? languageList : languages
    Object.keys(searchLanguages).map((key) => {
      if (searchLanguages[key].language === name) {
        res = searchLanguages[key]
      }
    })
    return res
  }

  renderFluencyView(name) {
    let checkedLanguage = this.getCheckedLanguageByName(name)
    let fluency = checkedLanguage ? checkedLanguage.fluency : ''
    let disabled = checkedLanguage ? !checkedLanguage.checked : true

    return (
      <RadioGroup
        aria-label={`${name}_fluency`}
        name={name}
        className="profile-language-fluency-group"
        value={fluency}
        onChange={this.handleFluencyChange}>

        <FormControlLabel
          value="Fluent"
          control={<Radio color="primary" />}
          label="Fluent"
          disabled={disabled}
        />
        <FormControlLabel
          value="Conversational"
          control={<Radio color="primary" />}
          label="Conversational"
          disabled={disabled}
        />
        <FormControlLabel
          value="Basic"
          control={<Radio color="primary" />}
          label="Basic"
          disabled={disabled}
        />

      </RadioGroup>
    )
  }

  renderLanguagesView() {
    const { talentInfo, classes } = this.props
    const {
      languages,
    } = this.state

    return (
      <Panel title={"My Languages"}>
        <Typography>
          Speeking more than one language is a big deal at sea. 
          Tell use the languages you speak and your fluency in each.
          Be honest and realistic. The cruise line will test you.
        </Typography>

        <Row className="profile-gender-row">
          <Col xs="12" md="6" lg="6" xl="6" className="pt-0 pt-md-0" >
            <Row>
              <Col xs="12" className="pt-0 pt-md-0">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.isCheckedLanguage('English')}
                      onChange={this.handleChange('English')}
                      value="English"
                      color="primary"
                    />
                  }
                  label="English"
                />
              </Col>
              <Col xs="12" className="pt-0 pt-md-0">
                { this.renderFluencyView('English') }
              </Col>
            </Row>            
          </Col>


          <Col xs="12" md="6" lg="6" xl="6" className="pt-0 pt-md-0" >
            <Row>
              <Col xs="12" className="pt-0 pt-md-0">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.isCheckedLanguage('Italian')}
                      onChange={this.handleChange('Italian')}
                      value="Italian"
                      color="primary"
                    />
                  }
                  label="Italian"
                />
              </Col>
              <Col xs="12" className="pt-0 pt-md-0">
                { this.renderFluencyView('Italian') }
              </Col>
            </Row>            
          </Col>
        </Row>

        <Row className="profile-gender-row">
          <Col xs="12" md="6" lg="6" xl="6" className="pt-0 pt-md-0" >
            <Row>
              <Col xs="12" className="pt-0 pt-md-0">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.isCheckedLanguage('Spanish')}
                      onChange={this.handleChange('Spanish')}
                      value="Spanish"
                      color="primary"
                    />
                  }
                  label="Spanish"
                />
              </Col>
              <Col xs="12" className="pt-0 pt-md-0">
                { this.renderFluencyView('Spanish') }
              </Col>
            </Row>            
          </Col>


          <Col xs="12" md="6" lg="6" xl="6" className="pt-0 pt-md-0" >
            <Row>
              <Col xs="12" className="pt-0 pt-md-0">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.isCheckedLanguage('Japanese')}
                      onChange={this.handleChange('Japanese')}
                      value="Japanese"
                      color="primary"
                    />
                  }
                  label="Japanese"
                />
              </Col>
              <Col xs="12" className="pt-0 pt-md-0">
                { this.renderFluencyView('Japanese') }
              </Col>
            </Row>            
          </Col>
        </Row>

        <Row className="profile-gender-row">
          <Col xs="12" md="6" lg="6" xl="6" className="pt-0 pt-md-0" >
            <Row>
              <Col xs="12" className="pt-0 pt-md-0">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.isCheckedLanguage('Portuguese')}
                      onChange={this.handleChange('Portuguese')}
                      value="Portuguese"
                      color="primary"
                    />
                  }
                  label="Portuguese"
                />
              </Col>
              <Col xs="12" className="pt-0 pt-md-0">
                { this.renderFluencyView('Portuguese') }
              </Col>
            </Row>            
          </Col>

          <Col xs="12" md="6" lg="6" xl="6" className="pt-0 pt-md-0" >
            <Row>
              <Col xs="12" className="pt-0 pt-md-0">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.isCheckedLanguage('Mandarin')}
                      onChange={this.handleChange('Mandarin')}
                      value="Mandarin"
                      color="primary"
                    />
                  }
                  label="Mandarin"
                />
              </Col>
              <Col xs="12" className="pt-0 pt-md-0">
                { this.renderFluencyView('Mandarin') }
              </Col>
            </Row>            
          </Col>
        </Row>

        <Row className="profile-gender-row">
          <Col xs="12" md="6" lg="6" xl="6" className="pt-0 pt-md-0" >
            <Row>
              <Col xs="12" className="pt-0 pt-md-0">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.isCheckedLanguage('German')}
                      onChange={this.handleChange('German')}
                      value="German"
                      color="primary"
                    />
                  }
                  label="German"
                />
              </Col>
              <Col xs="12" className="pt-0 pt-md-0">
                { this.renderFluencyView('German') }
              </Col>
            </Row>            
          </Col>

          <Col xs="12" md="6" lg="6" xl="6" className="pt-0 pt-md-0" >
            <Row>
              <Col xs="12" className="pt-0 pt-md-0">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.isCheckedLanguage('Cantonese')}
                      onChange={this.handleChange('Cantonese')}
                      value="Cantonese"
                      color="primary"
                    />
                  }
                  label="Cantonese"
                />
              </Col>
              <Col xs="12" className="pt-0 pt-md-0">
                { this.renderFluencyView('Cantonese') }
              </Col>
            </Row>            
          </Col>
        </Row>

        <Row className="profile-gender-row">
          <Col xs="12" md="6" lg="6" xl="6" className="pt-0 pt-md-0" >
            <Row>
              <Col xs="12" className="pt-0 pt-md-0">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.isCheckedLanguage('French')}
                      onChange={this.handleChange('French')}
                      value="French"
                      color="primary"
                    />
                  }
                  label="French"
                />
              </Col>
              <Col xs="12" className="pt-0 pt-md-0">
                { this.renderFluencyView('French') }
              </Col>
            </Row>            
          </Col>

          <Col xs="12" md="6" lg="6" xl="6" className="pt-0 pt-md-0" >
            <Row>
              <Col xs="12" className="pt-0 pt-md-0">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.isCheckedLanguage('Russian')}
                      onChange={this.handleChange('Russian')}
                      value="Russian"
                      color="primary"
                    />
                  }
                  label="Russian"
                />
              </Col>
              <Col xs="12" className="pt-0 pt-md-0">
                { this.renderFluencyView('Russian') }
              </Col>
            </Row>            
          </Col>
        </Row>

        <Row className="profile-gender-row">
          <Col xs="12" md="7" className="pt-4 pt-md-4"> </Col>
          <Col xs="12" md="5" className="pt-3 pt-md-3 profile-save-button-group-col">
            <Button size="large" 
              className={classes.button} 
              onClick={this.handleCancel} >
              {'Cancel'}
            </Button>
            <Button size="large" color="primary" 
              className={classes.button} 
              onClick={this.handleSave}>
              {'Save'}
            </Button>
          </Col>
        </Row>
      </Panel>
    )
  }


  render() {

    return (
      <MuiThemeProvider theme={theme}>
        <div className="profile-language-container">
          {this.state.notification && <Alert color="info">{this.state.notification}</Alert>}

          {this.renderLanguagesView()}

          <Row >
            <Col xs="12" md="8" className="pt-4 pt-md-4"> </Col>
            <Col xs="12" md="4" className="pt-3 pt-md-3 profile-save-button-group-col">
              <Link to="/edit-profile">
                <RaisedButton label="Back to Build/Edit My Profile" primary={true}/>
              </Link>
            </Col>
          </Row>
        </div>
      </MuiThemeProvider>
    )
  }
}

function mapStateToProps(state) {
  const { auth, talentReducer,  talentInfo } = state;
  return {
    auth,
    talentReducer,
    talentInfo: talentInfo.value
  }
}

function mapDispatchToProps(dispatch) {
  return {
    talentActions: bindActionCreators(talentActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MyLanguage));
