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
import VideoPreview from "../containers/video-interview/preview";
import VideoPractice from "../containers/video-interview/practice";

import MyProfile from "../containers/myProfile";

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
      path="/video-interview"
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
      render={props => (
        <TemplateSidebar>
          <Error {...props} title="404" content="Sorry, the route you requested does not exist" />
        </TemplateSidebar>
      )}
    />

  </Switch>
);

export default Index;
