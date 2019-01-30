import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import MemberScreen from '../../../containers/talent/memberScreen';
import HeaderOfComingSoon from '../headers/comingSoonHeader';
import { MuiThemeProvider, } from '@material-ui/core/styles';
import { MuiThemeProvider as V0MuiThemeProvider} from 'material-ui';
import { theme, themeV0 } from 'styles';

const TemplateTopbarOfComingSoon = ({ children }) => (
  <MuiThemeProvider theme={theme}>
    <V0MuiThemeProvider muiTheme={themeV0}>
      <div>
        <MemberScreen Layout={HeaderOfComingSoon} />
        <Container fluid style={{height: '100vh'}}>
          {children}
        </Container>
      </div>
    </V0MuiThemeProvider>
  </MuiThemeProvider>
);

TemplateTopbarOfComingSoon.propTypes = {
  children: PropTypes.element.isRequired,
};

export default TemplateTopbarOfComingSoon;
