import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import MemberScreen from 'containers/talent/memberScreen';
import { Sidebar } from 'components/general/sidebar';
import Header from '../headers/talentHeader';
import Footer from '../footer/talentFooter';
import { MuiThemeProvider, } from '@material-ui/core/styles';
import { MuiThemeProvider as V0MuiThemeProvider} from 'material-ui';
import { theme, themeV0 } from 'styles';

const TemplateSidbar = ({ children }) => (
  <MuiThemeProvider theme={theme}>
    <V0MuiThemeProvider muiTheme={themeV0}>
      <div>
        <MemberScreen Layout={Header} />
        <Container fluid>
          <Sidebar />
          <div className="px-sm-5 py-sm-5 ml-sm-auto">
            {children}
          </div>
        </Container>
        <Footer />
      </div>
    </V0MuiThemeProvider>
  </MuiThemeProvider>
);

TemplateSidbar.propTypes = {
  children: PropTypes.element.isRequired,
};

export default TemplateSidbar;
