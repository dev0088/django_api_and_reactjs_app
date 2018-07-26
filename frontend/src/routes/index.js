import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Templates
import TemplateNothing from '../components/templateNothing';
import TemplateSidebar from '../components/templateSidebar';
import TemplateTopbar from '../components/templateTopbar';
import TemplateTopbarOfComingSoon from '../components/templateTopbarOfComingSoon';

// Routes
import ComingSoonScreen from '../containers/comingSoonScreen';
import HomeScreen from '../containers/homeScreen';
import SignUpScreen from '../containers/signUpScreen';

import LoginScreen from '../containers/loginScreen';
import ForgotPasswordScreen from '../containers/forgotPasswordScreen';

import Error from '../components/error';
import InterviewStart from "../containers/video-interview/start";
import InterviewInstruction from "../containers/video-interview/instruction";
import InterviewDeviceAllow from "../containers/video-interview/allow";
import VideoPreview from "../containers/video-interview/preview";
import VideoPractice from "../containers/video-interview/practice";

import MyProfile from "../containers/myProfile";
import MyAcount from "../containers/myAccount";
import EditProfile from "../containers/editProfile";

import SubFaq from "../containers/subFaq";
import Faq from "../containers/faq";
import Terms from "../containers/terms";
import ContactUs from "../containers/contactUs";

const Index = () => (
  <Switch>
    <Route
      exact
      path="/"
      render={props => (
        <TemplateTopbarOfComingSoon>
          <ComingSoonScreen {...props} />
        </TemplateTopbarOfComingSoon>
      )}
    />
    <Route
      path="/home"
      render={props => (
        <TemplateTopbar>
          <HomeScreen {...props} />
        </TemplateTopbar>
      )}
    />
    <Route
      path="/sign-up"
      render={props => (
        <TemplateNothing>
          <SignUpScreen {...props} />
        </TemplateNothing>
      )}
    />
    <Route
      path="/login"
      render={props => (
        <TemplateNothing>
          <LoginScreen {...props} />
        </TemplateNothing>
      )}
    />
    <Route
      path="/forgot-password"
      render={props => (
        <TemplateNothing>
          <ForgotPasswordScreen {...props} />
        </TemplateNothing>
      )}
    />

    <Route
      path="/interview-start"
      render={props => (
        <TemplateTopbar>
          <InterviewStart {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/interview-instruction/:pageId"
      render={props => (
        <TemplateTopbar>
          <InterviewInstruction {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/interview-device-allow/:pageId"
      render={props => (
        <TemplateTopbar>
          <InterviewDeviceAllow {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/video-interview/:pageId"
      render={props => (
        <TemplateTopbar>
          <VideoPreview {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/video-practice"
      render={props => (
        <TemplateTopbar>
          <VideoPractice {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/profile"
      render={props => (
        <TemplateTopbar>
          <MyProfile {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/edit-profile"
      render={props => (
        <TemplateTopbar>
          <EditProfile {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/account"
      render={props => (
        <TemplateTopbar>
          <MyAcount {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/faq/:pageId"
      render={props => (
        <TemplateTopbar>
          <SubFaq {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/terms"
      render={props => (
        <TemplateTopbar>
          <Terms {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/faq"
      render={props => (
        <TemplateTopbar>
          <Faq {...props} />
        </TemplateTopbar>
      )}
    />
    
    <Route
      path="/contact-us"
      render={props => (
        <TemplateTopbar>
          <ContactUs {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      render={props => (
        <TemplateSidebar>
          <Error {...props} title="404" content="Sorry, the route you requested does not exist" />
        </TemplateSidebar>
      )}
    />

  </Switch>
);

export default Index;
