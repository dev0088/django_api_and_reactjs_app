import React, {Component} from 'react';
import { Row, Col, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles} from '@material-ui/core/styles';
import Panel from 'components/general/panel'
import TalentAPI from 'apis/talentAPIs'
import defaultValues from 'constants/defaultValues'
import './myLanguages.css'
import { styles } from 'styles';


class TalentLanguageForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      languages: [],
      checkedLanguages: [],
      isChanged: false,
      showConfirmChanges: false
    }
  }

  getInfoFromProps(props) {
    const { talentInfo } = props
    let languages = []
    let checkedLanguages = []

    if (talentInfo && talentInfo.talent_languages) {
      // Get contact info
      languages = talentInfo.talent_languages

      for (let i = 0; i < defaultValues.LANGUAGES.length; i ++) {
        let language = this.getLanguageByName(defaultValues.LANGUAGES[i], languages)
        checkedLanguages.push({
          language: defaultValues.LANGUAGES[i],
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
      ...this.getInfoFromProps(this.props),
      isChanged: false
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.getInfoFromProps(nextProps),
      isChanged: false
    })
  }

  handleFluencyChange = (event) => {
    const { checkedLanguages } = this.state;
    let key = this.getKeyOfCheckedLanguageByName(event.target.name)
    checkedLanguages[key].fluency = event.target.value

    this.setState({
      checkedLanguages,
      isChanged: true
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state.isChanged)
      }
    })
  }

  handleChange = name => event => {
    const { checkedLanguages } = this.state;
    let key = this.getKeyOfCheckedLanguageByName(name)
    checkedLanguages[key].checked = event.target.checked

    this.setState({
      checkedLanguages,
      isChanged: true
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state.isChanged)
      }
    })
  }


  handleCancel = () => {
    this.setState({
      ...this.getInfoFromProps(this.props),
      isChanged: false
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state.isChanged)
      }
    })
  }

  handleSave = () => {
    const { auth, talentInfo } = this.props
    const {
      checkedLanguages
    } = this.state

    let talent_languages = []
    for (let i = 0; i < checkedLanguages.length; i ++) {
      let checkedLanguage = checkedLanguages[i]
      if (checkedLanguage.checked) {
        talent_languages.push({
          talent: talentInfo.id,
          language: checkedLanguage.language,
          fluency: checkedLanguage.fluency
        })
      }
    }

    let data = {
      talent_languages: talent_languages
    }
    this.props.onSave(data, this.handleSaveResponse)
  };

  handleSaveResponse = (response, isFailed) => {
    this.setState({
      isChanged: false
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state.isChanged)
      }
    })
  };

  isCheckedLanguage = name => {
    const { checkedLanguages } = this.state
    let key = this.getKeyOfCheckedLanguageByName(name)
    return key ? checkedLanguages[key].checked : false
  }

  getKeyOfCheckedLanguageByName = (name) => {
    const { checkedLanguages } = this.state
    let res = null

    for (let i = 0; i < checkedLanguages.length; i++) {
      if (checkedLanguages[i].language === name) {
        res = i
      }
    }

    return res
  }

  getCheckedLanguageByName = (name) => {
    const { checkedLanguages } = this.state
    let res = null

    for (let i = 0; i < checkedLanguages.length; i ++) {
      if (checkedLanguages[i].language === name) {
        res = checkedLanguages[i]
      }
    }

    return res
  }

  getLanguageByName = (name, languageList) => {
    const { languages } = this.state
    let res = null
    let searchLanguages = languageList ? languageList : languages

    for (let i = 0; i < searchLanguages.length; i ++) {
      if (searchLanguages[i].language === name) {
        res = searchLanguages[i]
      }
    }

    return res
  }

  checkChanges = (event) => {
    const { isChanged } = this.state
    if (isChanged) {
      event.preventDefault()
      this.setState({
        showConfirmChanges: true
      })
    }
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

  renderContents() {
    const { contentTitle, classes } = this.props

    return (
      <Panel title={contentTitle}>
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

  //
  // renderPreview() {
  //   const {showConfirmChanges} = this.state
  //   return (
  //     <div className="profile-language-container">
  //       {this.state.notification && <Alert color="info">{this.state.notification}</Alert>}
  //
  //       {this.renderContents()}
  //
  //       <Row >
  //         <Col xs="12" md="8" className="pt-4 pt-md-4"> </Col>
  //         <Col xs="12" md="4" className="pt-3 pt-md-3 profile-save-button-group-col">
  //           <Link to="/edit-profile" onClick={this.checkChanges}>
  //             <RaisedButton label="Back to Build/Edit My Profile" primary={true}/>
  //           </Link>
  //         </Col>
  //       </Row>
  //
  //       <ConfirmChangesDialog
  //         open={showConfirmChanges}
  //         onClose={this.handleCloseConfirm}
  //       />
  //     </div>
  //   )
  // }

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
  return {}
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TalentLanguageForm));
