import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from 'prop-types';
import classNames from 'classnames';
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


const styles = ({
  menuBtn:{
    backgroundColor: '#007bff',
    width: '300px',
    fontSize: '25px'
  },
  dense: {
    marginTop: 16,
  },
});

const backgroundColor = '#007bff';

class ProfileSearch extends React.Component {
  
  state = {
    available: true,
    not_available: false,
    active_casting_request: false,
    contracted: false,
    currently_deployed: false,
    available_date: false,

    english: true,
    spanish: false,
    portuguese: false,
    german: false,
    french: false,
    italian: false,
    japanese: false,
    mandarin: false,
    cantonese: false,
    other: false,

    rating1: true,
    rating2: false,
    rating3: false,
    rating4: false,
    rating5: false,
    rating6: false,
    rating7: false,
    rating8: false,
    rating9: false,

    range1: true,
    range2: false,
    range3: false,
    range4: false,
    range5: false,
    range6: false,
    range7: false,
    range8: false,

    height1: true,
    height2: false,
    height3: false,
    height4: false,
    height5: false,
    height6: false,

    color: backgroundColor,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };


  switchRoutes(path){
    this.props.history.push(path)
  }
  
  onBtnClick(){
    this.setState({color: !this.state.color})
  }

  renderSearchKey(){
    const { classes } = this.props;
    return(
      <Grid container spacing={24}>
        <Grid item xs={12} style={{textAlign: 'center'}}>
          <h1>PROFILE SEARCH</h1>
        </Grid>

        <Grid item xs={2} style={{textAlign: 'left'}}>    
          <h5>SEARCH BY NAME: </h5>
        </Grid>
        <Grid item xs={4} style={{textAlign: 'left'}}>    
          <TextField
            id="outlined-dense"
            label="Enter Name..."
            className={classNames(classes.textField, classes.dense)}
            margin="dense"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={2} style={{textAlign: 'left'}}>    
          <h5>SEARCH BY CITIZENSHIP:</h5>
        </Grid>
        <Grid item xs={4} style={{textAlign: 'left'}}>    
          <TextField
            id="outlined-dense"
            label="Dropdown List..."
            className={classNames(classes.textField, classes.dense)}
            margin="dense"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={2} style={{textAlign: 'left'}}>    
          <h5>SEARCH BY TALENT ID:</h5>
        </Grid>
        <Grid item xs={4} style={{textAlign: 'left'}}>    
          <TextField
            id="outlined-dense"
            label="Enter Talent ID..."
            className={classNames(classes.textField, classes.dense)}
            margin="dense"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6} style={{textAlign: 'left'}}/>    
      </Grid>
    )
  }

  renderCategories(){
    return(
      <Grid container spacing={24}>

        <Grid item xs={3} style={{display: 'inherit'}}>
          <Grid item xs={6} style={{textAlign: 'left'}}>    
            <Button color="primary" style={{width: '30px', backgroundColor: '#007bff'}}>
              Male
            </Button>
          </Grid>
          <Grid item xs={6} style={{textAlign: 'left'}}>    
            <Button color="primary" style={{width: '30px', backgroundColor: '#007bff',}}>
              Female
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={9} style={{textAlign: 'center'}}/> 


        <Grid item xs={3} style={{display: 'inherit'}}>
          <Grid item xs={6} style={{textAlign: 'left'}}>    
            <Button color="primary" style={{width: '10px', backgroundColor: this.state.color}}>
              Vocalist
            </Button>
            <Grid item xs={12} style={{display: 'inherit'}}>
                <Button color="primary" style={{width: '10px', backgroundColor: this.state.color}} onClick={()=>{this.onBtnClick()}}>
                  Sop
                </Button>
                <Button color="primary" style={{width: '10px', backgroundColor: '#007bff',}}>
                  Alt
                </Button>
            </Grid>
            <Grid item xs={12} style={{display: 'inherit'}}>
                <Button color="primary" style={{width: '10px', backgroundColor: '#007bff',}}>
                  Ten
                </Button>
                <Button color="primary" style={{width: '10px', backgroundColor: '#007bff',}}>
                  Bar
                </Button>
            </Grid>                            
          </Grid>
          <Grid item xs={6} style={{textAlign: 'left'}}>    
            <Button color="primary" style={{width: '10px', backgroundColor: '#007bff',}}>
              Dancer
            </Button>
            <Grid item xs={12} style={{display: 'inherit'}}>
                <Button color="primary" style={{width: '10px', backgroundColor: '#007bff',}}>
                  Jazz
                </Button>
                <Button color="primary" style={{width: '10px', backgroundColor: '#007bff',}}>
                  Tap
                </Button>
            </Grid>
            <Grid item xs={12} style={{display: 'inherit'}}>
                <Button color="primary" style={{width: '10px', backgroundColor: '#007bff',}}>
                  Hip
                </Button>
                <Button color="primary" style={{width: '10px', backgroundColor: '#007bff',}}>
                  Lyr
                </Button>
            </Grid>
            <Grid item xs={12} style={{display: 'inherit'}}>
                <Button color="primary" style={{width: '10px', backgroundColor: '#007bff',}}>
                  Bal
                </Button>
                <Button color="primary" style={{width: '10px', backgroundColor: '#007bff',}}>
                  Con
                </Button>
            </Grid>
            <Grid item xs={12} style={{display: 'inherit'}}>
                <Button color="primary" style={{width: '10px', backgroundColor: '#007bff',}}>
                  Bam
                </Button>
                <Button color="primary" style={{width: '10px', backgroundColor: '#007bff',}}>
                  Gym
                </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3} style={{display: 'inherit'}}>
          <Grid item xs={6} style={{textAlign: 'left'}}>    
            <Button color="primary" style={{width: '30px', backgroundColor: '#007bff'}}>
              Actor
            </Button>                      
          </Grid>
          <Grid item xs={6} style={{textAlign: 'left'}}>    
            <Button color="primary" style={{width: '30px', backgroundColor: '#007bff',}}>
              Aerial
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={3} style={{display: 'inherit'}}>
          <Grid item xs={6} style={{textAlign: 'left'}}>    
            <Button color="primary" style={{width: '30px', backgroundColor: '#007bff'}}>
              Music
            </Button>
            <Grid item xs={12} style={{display: 'inherit'}}>
                <Button color="primary" style={{width: '10px', backgroundColor: '#007bff',}}>
                  Solor
                </Button>
                <Button color="primary" style={{width: '10px', backgroundColor: '#007bff',}}>
                  Duo
                </Button>
            </Grid>
            <Grid item xs={12} style={{display: 'inherit'}}>
                <Button color="primary" style={{width: '10px', backgroundColor: '#007bff',}}>
                  Trio
                </Button>
                <Button color="primary" style={{width: '10px', backgroundColor: '#007bff'}}>
                  Quar
                </Button>
            </Grid>
            <Grid item xs={12} style={{display: 'inherit'}}>
                <Button color="primary" style={{width: '10px', backgroundColor: '#007bff',}}>
                  Band
                </Button>
            </Grid>
          </Grid>
          <Grid item xs={6} style={{textAlign: 'left'}}>    
            <Button color="primary" style={{width: '30px', backgroundColor: '#007bff',}}>
              Staff
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={3} style={{display: 'inherit'}}>
          <Grid item xs={6} style={{textAlign: 'left'}}>    
            <Button color="primary" style={{width: '30px', backgroundColor: '#007bff'}}>
              Youth
            </Button>
          </Grid>
          <Grid item xs={6} style={{textAlign: 'left'}}>    
            <Button color="primary" style={{width: '30px', backgroundColor: '#007bff',}}>
              Tech
            </Button>
            <Grid item xs={12} style={{display: 'inherit'}}>
                <Button color="primary" style={{width: '10px', backgroundColor: '#007bff',}}>
                  Sound
                </Button>
                <Button color="primary" style={{width: '10px', backgroundColor: '#007bff',}}>
                  Light
                </Button>
            </Grid>
            <Grid item xs={12} style={{display: 'inherit'}}>
                <Button color="primary" style={{width: '10px', backgroundColor: '#007bff',}}>
                  Video
                </Button>
            </Grid>
          </Grid>
        </Grid>
        
        <Grid item xs={3} style={{display: 'inherit'}}>
          <Grid item xs={6} style={{textAlign: 'left'}}>    
            <Button color="primary" style={{width: '10px', backgroundColor: '#007bff'}}>
              +sing
            </Button>                       
          </Grid>
          <Grid item xs={6} style={{textAlign: 'left'}}>    
            <Button color="primary" style={{width: '10px', backgroundColor: '#007bff',}}>
              +dance
            </Button>
            <Grid item xs={12} style={{display: 'inherit'}}>
                <Button color="primary" style={{width: '10px', backgroundColor: '#007bff',}}>
                  Jazz
                </Button>
                <Button color="primary" style={{width: '10px', backgroundColor: '#007bff',}}>
                  Tap
                </Button>
            </Grid>
            <Grid item xs={12} style={{display: 'inherit'}}>
                <Button color="primary" style={{width: '10px', backgroundColor: '#007bff',}}>
                  Bal
                </Button>
                <Button color="primary" style={{width: '10px', backgroundColor: '#007bff',}}>
                  Con
                </Button>
            </Grid>
            <Grid item xs={12} style={{display: 'inherit'}}>
                <Button color="primary" style={{width: '10px', backgroundColor: '#007bff',}}>
                  Hip
                </Button>
                <Button color="primary" style={{width: '10px', backgroundColor: '#007bff',}}>
                  Lyr
                </Button>
            </Grid>
            <Grid item xs={12} style={{display: 'inherit'}}>
                <Button color="primary" style={{width: '10px', backgroundColor: '#007bff',}}>
                  Bam
                </Button>
                <Button color="primary" style={{width: '10px', backgroundColor: '#007bff',}}>
                  Gym
                </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3} style={{display: 'inherit'}}>
          <Grid item xs={6} style={{textAlign: 'left'}}>    
            <Button color="primary" style={{width: '30px', backgroundColor: '#007bff'}}>
              +move
            </Button>                      
          </Grid>
          <Grid item xs={6} style={{textAlign: 'left'}}>    
            <Button color="primary" style={{width: '30px', backgroundColor: '#007bff',}}>
              +act
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={3} style={{display: 'inherit'}}>
          <Grid item xs={6} style={{textAlign: 'left'}}>    
            <Button color="primary" style={{width: '30px', backgroundColor: '#007bff'}}>
              +play
            </Button>
            <Grid item xs={12} style={{display: 'inherit'}}>
                <Button color="primary" style={{width: '10px', backgroundColor: '#007bff',}}>
                  Pno
                </Button>
                <Button color="primary" style={{width: '10px', backgroundColor: '#007bff',}}>
                  Bas
                </Button>
            </Grid>
            <Grid item xs={12} style={{display: 'inherit'}}>
                <Button color="primary" style={{width: '10px', backgroundColor: '#007bff',}}>
                  Drm
                </Button>
                <Button color="primary" style={{width: '10px', backgroundColor: '#007bff'}}>
                  Str
                </Button>
            </Grid>
            <Grid item xs={12} style={{display: 'inherit'}}>
                <Button color="primary" style={{width: '10px', backgroundColor: '#007bff',}}>
                  Win
                </Button>
                <Button color="primary" style={{width: '10px', backgroundColor: '#007bff'}}>
                  Bra
                </Button>
            </Grid>
            <Grid item xs={12} style={{display: 'inherit'}}>
                <Button color="primary" style={{width: '10px', backgroundColor: '#007bff',}}>
                  Per
                </Button>
            </Grid>
          </Grid>
        </Grid> 
        <Grid item xs={3} style={{display: 'inherit'}}/>                 
      </Grid>    
     
    )
  }

  renderSearchAvailablity(){
    const { classes } = this.props;
    const { available, not_available, active_casting_request, contracted, currently_deployed, available_date } = this.state

    return(
      <Grid container spacing={24}>
        <Grid item xs={3} style={{textAlign: 'left'}}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox checked={available} onChange={this.handleChange('available')} value="available" />
                }
                label="Available"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={not_available} onChange={this.handleChange('not_available')} value="not_available" />
                }
                label="Not Available(Talent Calendar)"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={active_casting_request}
                    onChange={this.handleChange('active_casting_request')}
                    value="active_casting_request"
                  />
                }
                label="Active Casting Request"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={contracted} onChange={this.handleChange('contracted')} value="contracted" />
                }
                label="Contracted"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={currently_deployed} onChange={this.handleChange('currently_deployed')} value="currently_deployed" />
                }
                label="Currently Deployed"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={available_date}
                    onChange={this.handleChange('available_date')}
                    value="available_date"
                  />
                }
                label="Available"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={9} style={{textAlign: 'left'}}/>
      </Grid>
    )
  }
  
  renderSearchLanguages(){
    const { classes } = this.props;
    const { english, spanish, portuguese, german, french, italian, japanese, mandarin, cantonese, other } = this.state

    return(
      <Grid container spacing={24}>
        <Grid item xs={11} style={{textAlign:'left'}}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox checked={english} onChange={this.handleChange('english')} value="english" />
                }
                label="English"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={spanish} onChange={this.handleChange('spanish')} value="spanish" />
                }
                label="Spanish"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={portuguese}
                    onChange={this.handleChange('portuguese')}
                    value="portuguese"
                  />
                }
                label="Portuguese"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={german} onChange={this.handleChange('german')} value="german" />
                }
                label="German"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={french} onChange={this.handleChange('french')} value="french" />
                }
                label="French"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={italian}
                    onChange={this.handleChange('italian')}
                    value="italian"
                  />
                }
                label="Italian"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={japanese} onChange={this.handleChange('japanese')} value="japanese" />
                }
                label="Japanese"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={mandarin}
                    onChange={this.handleChange('mandarin')}
                    value="mandarin"
                  />
                }
                label="Mandarin"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={cantonese}
                    onChange={this.handleChange('cantonese')}
                    value="cantonese"
                  />
                }
                label="Cantonese"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={1} style={{textAlign:'left'}}></Grid>

        <Grid item xs={1} style={{textAlign:'left'}}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox checked={other} onChange={this.handleChange('other')} value="other" />
                }
                label="Other"
              />
              
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={11} style={{textAlign:'left'}}/>
      </Grid>
    )
  }

  renderSearchRating(){
    const { classes } = this.props;
    const { rating1, rating2, rating3, rating4, rating5, rating6, rating7, rating8, rating9 } = this.state

    return(
      <Grid container spacing={24}>
        <Grid item xs={11} style={{textAlign:'left'}}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox checked={rating1} onChange={this.handleChange('rating1')} value="rating1" />
                }
                label="<8.00"
              />
              
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rating2}
                    onChange={this.handleChange('rating2')}
                    value="rating2"
                  />
                }
                label="8.00-8.24"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={rating3} onChange={this.handleChange('rating3')} value="rating3" />
                }
                label="8.25-8.49"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={rating4} onChange={this.handleChange('rating4')} value="rating4" />
                }
                label="8.50-8.74"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rating5}
                    onChange={this.handleChange('rating5')}
                    value="rating5"
                  />
                }
                label="8.75-8.99"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={rating6} onChange={this.handleChange('rating6')} value="rating6" />
                }
                label="9.00-9.24"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rating7}
                    onChange={this.handleChange('rating7')}
                    value="rating7"
                  />
                }
                label="9.25-9.49"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rating8}
                    onChange={this.handleChange('rating8')}
                    value="rating8"
                  />
                }
                label="9.50-9.74"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={rating9} onChange={this.handleChange('rating9')} value="rating9" />
                }
                label="9.75-10.0"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={1} style={{textAlign:'left'}}></Grid>  
      </Grid>
    )
  }

  renderSearchAgeRange(){
    const { classes } = this.props;
    const { range1, range2, range3, range4, range5, range6, range7, range8 } = this.state

    return(
      <Grid container spacing={24}>
         <Grid item xs={11} style={{textAlign:'left'}}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox checked={range1} onChange={this.handleChange('range1')} value="range1" />
                }
                label="8-21"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={range2} onChange={this.handleChange('range2')} value="range2" />
                }
                label="22-25"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={range3}
                    onChange={this.handleChange('range3')}
                    value="range3"
                  />
                }
                label="26-30"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={range4} onChange={this.handleChange('range4')} value="range4" />
                }
                label="31-35"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={range5} onChange={this.handleChange('range5')} value="range5" />
                }
                label="36-40"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={range6}
                    onChange={this.handleChange('range6')}
                    value="range6"
                  />
                }
                label="41-45"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={range7} onChange={this.handleChange('range7')} value="range7" />
                }
                label="46-50"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={range8}
                    onChange={this.handleChange('range8')}
                    value="range8"
                  />
                }
                label="51+"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={1} style={{textAlign:'center'}}></Grid>
      </Grid>
    )
  }

  renderSearchHeight(){
    const { classes } = this.props;
    const { height1, height2, height3, height4, height5, height6 } = this.state

    return(
      <Grid container spacing={24}>
        <Grid item xs={11} style={{textAlign:'left'}}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox checked={height1} onChange={this.handleChange('height1')} value="height1" />
                }
                label="<5'0'"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={height2} onChange={this.handleChange('height2')} value="height2" />
                }
                label="5'1'~5'4'"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={height3}
                    onChange={this.handleChange('height3')}
                    value="height3"
                  />
                }
                label="5'5'~5'8'"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={height4} onChange={this.handleChange('height4')} value="height4" />
                }
                label="5'9'~5'11'"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={height5} onChange={this.handleChange('height5')} value="height5" />
                }
                label="6'0'~6'4'"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={height6}
                    onChange={this.handleChange('height6')}
                    value="height6"
                  />
                }
                label=">6'4'"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={1} style={{textAlign:'center'}}></Grid>
      </Grid>
    )
  }

  render(){
    const { classes } = this.props;

    return(
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardBody>
              <div className={classes.root}>
                <Grid container spacing={24}>
                  
                  <Grid item xs={12} >
                    {this.renderSearchKey()}
                  </Grid>

                  <Grid item xs={12} >
                    {this.renderCategories()}
                  </Grid>
                  
                  <Grid item xs={12} >
                    {this.renderSearchAvailablity()}
                  </Grid>

                  <Grid item xs={6} style={{display: 'inherit'}}>
                    <Grid item xs={3} style={{textAlign: 'left'}}>    
                      <Button color="primary" style={{width: '100px', backgroundColor: '#007bff'}}>
                        Viewed
                      </Button>
                    </Grid>
                    <Grid item xs={3} style={{textAlign: 'left'}}>    
                      <Button color="primary" style={{width: '100px', backgroundColor: '#007bff',}}>
                        Not Viewed
                      </Button>
                    </Grid>
                    <Grid item xs={3} style={{textAlign: 'left'}}>    
                      <Button color="primary" style={{width: '100px', backgroundColor: '#007bff'}}>
                        Blocked
                      </Button>
                    </Grid>
                    <Grid item xs={3} style={{textAlign: 'left'}}>    
                      <Button color="primary" style={{width: '100px', backgroundColor: '#007bff',}}>
                        Shared
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid item xs={6} style={{textAlign:'left'}}/>

                  <Grid item xs={12} >
                    {this.renderSearchLanguages()}
                  </Grid>

                  <Grid item xs={12} >
                    {this.renderSearchRating()}
                  </Grid>

                  <Grid item xs={12} >
                    {this.renderSearchAgeRange()}
                  </Grid>

                  <Grid item xs={12} >
                    {this.renderSearchHeight()}
                  </Grid>

                  <Grid item xs={3} style={{textAlign:'center'}}/>
                  <Grid item xs={3} style={{textAlign:'center'}}>
                    <Button color="primary" style={{width: '250px', backgroundColor: '#007bff'}}>
                      Search
                    </Button>
                  </Grid>
                  <Grid item xs={3} style={{textAlign:'center'}}/>
                  <Grid item xs={3} style={{textAlign:'right'}}>
                    <Button color="primary" style={{width: '250px', backgroundColor: '#007bff'}}>
                      Agent Dashboard
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

ProfileSearch.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileSearch);
