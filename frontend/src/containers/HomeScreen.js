import React, {Component} from 'react';
import { Row, Col, Jumbotron } from 'reactstrap';
import ReactPlayer from 'react-player'
import './homeScreen.css'

class HomeScreen extends Component {

  render() {

    return(
      <div>
        <Row>
          <Jumbotron className="text-center slogan-description-background">
            <h1>Welcome, ShipTalent.com!</h1>
            <p></p>
            <p className="lead">We are building a greate web application for talent and client.</p>
          </Jumbotron>
          <img src={require('../images/backgrounds/background_side.png')} alt="home background" className="home-background-image"/>
        </Row>
        <Row className="pt-5">
          <Col xs="12" md="4" className="pt-3 pt-md-0">
            <h3><i className="icon-map" /> What is ShipeTalent.com?</h3>
            <p>ShiptTalent.com is a community of Talent with one common goal: to work on a cruise ship.</p>
            <p>With ShiptTalent.com, singers, dancers, aerialist, musicians, technicians, activity staff and youth staff can audition and interview with <b>every</b> cruise line <b>at the same time</b> in one easy setp. No need to go to endless auditions. ...</p>
            <p>
              <a target="_blank" rel="noopener noreferrer"  className="btn btn-primary">
                More details ...
              </a>
            </p>
          </Col>
          <Col xs="12" md="4" className="pt-3 pt-md-0">
            <h3><i className="icon-fire" /> How Does ShiptTalent.com Work?</h3>
            <p>It's easy. In order to audition and interview with <b>every</b> cruise line at the same time, all you have to do is create your own unique profile. </p>
            <p>What's in your profile? Unlinke other employment sites, your profile isn't simply a place to post your basic headshot, resume and demo reel. Sure, your profile includes these basics, ...</p>
            <p>
              <a target="_blank" rel="noopener noreferrer"  className="btn btn-primary">
                More details ...
              </a>
            </p>
          </Col>
          <Col xs="12" md="4" className="pt-3 pt-md-0">
            <h3><i className="icon-organization" /> Why use ShiptTalent.com?</h3>
            <p>The bigger question is why would you not?</p>
            <p>Are you frustrated with going to audition after audition? Tired of sending application after application only to wonder if you're even being considered? Don't know how to stand out from the rest of the crowd and get your big your big break into the exciting world of cruise ship entertainment? ...</p>
            <p>
              <a target="_blank" rel="noopener noreferrer" href="#/" className="btn btn-primary">
                Mode details ...
              </a>
            </p>
          </Col>
        </Row>
        <Row className="pt-md-5 pb-5">
          <Col xs="12" md="4" className="pt-3 pt-md-0">
            <h3><i className="icon-layers" /> The ShipTalent.com Difference</h3>
            <p>Unlinke other employment sites, your profile isn't simply a place to post your headshot, resume and demo reel.</p>
            <p>There is so much more about you that needs to be seen!</p>
            <p>
              <a target="_blank" rel="noopener noreferrer"  className="btn btn-primary">
                More details ...
              </a>
            </p>
          </Col>
          <Col xs="12" md="4" className="pt-3 pt-md-0">
            <h3><i className="icon-drop" /> Web Styles</h3>
            <p>Webpack, SCSS, Bootstrap and ReactStrap - ready at your fingertips.</p>
            <p>
              <a target="_blank" rel="noopener noreferrer"  className="btn btn-primary">
                ReactStrap Docs
              </a>
            </p>
          </Col>
          <Col xs="12" md="4" className="pt-3 pt-md-0">
            <h3><i className="icon-user-following" /> Auth</h3>
            <p>Most apps need user authentication. This one comes ready to go with Firebase Auth - but you can easily change that within the </p>
            <p>
              <a target="_blank" rel="noopener noreferrer"  className="btn btn-primary">
                Firebase Auth Docs
              </a>
            </p>
          </Col>
        </Row>
        <hr />
        <Row className="pt-5">
          <Col xs="12" sm="12" lg="12">
            <h3>How to Use ShipTalent.com</h3>
            <p>
              <ReactPlayer 
                url='https://www.youtube.com/watch?v=mubmRIh50Zg' 
                loop width='100%' 
                height='720px' 
                controls={true}
              />
            </p>
          </Col>
        </Row>
      </div>
    );
  }
}
export default HomeScreen;
