import {
  TemplateNothing,
  TemplateSidebar,
  TemplateTopbar,
  TemplateTopbarOfComingSoon,
} from 'components/shiptalent/template';

// Common routes
import ComingSoonScreen from 'containers/common/comingSoonScreen';
import HomeScreen from 'containers/talent/homeScreen';
import SignUpScreen from 'containers/common/signUpScreen';
import LoginScreen from 'containers/common/loginScreen';
import ForgotPasswordScreen from 'containers/common/forgotPasswordScreen';

// Footer routes
import SubFaq from "containers/common/subFaq";
import Faq from "containers/common/faq";
import Terms from "containers/common/terms";
import ContactUs from "containers/common/contactUs";


export const commonComponents = {

};

const commonRoutes = [
  {
    path: "/",
    layout: TemplateTopbarOfComingSoon,
    component: ComingSoonScreen,
    exact: true
  },
  {
    path: "/sign-up",
    layout: TemplateNothing,
    component: SignUpScreen,
    exact: false
  },
  {
    path: "/login",
    layout: TemplateNothing,
    component: LoginScreen,
    exact: false
  },
  {
    path: "/forgot-password",
    layout: TemplateNothing,
    component: ForgotPasswordScreen,
    exact: false
  },
  {
    path: "/home",
    layout: TemplateTopbar,
    component: HomeScreen,
    exact: false
  },
  {
    path: "/subfaq",
    layout: TemplateTopbar,
    component: SubFaq,
    exact: false
  },
  {
    path: "/terms",
    layout: TemplateTopbar,
    component: Terms,
    exact: false
  },
  {
    path: "/faq",
    layout: TemplateTopbar,
    component: Faq,
    exact: false
  },
  {
    path: "/contact-us",
    layout: TemplateTopbar,
    component: ContactUs,
    exact: false
  },
];

export default commonRoutes;