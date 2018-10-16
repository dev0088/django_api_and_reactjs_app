import React from 'react';
import {Switch, Route} from 'react-router-dom';

// Templates
import TemplateNothing from '../components/templateNothing';
import TemplateSidebar from '../components/templateSidebar';
import TemplateTopbar from '../components/templateTopbar';
import TemplateTopbarOfComingSoon from '../components/templateTopbarOfComingSoon';

// Routes
import ComingSoonScreen from '../containers/common/comingSoonScreen';
import HomeScreen from '../containers/talent/homeScreen';
import SignUpScreen from '../containers/common/signUpScreen';

import LoginScreen from '../containers/common/loginScreen';
import ForgotPasswordScreen from '../containers/common/forgotPasswordScreen';

import Error from '../components/error';
import InterviewStart from "../containers/talent/video-interview/start";
import InterviewInstruction from "../containers/talent/video-interview/instruction";
import InterviewInstructionLive from "../containers/talent/video-interview/instruction-live";
import InterviewDeviceAllow from "../containers/talent/video-interview/allow";
import VideoPreview from "../containers/talent/video-interview/preview";
import VideoPractice from "../containers/talent/video-interview/practice";
import LiveInterview from "../containers/talent/video-interview/live";

import WelcomeBuildProfileWizard from "../containers/talent/profile/profile-wizard/welcomeBuildProfileWizard";
import SelectMaleWizard from "../containers/talent/profile/profile-wizard/selectMaleWizard";
import SelectPositionTypeWizard from "../containers/talent/profile/profile-wizard/selectPositionTypeWizard";
import SelectPositionSubTypeWizard from "../containers/talent/profile/profile-wizard/selectPositionSubTypeWizard";
import LastWizard from "../containers/talent/profile/profile-wizard/lastWizard";

import MyProfile from "../containers/talent/profile/myProfile";
import ViewProfile from "../containers/talent/profile/build-profile/view-profile/viewProfile";
import MyContactInfo from "../containers/talent/profile/build-profile/contact-info/myContactInfoScreen";
import MyNatioinality from "../containers/talent/profile/build-profile/nationality/myNationalityScreen";
import MyVideos from "../containers/talent/profile/build-profile/interview-videos/myVideosScreen";
import MyPracticeInterviewVideos from "../containers/talent/profile/build-profile/interview-videos/myPracticeInterviewVideosScreen";
import MyLiveInterviewVideos from "../containers/talent/profile/build-profile/interview-videos/myLiveInterviewVideosScreen";
import MyPictures from "../containers/talent/profile/build-profile/pictures/myPicturesScreen";
import MyResume from "../containers/talent/profile/build-profile/resume/myResumeScreen";
import MyBio from "../containers/talent/profile/build-profile/bio/myBioScreen";
import MyMetrics from "../containers/talent/profile/build-profile/metric/myMetricScreen";
import MyLanguage from "../containers/talent/profile/build-profile/language/myLanguagesScreen";
import MyMedical from "../containers/talent/profile/build-profile/medical/myMedicalScreen";
import MyAvailability from "containers/talent/profile/build-profile//availability/myAvailabilityScreen";
import EditProfile from "../containers/talent/profile/build-profile/general/editProfile";

import SubFaq from "../containers/common/subFaq";
import Faq from "../containers/common/faq";
import Terms from "../containers/common/terms";
import ContactUs from "../containers/common/contactUs";

// client side
import ClientLogin from "../containers/client/login";
import WelcomePage from "../containers/client/welcome"
import TalentSearch from '../containers/client/find_talent/talent.seach'
import TalentSearchResult from "../containers/client/find_talent/talent.search.result";
import RequestSelection from "../containers/client/my_casting_request/request.selection";
import CastingRequestNew from "../containers/client/my_casting_request/casting.request.new";
import CastingRequestAddConfirm from "../containers/client/my_casting_request/casting.request.add.confirm";
import CastingRequestView from "../containers/client/my_casting_request/casting.request.view";
import MyTalentSaved from "../containers/client/my_saved_talent/mytalent.saved";
import MyCallback from "../containers/client/my_saved_talent/mycallback";
import MyFavorite from "../containers/client/my_saved_talent/myfavorite";
import MySharedProfile from "../containers/client/my_shared_profile/myshared.profile";
import TalentSharedWith from "../containers/client/my_shared_profile/talent.shared.with";
import TalentSharedBy from "../containers/client/my_shared_profile/talent.shared.by";
import TalentSharedTeam from "../containers/client/my_shared_profile/talent.shared.team";
import BlockedProfile from "../containers/client/my_blocked_profile/blocked.profile";
import MyRate from "../containers/client/my_rating/myrate";
import RatingAndComment from "../containers/client/my_rating/rating.and.comment";
import MyrateSubmitted from "../containers/client/my_rating/myrate.submitted";

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
            path="/client/login"
            render={props => (
                <TemplateNothing>
                    <ClientLogin {...props}/>
                </TemplateNothing>
            )}
        />
        <Route
            path="/client/welcome"
            render={props => (
                <TemplateNothing>
                    <WelcomePage {...props}/>
                </TemplateNothing>
            )}
        />
        <Route
            path="/client/talent_search"
            render={props => (
                <TemplateNothing>
                    <TalentSearch {...props}/>
                </TemplateNothing>
            )}
        />
        <Route
            path="/client/talent_search_result"
            render={props => (
                <TemplateNothing>
                    <TalentSearchResult {...props}/>
                </TemplateNothing>
            )}
        />
        <Route
            path="/client/request_selection"
            render={props => (
                <RequestSelection {...props} />
            )}
        />
        <Route
            path="/client/casting_request/new"
            render={props => (
                <CastingRequestNew {...props} />
            )}
        />
        <Route
            path="/client/casting_request/confirm"
            render={props => (
                <CastingRequestAddConfirm {...props} />
            )}
        />
        <Route
            path="/client/casting_request/view"
            render={props => (
                <CastingRequestView {...props} />
            )}
        />
        <Route
            path="/client/mytalent/saved"
            render={props => (
                <MyTalentSaved {...props} />
            )}
        />
        <Route
            path="/client/mycallback"
            render={props => (
                <MyCallback {...props}/>
            )}
        />
        <Route
            path="/client/myfavorite"
            render={props => (
                <MyFavorite {...props}/>
            )}
        />
        <Route
            path="/client/myshared_profile"
            render={props => (
                <MySharedProfile {...props}/>
            )}
        />
        <Route
            path="/client/talent_shared"
            render={props => (
                <TalentSharedWith {...props}/>
            )}
        />
        <Route
            path="/client/talent_shared_by"
            render={props => (
                <TalentSharedBy {...props}/>
            )}
        />
        <Route
            path="/client/talent_shared_team"
            render={props => (
                <TalentSharedTeam {...props}/>
            )}
        />
        <Route
            path="/client/blocked_profile"
            render={props => (
                <BlockedProfile {...props}/>
            )}
        />
        <Route
            path="/client/my_rate"
            render={props => (
                <MyRate {...props}/>
            )}
        />
        <Route
            exact
            path="/client/rating_comment"
            render={props => (
                <RatingAndComment {...props}/>
            )}
        />
        <Route
            exact
            path="/client/rating_comment/submitted"
            render={props => (
                <MyrateSubmitted {...props}/>
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
            path="/my-profile"
            render={props => (
                <TemplateTopbar>
                    <MyProfile {...props} />
                </TemplateTopbar>
            )}
        />

        <Route
            path="/profile-wizard/welcome"
            render={props => (
                <TemplateTopbar>
                    <WelcomeBuildProfileWizard {...props} />
                </TemplateTopbar>
            )}
        />

        <Route
            path="/profile-wizard/select-male"
            render={props => (
                <TemplateTopbar>
                    <SelectMaleWizard {...props} />
                </TemplateTopbar>
            )}
        />

        <Route
            path="/profile-wizard/select-position-type"
            render={props => (
                <TemplateTopbar>
                    <SelectPositionTypeWizard {...props} />
                </TemplateTopbar>
            )}
        />

        <Route
            path="/profile-wizard/select-position-sub-type"
            render={props => (
                <TemplateTopbar>
                    <SelectPositionSubTypeWizard {...props} />
                </TemplateTopbar>
            )}
        />

        <Route
            path="/profile-wizard/lastWizard"
            render={props => (
                <TemplateTopbar>
                    <LastWizard {...props} />
                </TemplateTopbar>
            )}
        />

        <Route
            path="/profile"
            render={props => (
                <TemplateTopbar>
                    <ViewProfile {...props} />
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
          path="/availability-info"
          render={props => (
            <TemplateTopbar>
              <MyAvailability {...props} />
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
                    <Error {...props} title="404" content="Sorry, the route you requested does not exist"/>
                </TemplateSidebar>
            )}
        />

    </Switch>
);

export default Index;
