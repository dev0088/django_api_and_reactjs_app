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
import InterviewInstructionLive from "../containers/video-interview/instruction-live";
import InterviewDeviceAllow from "../containers/video-interview/allow";
import VideoPreview from "../containers/video-interview/preview";
import VideoPractice from "../containers/video-interview/practice";
import LiveInterview from "../containers/video-interview/live";

import MyProfile from "../containers/myProfile";
import MyContactInfo from "../containers/myContactInfoScreen";
import MyNatioinality from "../containers/myNationalityScreen";
import MyVideos from "../containers/myVideosScreen";
import MyPracticeInterviewVideos from "../containers/myPracticeInterviewVideosScreen";
import MyLiveInterviewVideos from "../containers/myLiveInterviewVideosScreen";
import MyPictures from "../containers/myPicturesScreen";
import MyResume from "../containers/myResumeScreen";
import MyBio from "../containers/myBioScreen";
import MyMetrics from "../containers/myMetricScreen";
import MyLanguage from "../containers/myLanguagesScreen";
import MyMedical from "../containers/myMedicalScreen";

import MyAccount from "../containers/myAccount";
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
      path="/interview-instruction-live/:pageId"
      render={props => (
        <TemplateTopbar>
          <InterviewInstructionLive {...props} />
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
      path="/live-interview/:pageId"
      render={props => (
        <TemplateTopbar>
          <LiveInterview {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/video-practice/:pageId"
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
      path="/contact-info"
      render={props => (
        <TemplateTopbar>
          <MyContactInfo {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/nationality-info"
      render={props => (
        <TemplateTopbar>
          <MyNatioinality {...props} />
        </TemplateTopbar>
      )}
    />
    <Route
      path="/bio-info"
      render={props => (
        <TemplateTopbar>
          <MyBio {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/metrics-info"
      render={props => (
        <TemplateTopbar>
          <MyMetrics {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/bio-info"
        render={props => (
          <TemplateTopbar>
            <MyBio {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/language-info"
       render={props => (
        <TemplateTopbar>
          <MyLanguage {...props} />
         </TemplateTopbar>
      )}
    />

		<Route
      path="/medical-info"
       render={props => (
        <TemplateTopbar>
          <MyMedical {...props} />
         </TemplateTopbar>
      )}
    />

    <Route
      path="/videos-info"
      render={props => (
        <TemplateTopbar>
          <MyVideos {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/pictures-info"
      render={props => (
        <TemplateTopbar>
          <MyPictures {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/resume-info"
      render={props => (
        <TemplateTopbar>
          <MyResume {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/practice-interview-videos"
      render={props => (
        <TemplateTopbar>
          <MyPracticeInterviewVideos {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/live-interview-videos"
      render={props => (
        <TemplateTopbar>
          <MyLiveInterviewVideos {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/account"
      render={props => (
        <TemplateTopbar>
          <MyAccount {...props} />
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
