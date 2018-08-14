import React, {Component} from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import { Row, Col, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Panel from '../components/panel'
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as talentActions from  '../actions/talentActions';
import TalentAPI from '../apis/talentAPIs'
import apiConfig from '../constants/api';
import './myContactInfo.css'

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


class MyMetrics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height: "",
            weight: "",
            bmi: "",
            age:"",
        };
    }

    getMetricsFromProps(props) {
        const {
            talentInfo
        } = props

        let metricsInfo = {
            height: "",
            weight: "",
            bmi: "",
            age:"",
        }

        if (talentInfo && talentInfo.user) {
            metricsInfo = {
                height: "",
                weight: "",
                bmi: "",
                age:"",
            }
        }

        return {
            ...metricsInfo
        }
    }

    componentWillMount() {
        if (this.props.auth.access && this.props.auth.access.user_id) {
            this.props.talentActions.getTalentInfo(this.props.auth.access.user_id)
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ...this.getMetricsFromProps(nextProps)
        })
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

   /* handleHeightChange = (value) => {
        this.setState({
            height: value
        })
    }*/

    handleCancel = () => {
        this.setState({
            ...this.getMetricsFromProps(this.props)
        })
    }

    handleSave = () => {
        const { auth } = this.props
        const {
                height,
                weight,
                bmi,
                age,
        } = this.state

        let data = {
            ...this.state,
        }
        console.log('==== data: ', data)
        TalentAPI.saveTalentInfo(auth.access.user_id, data, this.handleSaveResponse)
    }

    handleSaveResponse = (response, isFailed) => {
        console.log('==== response: ', response, isFailed)
        this.props.talentActions.getTalentInfo(this.props.auth.access.user_id)
    }

    renderMetricsView (){
        const { height, weight, bmi, age } = this.state
        const { classes } = this.props

        return (
        <Panel title={"My Height, Weight, & Age Range"}>
            <Row className="profile-gender-row">
            <Col sm="3">
            <h5>Height</h5>
            </Col>
            <Col sm="3">
            <h5>Weight</h5>
            </Col>
            <Col sm="3">
            <h5>BMI</h5>
            </Col>
            <Col sm="3">
            <h5>Age</h5>
            </Col>
            </Row>
            <Row className="profile-gender-row">
            <Col xs="12" md="3" className="pt-3 pt-md-3">
            <FormControl >
            <FormLabel htmlFor="uncontrolled-native">&nbsp;USA &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; EUROPE</FormLabel>
            <NativeSelect value={this.state.height} onChange={this.handleChange('height')} defaultValue={147} input={<Input name="height" id="uncontrolled-native" />}>
                <option value={147} >4'10"&nbsp;&nbsp;&nbsp;147 cm</option>
                <option value={150}>4'11"&nbsp;&nbsp;&nbsp;150 cm</option>
                <option value={152}>5'0" &nbsp;&nbsp;&nbsp; 152 cm</option>
                <option value={155}>5'1" &nbsp;&nbsp;&nbsp; 155 cm</option>
                <option value={157}>5'2" &nbsp;&nbsp;&nbsp; 157 cm</option>
                <option value={160}>5'3" &nbsp;&nbsp;&nbsp; 160 cm</option>
                <option value={163}>5'4" &nbsp;&nbsp;&nbsp; 163 cm</option>
                <option value={165}>5'5" &nbsp;&nbsp;&nbsp; 165 cm</option>
                <option value={168}>5'6" &nbsp;&nbsp;&nbsp; 168 cm</option>
                <option value={170}>5'7" &nbsp;&nbsp;&nbsp; 170 cm</option>
                <option value={173}>5'8" &nbsp;&nbsp;&nbsp; 173 cm</option>
                <option value={175}>5'9" &nbsp;&nbsp;&nbsp; 175 cm</option>
                <option value={178}>5'10"&nbsp;&nbsp;&nbsp;178 cm</option>
                <option value={180}>5'11"&nbsp;&nbsp;&nbsp;180 cm</option>
                <option value={183}>6'0" &nbsp;&nbsp;&nbsp; 183 cm</option>
                <option value={185}>6'1" &nbsp;&nbsp;&nbsp; 185 cm</option>
                <option value={188}>6'2" &nbsp;&nbsp;&nbsp; 188 cm</option>
                <option value={191}>6'3" &nbsp;&nbsp;&nbsp; 191 cm</option>
                <option value={193}>6'4" &nbsp;&nbsp;&nbsp; 193 cm</option>
                <option value={196}>6'5" &nbsp;&nbsp;&nbsp; 196 cm</option>
                <option value={198}>6'6" &nbsp;&nbsp;&nbsp; 198 cm</option>
                <option value={200}>>6'6" &nbsp;&nbsp;>198 cm</option>
            </NativeSelect>
            </FormControl>
        </Col>
            <Col xs="12" md="3" className="pt-3 pt-md-3">
        <FormControl>
            <FormLabel htmlFor="uncontrolled-native">&nbsp;USA &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; EUROPE</FormLabel>
            <NativeSelect value={this.state.weight} onChange={this.handleChange('weight')} defaultValue={45} input={<Input name="weight" id="uncontrolled-native" />}>
        <option value={45}>100 lbs. &nbsp;&nbsp;45 kg</option>
        <option value={48}>105 lbs. &nbsp;&nbsp;48 kg</option>
        <option value={50}>110 lbs. &nbsp;&nbsp;50 kg</option>
        <option value={52}>115 lbs. &nbsp;&nbsp;52 kg</option>
        <option value={54}>120 lbs. &nbsp;&nbsp;54 kg</option>
        <option value={57}>125 lbs. &nbsp;&nbsp;57 kg</option>
        <option value={59}>130 lbs. &nbsp;&nbsp;59 kg</option>
        <option value={61}>135 lbs. &nbsp;&nbsp;61 kg</option>
        <option value={64}>140 lbs. &nbsp;&nbsp;64 kg</option>
        <option value={66}>145 lbs. &nbsp;&nbsp;66 kg</option>
        <option value={68}>150 lbs. &nbsp;&nbsp;68 kg</option>
        <option value={70}>155 lbs. &nbsp;&nbsp;70 kg</option>
        <option value={73}>160 lbs. &nbsp;&nbsp;73 kg</option>
        <option value={75}>165 lbs. &nbsp;&nbsp;75 kg</option>
        <option value={77}>170 lbs. &nbsp;&nbsp;77 kg</option>
        <option value={79}>175 lbs. &nbsp;&nbsp;79 kg</option>
        <option value={82}>180 lbs. &nbsp;&nbsp;82 kg</option>
        <option value={84}>185 lbs. &nbsp;&nbsp;84 kg</option>
        <option value={86}>190 lbs. &nbsp;&nbsp;86 kg</option>
        <option value={88}>195 lbs. &nbsp;&nbsp;88 kg</option>
        <option value={91}>200 lbs. &nbsp;&nbsp;91 kg</option>
        <option value={93}>205 lbs. &nbsp;&nbsp;93 kg</option>
        <option value={95}>210 lbs. &nbsp;&nbsp;95 kg</option>
        <option value={98}>215 lbs. &nbsp;&nbsp;98 kg</option>
        <option value={100}>220 lbs. &nbsp;&nbsp;100 kg</option>
        <option value={102}>225 lbs. &nbsp;&nbsp;102 kg</option>
        <option value={104}>230 lbs. &nbsp;&nbsp;104 kg</option>
        <option value={107}>235 lbs. &nbsp;&nbsp;107 kg</option>
        <option value={109}>240 lbs. &nbsp;&nbsp;109 kg</option>
        <option value={111}>245 lbs. &nbsp;&nbsp;111 kg</option>
        <option value={113}>250 lbs. &nbsp;&nbsp;113 kg</option>
        <option value={93}>>250 lbs.&nbsp;&nbsp;>113 kg</option>
        </NativeSelect>
        </FormControl>
        </Col>
        <Col xs="12" md="3" className="pt-3 pt-md-3">
        <TextField
        value={this.state.bmi} onChange={this.handleChange('bmi')}
        id="bmi"
        value="24.1 Normal Weight"
        className={classes.textField}
        //margin="normal"
            />
            </Col>
        <Col xs="12" md="3" className="pt-3 pt-md-3">
        <FormControl>
            <FormLabel htmlFor="uncontrolled-native">AGE</FormLabel>
            <NativeSelect value={this.state.age} onChange={this.handleChange('age')} defaultValue={18} input={<Input name="age" id="uncontrolled-native"/>}>
            <option value={18}>18-</option>
            <option value={21}>21</option>
            <option value={22}>22-</option>
            <option value={25}>25</option>
            <option value={26}>26-</option>
            <option value={30}>30</option>
            <option value={31}>31</option>
            <option value={35}>35</option>
            <option value={36}>36-</option>
            <option value={40}>40</option>
            <option value={41}>41-</option>
            <option value={45}>45</option>
            <option value={46}>46-</option>
            <option value={50}>50</option>
            <option value={51}>51+</option>
            </NativeSelect>
            </FormControl>
            </Col>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
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
    const { height, weight, bmi, age } = this.state;
    const { classes } = this.props;

    return (
        <MuiThemeProvider theme={theme}>
        <div className="contact-info-view-container">
        {this.state.notification && <Alert color="info">{this.state.notification}</Alert>}

    {this.renderMetricsView()}

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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MyMetrics));