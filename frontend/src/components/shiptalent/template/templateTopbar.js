import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import MemberScreen from '../../../containers/talent/memberScreen';
import Header from '../headers/talentHeader';
import Footer from '../footer/talentFooter';
import { MuiThemeProvider, } from '@material-ui/core/styles'; // v1.x
import { MuiThemeProvider as V0MuiThemeProvider} from 'material-ui';
import { theme, themeV0 } from 'styles';

const TemplateTopbar = ({ children }) => (
  <MuiThemeProvider theme={theme}>
    <V0MuiThemeProvider muiTheme={themeV0}>
      <div>
        <MemberScreen Layout={Header} />
        <Container fluid>
          {children}
        </Container>
        <Footer />
      </div>
    </V0MuiThemeProvider>
  </MuiThemeProvider>
);

TemplateTopbar.propTypes = {
  children: PropTypes.element.isRequired,
};

export default TemplateTopbar;
